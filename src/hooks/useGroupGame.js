// src/hooks/useGroupGame.js
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  arrayUnion,
  increment
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { SUBJECTS } from '../constants/subjects';

// ─── Utilitários ────────────────────────────────────────────────────
const generateRoomCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
};

const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const pickQuestions = (category = 'mixed', count = 10) => {
  let pool = [];

  if (category === 'mixed') {
    SUBJECTS.forEach(s => {
      if (s.questions) pool.push(...s.questions);
    });
  } else {
    const subject = SUBJECTS.find(s => s.id.startsWith(category));
    if (subject?.questions) pool = [...subject.questions];
  }

  // Filtra apenas questões com 4 alternativas e resposta válida
  pool = pool.filter(q => q.a?.length >= 2 && typeof q.correct === 'number');

  const selected = shuffleArray(pool).slice(0, count);

  // Serializa cada questão para Firestore (embaralha alternativas)
  return selected.map(q => {
    const answers = q.a.map((text, idx) => ({ text, originalIdx: idx }));
    const shuffled = shuffleArray(answers);
    const newCorrectIdx = shuffled.findIndex(a => a.originalIdx === q.correct);
    return {
      id: q.id,
      q: q.q,
      a: shuffled.map(a => a.text),
      correct: newCorrectIdx,
      difficulty: q.difficulty || 'medium',
      explanation: q.explanation || '',
      skillCode: q.skillCode || ''
    };
  });
};

// ─── Category labels ────────────────────────────────────────────────
export const GAME_CATEGORIES = [
  { id: 'mixed', label: 'Todas as Matérias', icon: '🎲' },
  { id: 'matematica', label: 'Matemática', icon: '🧮' },
  { id: 'geografia', label: 'Geografia', icon: '🌍' },
  { id: 'historia', label: 'História', icon: '📜' },
  { id: 'biologia', label: 'Biologia', icon: '🧬' },
  { id: 'linguagens', label: 'Linguagens', icon: '📖' },
  { id: 'cultura', label: 'Cultura', icon: '🎭' },
  { id: 'sociologia', label: 'Sociologia', icon: '🏙️' },
  { id: 'filosofia', label: 'Filosofia', icon: '🤔' },
  // categorias adicionadas para as novas matérias
  { id: 'teologia', label: 'Teologia', icon: '✝️' },
  { id: 'religiao', label: 'Religião Iorubá', icon: '🪘' }
];

