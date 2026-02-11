import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';

import { auth, db } from './firebase';
import { SUBJECTS } from './constants/subjects';
import { BADGES, GEO_BADGES, TERRITORY_BADGES } from './constants/badges';
import { INITIAL_USER_STATE } from './constants/initialUserState';

const ALL_BADGES = [...BADGES, ...GEO_BADGES, ...TERRITORY_BADGES];

import { LoginScreen } from './components/auth/LoginScreen';
import { Dashboard } from './components/dashboard/Dashboard';
import { SubjectsList } from './components/subjects/SubjectsList';
import { QuizScreen } from './components/quiz/QuizScreen';
import { RankingScreen } from './components/ranking/RankingScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { AchievementToast } from './components/common/AchievementToast';
import { getIconComponent } from './utils/iconMapper';
import LoadingScreen from './components/common/LoadingScreen';
import { SimulatedScreen } from './components/simulated/SimulatedScreen';
import { SubjectDetails } from './components/subjects/SubjectDetails';
import { GeoGame } from './components/geo-game/GeoGame';
import { DifficultySelector } from './components/quiz/DifficultySelector';
// Importação do Novo Jogo
import { TerritoryManager } from './components/simulated/TerritoryManager';
import { CarnivalChallenge } from './components/carnival/CarnivalChallenge';
import { GroupGameScreen } from './components/group-game/GroupGameScreen';

