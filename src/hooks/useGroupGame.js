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
  Timestamp
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
  { id: 'filosofia', label: 'Filosofia', icon: '🤔' }
];

// ─── Hook principal ─────────────────────────────────────────────────
export const useGroupGame = (userData) => {
  const [roomCode, setRoomCode] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [phase, setPhase] = useState('menu'); // menu | lobby | countdown | playing | results
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [countdownValue, setCountdownValue] = useState(3);
  const [myAnswer, setMyAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const unsubRef = useRef(null);
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const lastQuestionRef = useRef(-1);

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
      setRoomData(data);

      // Detecta mudanças de estado
      if (data.status === 'countdown' && phase !== 'countdown' && phase !== 'playing' && phase !== 'results') {
        setPhase('countdown');
      }
      if (data.status === 'playing' && phase !== 'playing' && phase !== 'results') {
        setPhase('playing');
      }
      if (data.status === 'finished') {
        setPhase('results');
      }
    }, (err) => {
      console.error('Erro listener da sala:', err);
      setError('Erro de conexão com a sala.');
    });

    unsubRef.current = unsub;
  }, [phase]);

  // ── Timer do countdown (3, 2, 1, JÁ!) ──
  useEffect(() => {
    if (phase === 'countdown') {
      setCountdownValue(3);
      let val = 3;
      countdownRef.current = setInterval(() => {
        val -= 1;
        if (val <= 0) {
          clearInterval(countdownRef.current);
          setPhase('playing');
        } else {
          setCountdownValue(val);
        }
      }, 1000);
    }
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [phase]);

  // ── Timer de cada questão ──
  useEffect(() => {
    if (phase === 'playing' && roomData) {
      const currentQ = roomData.currentQuestion ?? 0;

      // Nova questão detectada
      if (currentQ !== lastQuestionRef.current) {
        lastQuestionRef.current = currentQ;
        setMyAnswer(null);
        setShowExplanation(false);
        const timeLimit = roomData.settings?.timePerQuestion || 20;
        setTimer(timeLimit);

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setTimer(prev => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
    return () => {
      if (timerRef.current && phase !== 'playing') clearInterval(timerRef.current);
    };
  }, [phase, roomData?.currentQuestion]);

  // ── Auto-submit quando o timer zerar ──
  useEffect(() => {
    if (timer === 0 && phase === 'playing' && myAnswer === null && roomData) {
      handleSubmitAnswer(-1); // -1 = não respondeu
    }
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

    // debug: ensure auth available
    console.log('joinRoom called with code=', code, 'uid=', auth.currentUser?.uid);

    const upperCode = code.toUpperCase().trim();
    const roomRef = doc(db, 'rooms', upperCode);

    try {
      const snap = await getDoc(roomRef);
      if (!snap.exists()) {
        setError('Sala não encontrada. Verifique o código.');
        return;
      }

      const data = snap.data();
      console.log('joinRoom: room snapshot data=', data);
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

      console.log('joinRoom: updating with players.' + uid, playerPayload);

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
      await updateDoc(roomRef, {
        status: 'countdown',
        currentQuestion: 0,
        questionStartedAt: Timestamp.now()
      });
    } catch (e) {
      console.error('Erro iniciando jogo:', e);
      setError('Falha ao iniciar o jogo.');
    }
  };

  const handleSubmitAnswer = async (answerIdx) => {
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

    setMyAnswer(answerRecord);

    try {
      const roomRef = doc(db, 'rooms', roomCode);
      const playerData = roomData.players[uid];
      const updatedAnswers = [...(playerData?.answers || []), answerRecord];
      const updatedScore = (playerData?.score || 0) + points;

      await updateDoc(roomRef, {
        [`players.${uid}.answers`]: updatedAnswers,
        [`players.${uid}.score`]: updatedScore
      });
    } catch (e) {
      console.error('Erro enviando resposta:', e);
    }
  };

  const advanceQuestion = async () => {
    if (!roomCode || !roomData) return;
    if (auth.currentUser.uid !== roomData.hostId) return;

    const currentQ = roomData.currentQuestion ?? 0;
    const totalQuestions = roomData.questions?.length || 0;

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

        if (isHost || playerCount <= 1) {
          // Se é o host ou último jogador, deleta a sala
          await deleteDoc(roomRef);
        } else {
          // Remove o jogador
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