// ─── Hook principal ─────────────────────────────────────────────────
export const useGroupGame = (userData) => {
  const [roomCode, setRoomCode] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [phase, setPhase] = useState('menu'); // menu | lobby | countdown | playing | results
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [countdownValue, setCountdownValue] = useState(null);
  const [myAnswer, setMyAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const unsubRef = useRef(null);
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const lastQuestionRef = useRef(-1);
  const questionTimerStartedRef = useRef(false);
  const timerSeenPositiveRef = useRef(false); // só auto-submit se timer já foi > 0 nesta questão
  const submittingRef = useRef(false);
  const prevRoomSnapshotRef = useRef({ status: null, currentQuestion: null, questionStartedAt: null });

  // ── Limpa listeners ao desmontar ──
  useEffect(() => {
    return () => {
      if (unsubRef.current) unsubRef.current();
      if (timerRef.current) clearInterval(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  // ── Listener em tempo real da sala ──
  const subscribeToRoom = useCallback((code) => {
    if (unsubRef.current) unsubRef.current();

    console.log('group-game: subscribeToRoom', code);
    const roomRef = doc(db, 'rooms', code);
    const unsub = onSnapshot(roomRef, (snap) => {
      if (!snap.exists()) {
        setError('Sala não encontrada ou foi encerrada.');
        setPhase('menu');
        setRoomData(null);
        setRoomCode(null);
        return;
      }

      const data = { id: snap.id, ...snap.data() };
      const prev = prevRoomSnapshotRef.current;
      console.log('group-game: room snapshot (delta)', {
        code: snap.id,
        prev: { status: prev.status, currentQuestion: prev.currentQuestion, questionStartedAt: prev.questionStartedAt },
        next: { status: data.status, currentQuestion: data.currentQuestion, questionStartedAt: data.questionStartedAt?.toMillis?.() }
      });

      prevRoomSnapshotRef.current = { status: data.status, currentQuestion: data.currentQuestion, questionStartedAt: data.questionStartedAt?.toMillis?.() };

      setRoomData(data);

      // Auto-delete se a sala expirou
      try {
        if (data.expiresAt && typeof data.expiresAt.toMillis === 'function' && data.expiresAt.toMillis() <= Date.now()) {
          console.log('group-game: sala expirada — deletando', code);
          // tenta deletar o documento da sala
          deleteDoc(roomRef).catch(err => console.error('Erro deletando sala expirada:', err));
          setError('Sala expirada.');
          setPhase('menu');
          setRoomData(null);
          setRoomCode(null);
          return;
        }
      } catch (err) {
        console.error('Erro checando expiresAt:', err);
      }

      // Se o host não existe mais entre os players e a sala não está finalizada, encerra o jogo
      try {
        const hostId = data.hostId;
        const playersObj = data.players || {};
        if (hostId && !playersObj[hostId] && data.status !== 'finished') {
          console.log('group-game: host ausente — encerrando sala', code);
          updateDoc(roomRef, { status: 'finished', finishedAt: Timestamp.now() }).catch(err => console.error('Erro marcando sala como finished após host sair:', err));
        }
      } catch (err) {
        console.error('Erro checando host presence:', err);
      }

      // normalize server status -> local phase
      if (data.status === 'waiting') setPhase('lobby');
      else if (data.status === 'countdown') {
        // não força 'countdown' se já estivermos em 'playing' (cliente local avançou após o countdown)
        setPhase(prev => (prev === 'playing' ? 'playing' : 'countdown'));
      } else if (data.status === 'playing') setPhase('playing');
      else if (data.status === 'finished') setPhase('results');
    }, (err) => {
      console.error('Erro listener da sala:', err);
      setError('Erro de conexão com a sala.');
    });

    unsubRef.current = unsub;
  }, []);

  // ── Timer do countdown (3, 2, 1, JÁ!) ──
  useEffect(() => {
    if (phase === 'countdown') {
      console.log('group-game: local countdown start');
      // garante que não existam múltiplos intervals ativos
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }

      setCountdownValue(3);
      let val = 3;

      countdownRef.current = setInterval(() => {
        val -= 1;
        if (val <= 0) {
          // mostra 0 (frame final)
          clearInterval(countdownRef.current);
          countdownRef.current = null;
          setCountdownValue(0);

          // pequeno delay para evitar flashing/duplicação na transição do AnimatePresence
          setTimeout(async () => {
            // avança localmente para playing
            setPhase('playing');

            // se sou o host, atualizo o documento da sala com o status 'playing' e o timestamp
            try {
              const uid = auth.currentUser?.uid;
              if (roomCode && roomData?.hostId === uid) {
                const roomRef = doc(db, 'rooms', roomCode);
                await updateDoc(roomRef, { status: 'playing', questionStartedAt: Timestamp.now() });
              }
            } catch (err) {
              console.error('Erro atualizando room->playing após countdown:', err);
            }
          }, 120);
        } else {
          console.log('group-game: countdown tick', val);
          setCountdownValue(val);
        }
      }, 1000);
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    };
  }, [phase, roomCode, roomData?.hostId]);

  // log das mudanças do phase (útil para debug de transições)
  useEffect(() => {
    console.log('group-game: phase changed', { phase, roomCode, currentQuestion: roomData?.currentQuestion, roomStatus: roomData?.status });
  }, [phase, roomCode, roomData?.currentQuestion, roomData?.status]);

  // ── Timer de cada questão (sincroniza com questionStartedAt para evitar races) ──
  useEffect(() => {
    if (phase === 'playing' && roomData) {
      const currentQ = roomData.currentQuestion ?? 0;
      const timeLimit = roomData.settings?.timePerQuestion || 20;

      // calcula tempo restante a partir do questionStartedAt (se disponível)
      const startedAtTs = roomData.questionStartedAt;
      let remaining = timeLimit;

      if (startedAtTs && typeof startedAtTs.toMillis === 'function') {
        const elapsed = Math.floor((Date.now() - startedAtTs.toMillis()) / 1000);
        remaining = Math.max(0, timeLimit - elapsed);
      }

      console.log('group-game: sync timer', { currentQ, remaining, timeLimit, questionStartedAt: startedAtTs?.toMillis?.() });

      // Se for nova questão, precisamos resetar estado; se apenas houve dessincronização do timer,
      // atualizamos `timer` sem limpar `myAnswer` para não sobrescrever escolhas locais.
      const isNewQuestion = currentQ !== lastQuestionRef.current;
      const needsTimerSync = timer !== remaining;

      if (isNewQuestion) {
        // reset completo para nova questão (mas preserva resposta local se já existir
        // para esta mesma questão — evita perder seleção por dessincronização)
        lastQuestionRef.current = currentQ;
        // não marca questionTimerStarted imediatamente — espera o state `timer` ser aplicado
        // preserve local answer if it already corresponds to this question
        setMyAnswer(prev => (prev && prev.questionIndex === currentQ ? prev : null));
        setShowExplanation(false);
        setTimer(remaining);

        // marcar refs depois que o state for aplicado (evita auto-submit por estado 'timer' ainda = 0)
        setTimeout(() => {
          questionTimerStartedRef.current = true;
          if (remaining > 0) timerSeenPositiveRef.current = true;
          console.log('group-game: refs marked after setTimer (new question)', { questionTimerStarted: questionTimerStartedRef.current, timerSeenPositive: timerSeenPositiveRef.current, remaining });
        }, 20);

        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        // se o tempo já expirou, não cria interval
        if (remaining > 0) {
          timerRef.current = setInterval(() => {
            setTimer(prev => {
              const next = prev <= 1 ? 0 : prev - 1;
              if (next > 0) timerSeenPositiveRef.current = true;
              if (prev <= 1) {
                clearInterval(timerRef.current);
                timerRef.current = null;
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      } else if (needsTimerSync) {
        // apenas sincroniza o timer local sem resetar o estado do jogador
        console.log('group-game: timer desync detected — syncing timer only', { timer, remaining });
        setTimer(remaining);
      }
    }

    return () => {
      if (timerRef.current && phase !== 'playing') {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [phase, roomData?.currentQuestion, roomData?.questionStartedAt, roomData?.settings?.timePerQuestion]);

  // debug do timer local (ticks)
  useEffect(() => {
    console.log('group-game: local timer tick', { timer, questionIndex: lastQuestionRef.current, timerSeenPositive: timerSeenPositiveRef.current });
  }, [timer]);

  // ═══════════════════════════════════════════════════════════════════
  // AÇÕES
  // ═══════════════════════════════════════════════════════════════════

  const createRoom = async (settings = {}) => {
    if (!auth.currentUser) return;
    setError(null);

    const code = generateRoomCode();
    const uid = auth.currentUser.uid;

    const questions = pickQuestions(
      settings.category || 'mixed',
      settings.questionCount || 10
    );

    if (questions.length === 0) {
      setError('Nenhuma questão disponível para essa categoria.');
      return;
    }

    const roomRef = doc(db, 'rooms', code);
    const roomPayload = {
      code,
      hostId: uid,
      hostName: userData.displayName || 'Anfitrião',
      status: 'waiting',
      createdAt: serverTimestamp(),
      // expira em 30 minutos por padrão
      expiresAt: Timestamp.fromMillis(Date.now() + 30 * 60 * 1000),
      settings: {
        maxPlayers: settings.maxPlayers || 8,
        questionCount: questions.length,
        timePerQuestion: settings.timePerQuestion || 20,
        category: settings.category || 'mixed'
      },
      players: {
        [uid]: {
          uid,
          displayName: userData.displayName || 'Anfitrião',
          photoURL: userData.photoURL || '',
          score: 0,
          answers: [],
          isReady: true,
          isConnected: true,
          xp: userData.xp || 0,
          level: Math.min(Math.floor((userData.xp || 0) / 2000) + 1, 20)
        }
      },
      currentQuestion: 0,
      questions
    };

    try {
      await setDoc(roomRef, roomPayload);
      setRoomCode(code);
      setPhase('lobby');
      subscribeToRoom(code);
    } catch (e) {
      console.error('Erro criando sala:', e);
      setError('Falha ao criar sala. Tente novamente.');
    }
  };

  const joinRoom = async (code) => {
    if (!auth.currentUser) return;
    setError(null);

    const upperCode = code.toUpperCase().trim();
    const roomRef = doc(db, 'rooms', upperCode);

    try {
      const snap = await getDoc(roomRef);
      if (!snap.exists()) {
        setError('Sala não encontrada. Verifique o código.');
        return;
      }

      const data = snap.data();
      if (data.status !== 'waiting') {
        setError('Esta sala já está em jogo ou encerrada.');
        return;
      }

      const playerCount = Object.keys(data.players || {}).length;
      if (playerCount >= (data.settings?.maxPlayers || 8)) {
        setError('Sala lotada! Máximo de jogadores atingido.');
        return;
      }

      const uid = auth.currentUser.uid;
      const playerPayload = {
        uid,
        displayName: userData.displayName || 'Jogador',
        photoURL: userData.photoURL || '',
        score: 0,
        answers: [],
        isReady: true,
        isConnected: true,
        xp: userData.xp || 0,
        level: Math.min(Math.floor((userData.xp || 0) / 2000) + 1, 20)
      };

      await updateDoc(roomRef, {
        [`players.${uid}`]: playerPayload
      });

      setRoomCode(upperCode);
      setPhase('lobby');
      subscribeToRoom(upperCode);
    } catch (e) {
      console.error('Erro entrando na sala:', e);
      setError('Falha ao entrar na sala.');
    }
  };

  const startGame = async () => {
    if (!roomCode || !roomData) return;
    if (auth.currentUser.uid !== roomData.hostId) return;

    const playerCount = Object.keys(roomData.players || {}).length;
    if (playerCount < 2) {
      setError('Mínimo de 2 jogadores para iniciar.');
      return;
    }

    try {
      const roomRef = doc(db, 'rooms', roomCode);
      // apenas inicia countdown no servidor — questionStartedAt será marcado quando
      // o countdown terminar (host) para sincronizar corretamente o tempo das questões
      await updateDoc(roomRef, {
        status: 'countdown',
        currentQuestion: 0
      });
    } catch (e) {
      console.error('Erro iniciando jogo:', e);
      setError('Falha ao iniciar o jogo.');
    }
  };

  const handleSubmitAnswer = async (answerIdx) => {
    console.log('group-game: submitAttempt', { answerIdx, timer, phase, currentQ: roomData?.currentQuestion });
    if (!roomCode || !roomData || myAnswer !== null) return;

    const uid = auth.currentUser.uid;
    const currentQ = roomData.currentQuestion ?? 0;
    const question = roomData.questions?.[currentQ];
    if (!question) return;

    const isCorrect = answerIdx === question.correct;
    const timeLimit = roomData.settings?.timePerQuestion || 20;
    const timeSpent = timeLimit - timer;

    // Pontuação: Base 1000 * timeBonus (mais rápido = mais pontos)
    let points = 0;
    if (isCorrect) {
      const timeBonus = Math.max(0, (timeLimit - timeSpent) / timeLimit);
      points = Math.round(1000 * (0.5 + 0.5 * timeBonus)); // 500~1000
    }

    const answerRecord = {
      questionIndex: currentQ,
      answerIndex: answerIdx,
      timeSpent,
      correct: isCorrect,
      points
    };

    // guard against double-submit/race
    if (submittingRef.current) return;
    submittingRef.current = true;

    setMyAnswer(answerRecord);
    console.log('group-game: myAnswer set (local)', answerRecord);

    try {
      const roomRef = doc(db, 'rooms', roomCode);

      // Use arrayUnion and increment to avoid races/overwrites entre clientes
      const updates = {};
      updates[`players.${uid}.answers`] = arrayUnion(answerRecord);
      if (points !== 0) updates[`players.${uid}.score`] = increment(points);

      await updateDoc(roomRef, updates);
    } catch (e) {
      console.error('Erro enviando resposta:', e);
    } finally {
      submittingRef.current = false;
    }
  };

  // ── Auto-submit quando o timer zerar (garante que o timer foi inicializado para a questão atual) ──
  useEffect(() => {
    const currentQ = typeof roomData?.currentQuestion === 'number' ? roomData.currentQuestion : null;

    // evitar race: só auto-submit se o timer foi inicializado para essa questão (flag) e o index bater
    if (
      timer === 0 &&
      phase === 'playing' &&
      myAnswer === null &&
      roomData &&
      currentQ !== null &&
      lastQuestionRef.current === currentQ &&
      lastQuestionRef.current !== -1 &&
      questionTimerStartedRef.current === true
    ) {
      if (!timerSeenPositiveRef.current) {
        console.warn('group-game: suppressing auto-submit (timer never observed >0 for this question)', { timer, currentQ, lastQuestion: lastQuestionRef.current, questionTimerStarted: questionTimerStartedRef.current });
        return;
      }

      console.warn('group-game: auto-submit triggered', { timer, currentQ, lastQuestion: lastQuestionRef.current, questionTimerStarted: questionTimerStartedRef.current });
      handleSubmitAnswer(-1); // -1 = não respondeu
    }
  }, [timer, phase, myAnswer, roomData, handleSubmitAnswer]);

  const advanceQuestion = async () => {
    if (!roomCode || !roomData) return;
    if (auth.currentUser.uid !== roomData.hostId) return;

    const currentQ = roomData.currentQuestion ?? 0;
    const totalQuestions = roomData.questions?.length || 0;

    console.log('group-game: advanceQuestion called', { currentQ, totalQuestions });

    try {
      const roomRef = doc(db, 'rooms', roomCode);

      if (currentQ + 1 >= totalQuestions) {
        // Jogo acabou
        await updateDoc(roomRef, {
          status: 'finished',
          finishedAt: Timestamp.now()
        });
      } else {
        // Próxima questão
        await updateDoc(roomRef, {
          currentQuestion: currentQ + 1,
          questionStartedAt: Timestamp.now()
        });
        lastQuestionRef.current = -1; // força reset do timer
        questionTimerStartedRef.current = false; // garantir flag limpa durante transição
        timerSeenPositiveRef.current = false;
      }
    } catch (e) {
      console.error('Erro avançando questão:', e);
    }
  };

  const leaveRoom = async () => {
    if (!roomCode) {
      resetState();
      return;
    }

    const uid = auth.currentUser?.uid;
    if (!uid) {
      resetState();
      return;
    }

    try {
      const roomRef = doc(db, 'rooms', roomCode);
      const snap = await getDoc(roomRef);

      if (snap.exists()) {
        const data = snap.data();
        const isHost = data.hostId === uid;
        const playerCount = Object.keys(data.players || {}).length;

        if (isHost) {
          // Se o host está saindo, encerra o jogo caso já esteja em andamento,
          // caso contrário remove a sala (espera)
          if (data.status === 'playing' || data.status === 'countdown') {
            await updateDoc(roomRef, { status: 'finished', finishedAt: Timestamp.now() });
          } else {
            await deleteDoc(roomRef);
          }
        } else if (playerCount <= 1) {
          // último jogador: remove a sala
          await deleteDoc(roomRef);
        } else {
          // Remove apenas o jogador
          const updatedPlayers = { ...data.players };
          delete updatedPlayers[uid];
          await updateDoc(roomRef, { players: updatedPlayers });
        }
      }
    } catch (e) {
      console.error('Erro saindo da sala:', e);
    }

    resetState();
  };

  const resetState = () => {
    if (unsubRef.current) unsubRef.current();
    if (timerRef.current) clearInterval(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    setRoomCode(null);
    setRoomData(null);
    setPhase('menu');
    setError(null);
    setMyAnswer(null);
    setTimer(0);
    setShowExplanation(false);
    lastQuestionRef.current = -1;
    questionTimerStartedRef.current = false;
    timerSeenPositiveRef.current = false;
  };

  // ── Helpers derivados ──
  const isHost = roomData?.hostId === auth.currentUser?.uid;
  const players = roomData?.players ? Object.values(roomData.players) : [];
  const sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
  const currentQuestion = roomData?.questions?.[roomData?.currentQuestion ?? 0] || null;
  const totalQuestions = roomData?.questions?.length || 0;
  const currentQuestionIndex = roomData?.currentQuestion ?? 0;

  // Verifica se todos responderam a questão atual
  const allAnswered = players.length > 0 && players.every(p => {
    const answers = p.answers || [];
    return answers.some(a => a.questionIndex === currentQuestionIndex);
  });

  return {
    // Estado
    phase,
    roomCode,
    roomData,
    error,
    timer,
    countdownValue,
    myAnswer,
    showExplanation,
    setShowExplanation,

    // Dados derivados
    isHost,
    players,
    sortedPlayers,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    allAnswered,

    // Ações
    createRoom,
    joinRoom,
    startGame,
    handleSubmitAnswer,
    advanceQuestion,
    leaveRoom,
    setError
  };
};