export default function App() {
  const [view, setView] = useState('login');
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  const [quizStep, setQuizStep] = useState(0);
  const [newBadge, setNewBadge] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [userData, setUserData] = useState(INITIAL_USER_STATE);
  const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showSubjectDetails, setShowSubjectDetails] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const toggleTheme = () => setIsDark(!isDark);

  const subjectsWithIcons = useMemo(() =>
    SUBJECTS.map(subject => ({
      ...subject,
      icon: getIconComponent(subject.iconName, 24)
    })), []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await syncUserData(firebaseUser);
        setView('dashboard');
      } else {
        setUserData(INITIAL_USER_STATE);
        setView('login');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const players = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
      setGlobalLeaderboard(players);
    });
    return () => unsubscribe();
  }, []);

  // Verifica badges retroativamente ao carregar dados do usuário
  useEffect(() => {
    if (userData.uid && userData.correctQuestions?.length > 0) {
      checkAndUnlockBadges(userData.correctQuestions, userData.xp || 0);
    }
  }, [userData.uid]);


  const calculateDaysActive = (createdAt) => {
    try {
      if (!createdAt) return 1;
      
      // Converte para objeto Date e valida
      const start = new Date(createdAt);
      if (isNaN(start.getTime())) return 1;

      const today = new Date();
      
      // Normalização para comparar apenas calendários (meia-noite)
      const d1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
      const d2 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());

      const msPerDay = 1000 * 60 * 60 * 24;
      const diff = Math.floor((d1 - d2) / msPerDay);
      
      return diff + 1;
    } catch (error) {
      return 1;
    }
  };

  // Retorna a data da última segunda-feira à meia-noite (UTC)
  const getWeekStart = () => {
    const now = new Date();
    const day = now.getUTCDay(); // 0=dom, 1=seg, ...
    const diff = day === 0 ? 6 : day - 1; // dias desde segunda
    const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - diff));
    return monday.toISOString();
  };

  const syncUserData = async (firebaseUser) => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDocSnap = await getDoc(userDocRef);
    const now = new Date().toISOString();
    const currentWeekStart = getWeekStart();

    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      
      // Garante que createdAt exista
      const creationDate = data.createdAt || now;
      const daysActive = calculateDaysActive(creationDate);

      // Reset semanal de XP: se a semana mudou, zera o weeklyXp
      const storedWeekStart = data.weeklyXpResetAt || '';
      const weeklyXp = storedWeekStart === currentWeekStart ? (data.weeklyXp || 0) : 0;
      
      const mergedData = { 
        ...data, 
        uid: firebaseUser.uid,
        lastLogin: now,
        streak: Number(daysActive) || 1,
        createdAt: creationDate,
        weeklyXp,
        weeklyXpResetAt: currentWeekStart
      };
      
      setUserData(mergedData);
      await setDoc(userDocRef, mergedData, { merge: true });
    } else {
      const newUser = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || 'Estudante',
        email: firebaseUser.email || '',
        photoURL: firebaseUser.photoURL || '',
        createdAt: now,
        lastLogin: now,
        xp: 0,
        weeklyXp: 0,
        weeklyXpResetAt: currentWeekStart,
        points: 0,
        completed: [],
        badges: [],
        correctQuestions: [],
        streak: 1
      };
      await setDoc(userDocRef, newUser);
      setUserData(newUser);
    }
  };

  const handleSelectSubject = (id) => {
    setActiveSubjectId(id);
    setQuizFinished(false);
    setView('difficulty-selection');
  };

  const startFilteredQuiz = (difficulty, skillCode) => {
    const subject = subjectsWithIcons.find(s => s.id === activeSubjectId);
    if (!subject) return;

    let questions = [...subject.questions];

    if (difficulty !== 'all') {
      questions = questions.filter(q => q.difficulty === difficulty);
    }

    if (skillCode !== 'all') {
      questions = questions.filter(q => q.skillCode === skillCode);
    }

    if (questions.length === 0) {
      alert("Nenhuma questão encontrada com esses parâmetros, Comandante.");
      return;
    }

    // Embaralha as alternativas de cada questão para evitar padrões
    const shuffledQuestions = questions.map(q => {
      const answers = q.a.map((text, originalIdx) => ({ text, originalIdx }));
      // Fisher-Yates shuffle
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      const newCorrectIdx = answers.findIndex(a => a.originalIdx === q.correct);
      return {
        ...q,
        a: answers.map(a => a.text),
        correct: newCorrectIdx
      };
    });

    setFilteredQuestions(shuffledQuestions);
    setQuizStep(0);
    setQuizFinished(false);
    setAnswerFeedback(null);
    setView('quiz');
  };

  const unlockBadge = async (badgeId) => {
    if (!auth.currentUser || !userData || userData.badges.includes(badgeId)) return;
    const badge = BADGES.find(b => b.id === badgeId);
    if (!badge) return;

    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, { badges: arrayUnion(badgeId) });
      setUserData(prev => ({ ...prev, badges: [...prev.badges, badgeId] }));
      setNewBadge(badge);
      setTimeout(() => setNewBadge(null), 5000);

      const achievementsRef = collection(db, 'users', auth.currentUser.uid, 'achievements');
      await setDoc(doc(achievementsRef, badgeId), {
        badgeId,
        name: badge.name,
        unlockedAt: new Date().toISOString(),
        description: badge.desc || ''
      });
    } catch (error) {
      console.error("Erro ao registrar medalha:", error);
    }
  };

  // Verificação automática de badges baseada no estado atual do usuário
  const checkAndUnlockBadges = async (correctQuestions, currentXp) => {
    if (!auth.currentUser) return;
    const userBadges = [...(userData.badges || [])];

    // Mapeamento de prefixo de questão → disciplina (para badge multidisciplinar)
    const disciplineMap = {
      'mat': 'matematica',
      'geo': 'geografia',
      'hist': 'historia',
      'bio': 'biologia',
      'lin': 'linguagens',
      'soc': 'sociologia',
      'fil': 'filosofia'
    };

    // Conta questões por disciplina e dificuldade
    const countByDiscipline = {};
    const allQuestions = SUBJECTS.flatMap(s => s.questions);
    const questionDifficultyMap = {};
    allQuestions.forEach(q => {
      questionDifficultyMap[q.id] = q.difficulty;
    });

    let mediumCount = 0;
    let hardCount = 0;

    correctQuestions.forEach(qId => {
      // Conta por disciplina
      const prefix = qId.split('-')[0];
      const discipline = disciplineMap[prefix];
      if (discipline) {
        countByDiscipline[discipline] = (countByDiscipline[discipline] || 0) + 1;
      }
      // Conta por dificuldade
      const diff = questionDifficultyMap[qId];
      if (diff === 'medium') mediumCount++;
      if (diff === 'hard') hardCount++;
    });

    for (const badge of BADGES) {
      if (userBadges.includes(badge.id)) continue;

      let shouldUnlock = false;

      // 1. Badges baseados em reqQuestions (lista específica de questões)
      if (badge.reqQuestions && badge.reqQuestions.length > 0) {
        shouldUnlock = badge.reqQuestions.every(qId => correctQuestions.includes(qId));
      }

      // 2. Badges baseados em reqTotalCorrect (total de acertos)
      if (!shouldUnlock && badge.reqTotalCorrect) {
        shouldUnlock = correctQuestions.length >= badge.reqTotalCorrect;
      }

      // 3. Badges baseados em reqTotalXP
      if (!shouldUnlock && badge.reqTotalXP) {
        shouldUnlock = (currentXp || 0) >= badge.reqTotalXP;
      }

      // 4. Badges baseados em reqQuestionsCount + reqDifficulty
      if (!shouldUnlock && badge.reqQuestionsCount && badge.reqDifficulty) {
        if (badge.reqDifficulty === 'medium') {
          shouldUnlock = mediumCount >= badge.reqQuestionsCount;
        } else if (badge.reqDifficulty === 'hard') {
          shouldUnlock = hardCount >= badge.reqQuestionsCount;
        }
      }

      // 5. Badge multidisciplinar (reqDisciplines)
      if (!shouldUnlock && badge.reqDisciplines) {
        shouldUnlock = Object.entries(badge.reqDisciplines).every(
          ([disc, minCount]) => (countByDiscipline[disc] || 0) >= minCount
        );
      }

      // 6. Badge de dias consecutivos (reqConsecutiveDays)
      if (!shouldUnlock && badge.reqConsecutiveDays) {
        shouldUnlock = (userData.streak || 0) >= badge.reqConsecutiveDays;
      }

      // 7. Badge de ranking semanal (reqWeeklyRank)
      if (!shouldUnlock && badge.reqWeeklyRank) {
        // Calcula a posição do usuário no ranking semanal
        const weeklyRanking = [...globalLeaderboard]
          .filter(u => (u.weeklyXp || 0) > 0)
          .sort((a, b) => (b.weeklyXp || 0) - (a.weeklyXp || 0));
        const userWeeklyPos = weeklyRanking.findIndex(u => u.uid === userData.uid) + 1;
        if (userWeeklyPos > 0 && userWeeklyPos <= badge.reqWeeklyRank) {
          shouldUnlock = true;
        }
      }

      if (shouldUnlock) {
        await unlockBadge(badge.id);
        // Atualiza a lista local para evitar re-desbloqueio no mesmo ciclo
        userBadges.push(badge.id);
      }
    }
  };

  const handleAnswer = async (idx) => {
    if (answerFeedback) return;
    const currentQuestion = filteredQuestions[quizStep];

    if (idx === currentQuestion.correct) {
      setAnswerFeedback({ index: idx, status: 'correct' });

      let updatedCorrectQuestions = [...(userData.correctQuestions || [])];
      if (!updatedCorrectQuestions.includes(currentQuestion.id)) {
        updatedCorrectQuestions.push(currentQuestion.id);
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, { correctQuestions: updatedCorrectQuestions });
        setUserData(prev => ({ ...prev, correctQuestions: updatedCorrectQuestions }));

        // Verifica se novos badges devem ser desbloqueados
        checkAndUnlockBadges(updatedCorrectQuestions, userData.xp || 0);
      }

      setTimeout(() => {
        if (quizStep + 1 < filteredQuestions.length) {
          setQuizStep(quizStep + 1);
          setAnswerFeedback(null);
        } else {
          updateProgress(activeSubject.xp, activeSubject.id);
          setQuizFinished(true);
          setAnswerFeedback(null);
        }
      }, 800);
    } else {
      setAnswerFeedback({ index: idx, status: 'wrong' });
    }
  };

  const handleResetQuiz = () => {
    // Re-embaralha as alternativas ao reiniciar
    setFilteredQuestions(prev => prev.map(q => {
      const answers = q.a.map((text, originalIdx) => ({ text, originalIdx }));
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      const newCorrectIdx = answers.findIndex(a => a.originalIdx === q.correct);
      return { ...q, a: answers.map(a => a.text), correct: newCorrectIdx };
    }));
    setQuizStep(0);
    setQuizFinished(false);
    setAnswerFeedback(null);
  };

  const updateProgress = async (newXp, subjectId) => {
    if (!auth.currentUser) return;
    const totalXp = (userData.xp || 0) + newXp;
    
    // Verifica se subjectId é valido antes de adicionar aos completados
    // Para o TerritoryManager, usamos um ID simbólico, mas talvez não queiramos adicionar na lista de 'completed' se não for uma matéria
    let updatedCompleted = userData.completed;
    if (subjectId && !userData.completed.includes(subjectId)) {
        updatedCompleted = [...userData.completed, subjectId];
    }

    const totalWeeklyXp = (userData.weeklyXp || 0) + newXp;

    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, { xp: totalXp, weeklyXp: totalWeeklyXp, completed: updatedCompleted });
      setUserData(prev => ({ ...prev, xp: totalXp, weeklyXp: totalWeeklyXp, completed: updatedCompleted }));

      // Verifica badges de XP após atualizar progresso
      checkAndUnlockBadges(userData.correctQuestions || [], totalXp);
    } catch (e) {
      console.error("Erro ao atualizar progresso", e);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Erro Login Google:", error);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Erro Login Anonimo:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setView('login');
    } catch (error) {
      console.error("Erro Logout:", error);
    }
  };

  const handleUpdateProfile = async (updates) => {
    if (!auth.currentUser) return;
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, updates);
      setUserData(prev => ({ ...prev, ...updates }));
    } catch (error) {
      console.error("Erro Update Profile:", error);
    }
  };

  const handleUpdateBackground = async (bg) => {
    handleUpdateProfile({ profileBg: bg });
  };

  const activeSubject = useMemo(() =>
    subjectsWithIcons.find(s => s.id === activeSubjectId),
    [activeSubjectId, subjectsWithIcons]
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'} ${view !== 'login' ? 'pb-24' : ''}`}>
      {view !== 'login' && <BottomNavigation view={view} setView={setView} isDark={isDark} />}

      <main className="max-w-md mx-auto px-6 pt-10 pb-4 h-full">
        <AnimatePresence mode="wait">
          {view === 'login' && (
            <LoginScreen
              onGoogleLogin={handleGoogleLogin}
              onAnonymousLogin={handleAnonymousLogin}
              isDark={isDark}
              toggleTheme={toggleTheme}
            />
          )}

          {view === 'dashboard' && (
            <Dashboard
              userData={userData}
              isDark={isDark}
              toggleTheme={toggleTheme}
              setView={setView}
              badges={ALL_BADGES}
            />
          )}

          {view === 'subjects' && (
            <SubjectsList
              subjects={subjectsWithIcons}
              userData={userData}
              isDark={isDark}
              setActiveSubjectId={handleSelectSubject}
              setView={setView}
              toggleTheme={toggleTheme}
            />
          )}

          {view === 'difficulty-selection' && activeSubject && (
            <DifficultySelector
              subject={activeSubject}
              onStart={startFilteredQuiz}
              onBack={() => setView('subjects')}
              isDark={isDark}
            />
          )}

          {view === 'quiz' && activeSubject && (
            <QuizScreen
              activeSubject={{ ...activeSubject, questions: filteredQuestions }}
              quizStep={quizStep}
              isDark={isDark}
              toggleTheme={toggleTheme}
              setView={setView}
              answerFeedback={answerFeedback}
              handleAnswer={handleAnswer}
              quizFinished={quizFinished}
              handleResetQuiz={handleResetQuiz}
            />
          )}

          {view === 'ranking' && (
            <RankingScreen
              globalLeaderboard={globalLeaderboard}
              userData={userData}
              isDark={isDark}
              toggleTheme={toggleTheme}
            />
          )}

          {view === 'profile' && (
            <ProfileScreen
              userData={userData}
              isDark={isDark}
              toggleTheme={toggleTheme}
              handleLogout={handleLogout}
              handleUpdateProfile={handleUpdateProfile}
              handleUpdateBackground={handleUpdateBackground}
              globalLeaderboard={globalLeaderboard}
              subjects={subjectsWithIcons}
              badges={ALL_BADGES}
            />
          )}

          {view === 'geo-game' && (
            <GeoGame
              setView={setView}
              isDark={isDark}
              userData={userData}
              updateProgress={updateProgress}
              unlockBadge={unlockBadge}
            />
          )}

          {/* Integração do Territory Manager */}
          {view === 'territory-manager' && (
            <TerritoryManager 
              setView={setView}
              isDark={isDark}
              updateProgress={updateProgress}
            />
          )}

          {/* Desafio Especial de Carnaval */}
          {view === 'carnival-challenge' && (
            <CarnivalChallenge
              setView={setView}
              isDark={isDark}
              userData={userData}
              updateProgress={updateProgress}
              unlockBadge={unlockBadge}
            />
          )}

          {/* Arena VestQuiz - Jogo em Grupo ao Vivo */}
          {view === 'group-game' && (
            <GroupGameScreen
              setView={setView}
              isDark={isDark}
              userData={userData}
              updateProgress={updateProgress}
              unlockBadge={unlockBadge}
            />
          )}
        </AnimatePresence>

        {showSubjectDetails && selectedSubject && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <SubjectDetails
              subject={selectedSubject}
              isDark={isDark}
              onClose={() => { setShowSubjectDetails(false); setSelectedSubject(null); }}
            />
          </div>
        )}
      </main>

      <AnimatePresence>
        {newBadge && <AchievementToast badge={newBadge} onDismiss={() => setNewBadge(null)} />}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes badge-glow { 
          0%, 100% { filter: drop-shadow(0 0 5px rgba(16, 185, 129, 0.3)); } 
          50% { filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.6)); } 
        }
        .badge-glow { animation: badge-glow 2s ease-in-out infinite; }
      `}} />
    </div>
  );
}