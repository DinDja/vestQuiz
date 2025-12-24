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
  updateDoc
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { SUBJECTS } from './constants/subjects';
import { BADGES } from './constants/badges';
import { INITIAL_USER_STATE } from './constants/initialUserState';

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

  const toggleTheme = () => setIsDark(!isDark);

  // Converter subjects para incluir componente de ícone
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
    const q = query(
      collection(db, 'users'),
      orderBy('xp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const players = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));
      setGlobalLeaderboard(players);
    });

    return () => unsubscribe();
  }, []);

  const generateRandomName = () => {
    const prefixes = ['Estudante', 'Curioso', 'Aprendiz', 'Candidato', 'Futuro', 'Brilhante', 'Dedicado'];
    const suffixes = ['Determinado', 'Esforçado', 'Focado', 'Inteligente', 'Persistente', 'Vencedor'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomNumber = Math.floor(Math.random() * 1000);

    return `${randomPrefix} ${randomSuffix} ${randomNumber}`;
  };

  // Função para gerar cores de avatar baseadas no ID do usuário
  const generateAvatarColor = (uid) => {
    const colors = [
      'bg-indigo-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500',
      'bg-purple-500', 'bg-blue-500', 'bg-cyan-500', 'bg-pink-500'
    ];
    const hash = uid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const handleUpdateBackground = async (backgroundData) => {
    if (!auth.currentUser) return;

    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, backgroundData);

      // Atualizar estado local
      setUserData(prev => ({
        ...prev,
        ...backgroundData
      }));

      console.log('Fundo do perfil atualizado:', backgroundData);
    } catch (error) {
      console.error("Erro ao atualizar fundo do perfil:", error);
    }
  };

  const syncUserData = async (firebaseUser) => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    // Se for usuário anônimo sem nome, gerar um nome aleatório
    let displayName = firebaseUser.displayName;
    if (firebaseUser.isAnonymous && (!displayName || displayName === 'Pirata Sem Nome')) {
      displayName = generateRandomName();
    }

    const userBasicData = {
      uid: firebaseUser.uid,
      displayName: displayName || 'Estudante',
      email: firebaseUser.email || '',
      photoURL: firebaseUser.photoURL || '',
      lastLogin: new Date().toISOString(),
      isAnonymous: firebaseUser.isAnonymous || false,
      createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
      bio: firebaseUser.isAnonymous ? 'Estudando incógnito 🕵️‍♂️' : 'Em busca da aprovação! 💪',
      xp: 0,
      points: 0,
      completed: [],
      badges: [],
      correctQuestions: [],
      streak: 1,
      // NOVOS CAMPOS:
      profileBackground: '', // URL da imagem ou cor
      profileTheme: 'indigo', // Cor do tema: indigo, emerald, rose, amber, etc.
      profileGradient: 'from-indigo-600 to-purple-600', // Gradiente padrão
      coverImage: '', // Imagem de capa
      coverColor: '#4f46e5' // Cor de fundo padrão (indigo-600)
    };

    if (userDocSnap.exists()) {
      const existingData = userDocSnap.data();

      // Se for usuário anônimo e não tem nome ou tem nome genérico, atualizar
      if (firebaseUser.isAnonymous &&
        (!existingData.displayName ||
          existingData.displayName === 'Pirata Sem Nome' ||
          existingData.displayName === 'Estudante Anônimo')) {
        userBasicData.displayName = generateRandomName();
      }

      const mergedData = {
        ...userBasicData,
        ...existingData,
        uid: firebaseUser.uid,
        lastLogin: new Date().toISOString(),
        isAnonymous: firebaseUser.isAnonymous
      };

      setUserData(mergedData);
      await setDoc(userDocRef, mergedData, { merge: true });
    } else {
      await setDoc(userDocRef, userBasicData);
      setUserData(userBasicData);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code !== 'auth/cancelled-popup-request' && error.code !== 'auth/popup-closed-by-user') {
        console.error("Erro no login:", error);
      }
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Erro login anônimo:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setView('login');
    } catch (error) {
      console.error("Erro logout:", error);
    }
  };

  const saveProgressToFirestore = async (newData) => {
    if (!auth.currentUser) return;
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userDocRef, newData);

    const historyRef = collection(db, 'users', auth.currentUser.uid, 'history');
    await setDoc(doc(historyRef, new Date().getTime().toString()), {
      timestamp: new Date().toISOString(),
      xpGained: newData.xp ? (newData.xp - (userData.xp || 0)) : 0,
      action: 'Progress Update'
    });
  };

  const handleUpdateProfile = async (updatedFields) => {
    if (!auth.currentUser) return;
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, updatedFields);
      setUserData(prev => ({ ...prev, ...updatedFields }));
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  const updateProgress = async (newXp, subjectId) => {
    if (!auth.currentUser) return;

    const totalXp = (userData.xp || 0) + newXp;
    const newPoints = (userData.points || 0) + (newXp * 0.5);
    const updatedCompleted = [...(userData.completed || [])];
    let shouldUpdateCompleted = false;

    if (subjectId && !updatedCompleted.includes(subjectId)) {
      updatedCompleted.push(subjectId);
      shouldUpdateCompleted = true;
    }

    const updatedData = {
      ...userData,
      xp: totalXp,
      points: newPoints,
      completed: updatedCompleted
    };

    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);

      // Preparar dados para atualização
      const updateData = {
        xp: totalXp,
        points: newPoints
      };

      // Adicionar completed apenas se necessário
      if (shouldUpdateCompleted) {
        updateData.completed = updatedCompleted;
      }

      // Atualizar no Firestore
      await updateDoc(userDocRef, updateData);

      // Atualizar estado local
      setUserData(updatedData);

      // Salvar no histórico
      const historyRef = collection(db, 'users', auth.currentUser.uid, 'history');
      await setDoc(doc(historyRef, new Date().getTime().toString()), {
        timestamp: new Date().toISOString(),
        xpGained: newXp,
        subjectId: subjectId,
        action: 'Completed Subject'
      });

    } catch (error) {
      console.error("Erro ao atualizar progresso:", error);
    }
  };


  const checkForBadges = async (currentCorrectQuestions) => {
    if (!auth.currentUser) {
      console.error("Usuário não autenticado");
      return null;
    }

    const currentBadges = [...(userData.badges || [])];
    const newBadgesList = [];
    let unlockedBadge = null;

    // Verificar quais badges o usuário pode desbloquear
    BADGES.forEach(badge => {
      if (!currentBadges.includes(badge.id)) {
        const hasAllRequirements = badge.reqQuestions.every(reqId =>
          currentCorrectQuestions.includes(reqId)
        );

        if (hasAllRequirements) {
          newBadgesList.push(badge.id);
          unlockedBadge = badge; // Guardar a badge para mostrar no toast
        }
      }
    });

    // Se houver novas badges
    if (newBadgesList.length > 0) {
      console.log('Novas conquistas desbloqueadas:', newBadgesList);

      const updatedBadges = [...currentBadges, ...newBadgesList];
      const updatedData = {
        ...userData,
        badges: updatedBadges
      };

      try {
        // Atualizar no Firestore
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, { badges: updatedBadges });

        // Atualizar estado local
        setUserData(updatedData);

        // Salvar histórico de cada conquista
        const achievementsRef = collection(db, 'users', auth.currentUser.uid, 'achievements');

        for (const badgeId of newBadgesList) {
          const badgeDocRef = doc(achievementsRef, badgeId);
          const badgeData = {
            badgeId,
            name: BADGES.find(b => b.id === badgeId)?.name || badgeId,
            unlockedAt: new Date().toISOString(),
            description: BADGES.find(b => b.id === badgeId)?.desc || ''
          };

          await setDoc(badgeDocRef, badgeData, { merge: true });
          console.log(`Conquista ${badgeId} salva no Firestore`);
        }

        // Mostrar toast para a primeira conquista
        if (unlockedBadge) {
          setNewBadge(unlockedBadge);
          setTimeout(() => setNewBadge(null), 5000);
        }

        return unlockedBadge;
      } catch (error) {
        console.error("Erro ao salvar conquistas:", error);
        return null;
      }
    }

    return null;
  };

  const handleAnswer = async (idx) => {
    if (answerFeedback || !activeSubject) return;

    const currentQuestion = activeSubject.questions[quizStep];
    const correct = currentQuestion.correct;

    if (idx === correct) {
      setAnswerFeedback({ index: idx, status: 'correct' });

      let updatedCorrectQuestions = [...(userData.correctQuestions || [])];
      let shouldUpdate = false;

      // Verificar se a questão já foi respondida corretamente
      if (!updatedCorrectQuestions.includes(currentQuestion.id)) {
        updatedCorrectQuestions.push(currentQuestion.id);
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        try {
          // Atualizar questões corretas no Firestore primeiro
          const updatedData = {
            ...userData,
            correctQuestions: updatedCorrectQuestions
          };

          // Salvar no Firestore
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          await updateDoc(userDocRef, {
            correctQuestions: updatedCorrectQuestions
          });

          // Atualizar estado local
          setUserData(updatedData);

          // Verificar conquistas
          await checkForBadges(updatedCorrectQuestions);

        } catch (error) {
          console.error("Erro ao salvar progresso:", error);
        }
      } else {
        // Se já tinha a questão, só verifica badges com lista atual
        await checkForBadges(updatedCorrectQuestions);
      }

      setTimeout(() => {
        if (quizStep + 1 < activeSubject.questions.length) {
          setQuizStep(quizStep + 1);
        } else {
          updateProgress(activeSubject.xp, activeSubject.id);
          setView('dashboard');
          setActiveSubjectId(null);
          setQuizStep(0);
        }
        setAnswerFeedback(null);
      }, 800);
    } else {
      setAnswerFeedback({ index: idx, status: 'wrong' });
      setTimeout(() => setAnswerFeedback(null), 3500);
    }
  };


  const activeSubject = useMemo(() =>
    subjectsWithIcons.find(s => s.id === activeSubjectId),
    [activeSubjectId, subjectsWithIcons]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen font-sans selection:bg-indigo-500/30 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'} ${view !== 'login' ? 'pb-24' : ''}`}>

      {view !== 'login' && (
        <BottomNavigation view={view} setView={setView} isDark={isDark} />
      )}

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

          {view === 'simulated' && (
            <SimulatedScreen
              userData={userData}
              isDark={isDark}
              setView={setView}
              updateProgress={updateProgress}
            />
          )}

          {view === 'dashboard' && (
            <Dashboard
              userData={userData}
              isDark={isDark}
              toggleTheme={toggleTheme}
              setView={setView}
              badges={BADGES}
            />
          )}

          {view === 'subjects' && (
            <SubjectsList
              subjects={subjectsWithIcons}
              userData={userData}
              isDark={isDark}
              toggleTheme={toggleTheme}
              setActiveSubjectId={setActiveSubjectId}
              setView={setView}
              onClick={() => {
                setSelectedSubject(subject);
                setShowSubjectDetails(true);
              }}
            />
          )}

          {view === 'quiz' && activeSubject && (
            <QuizScreen
              activeSubject={activeSubject}
              quizStep={quizStep}
              isDark={isDark}
              toggleTheme={toggleTheme}
              setView={setView}
              answerFeedback={answerFeedback}
              handleAnswer={handleAnswer}
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
              handleUpdateBackground={handleUpdateBackground} // ← NOVA PROP
              globalLeaderboard={globalLeaderboard}
              subjects={subjectsWithIcons}
              badges={BADGES}
            />
          )}
        </AnimatePresence>

        {showSubjectDetails && selectedSubject && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <SubjectDetails
              subject={selectedSubject}
              isDark={isDark}
              onClose={() => {
                setShowSubjectDetails(false);
                setSelectedSubject(null);
              }}
            />
          </div>
        )}
      </main>

      <AnimatePresence>
        {newBadge && (
          <AchievementToast
            badge={newBadge}
            onDismiss={() => setNewBadge(null)}
          />
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  
  /* Animações para o modal */
  @keyframes badge-glow {
    0%, 100% { filter: drop-shadow(0 0 5px rgba(16, 185, 129, 0.3)); }
    50% { filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.6)); }
  }
  
  .badge-glow {
    animation: badge-glow 2s ease-in-out infinite;
  }
`}} />
    </div>
  );
}