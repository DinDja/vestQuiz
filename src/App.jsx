import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import { GeoGame } from './components/geo-game/GeoGame';

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
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]} ${Math.floor(Math.random() * 1000)}`;
  };

  const handleUpdateBackground = async (backgroundData) => {
    if (!auth.currentUser) return;
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, backgroundData);
      setUserData(prev => ({ ...prev, ...backgroundData }));
    } catch (error) {
      console.error("Erro ao atualizar fundo:", error);
    }
  };

  const syncUserData = async (firebaseUser) => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDocSnap = await getDoc(userDocRef);
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
      profileBackground: '',
      profileTheme: 'indigo',
      profileGradient: 'from-indigo-600 to-purple-600',
      coverImage: '',
      coverColor: '#4f46e5'
    };

    if (userDocSnap.exists()) {
      const existingData = userDocSnap.data();
      const mergedData = { ...userBasicData, ...existingData, uid: firebaseUser.uid, lastLogin: new Date().toISOString() };
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
      console.error("Erro login google:", error);
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

  const handleUpdateProfile = async (updatedFields) => {
    if (!auth.currentUser) return;
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, updatedFields);
      setUserData(prev => ({ ...prev, ...updatedFields }));
    } catch (error) {
      console.error("Erro perfil:", error);
    }
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

  const checkForBadges = async (currentCorrectQuestions) => {
    if (!auth.currentUser) return;
    const currentBadges = userData.badges || [];

    for (const badge of BADGES) {
      if (!currentBadges.includes(badge.id) && badge.reqQuestions?.length > 0) {
        const hasAllRequirements = badge.reqQuestions.every(reqId =>
          currentCorrectQuestions.includes(reqId)
        );
        if (hasAllRequirements) {
          await unlockBadge(badge.id);
        }
      }
    }
  };

  const updateProgress = async (newXp, subjectId = 'general') => {
    if (!auth.currentUser) return;
    const totalXp = (userData.xp || 0) + newXp;
    const newPoints = (userData.points || 0) + (newXp * 0.5);
    const updatedCompleted = [...(userData.completed || [])];
    let shouldUpdateCompleted = false;

    if (subjectId && subjectId !== 'general' && !updatedCompleted.includes(subjectId)) {
      updatedCompleted.push(subjectId);
      shouldUpdateCompleted = true;
    }

    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const updateData = { xp: totalXp, points: newPoints };
      if (shouldUpdateCompleted) updateData.completed = updatedCompleted;

      await updateDoc(userDocRef, updateData);
      setUserData(prev => ({ ...prev, ...updateData }));

      const historyRef = collection(db, 'users', auth.currentUser.uid, 'history');
      await setDoc(doc(historyRef, new Date().getTime().toString()), {
        timestamp: new Date().toISOString(),
        xpGained: newXp,
        subjectId: subjectId || 'activity',
        action: 'Update'
      });
    } catch (error) {
      console.error("Erro progresso:", error);
    }
  };

  const handleAnswer = async (idx) => {
    if (answerFeedback || !activeSubject) return;
    const currentQuestion = activeSubject.questions[quizStep];
    const correct = currentQuestion.correct;

    if (idx === correct) {
      setAnswerFeedback({ index: idx, status: 'correct' });
      let updatedCorrectQuestions = [...(userData.correctQuestions || [])];

      if (!updatedCorrectQuestions.includes(currentQuestion.id)) {
        updatedCorrectQuestions.push(currentQuestion.id);
        try {
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          await updateDoc(userDocRef, { correctQuestions: updatedCorrectQuestions });
          setUserData(prev => ({ ...prev, correctQuestions: updatedCorrectQuestions }));
          await checkForBadges(updatedCorrectQuestions);
        } catch (error) {
          console.error("Erro questões:", error);
        }
      } else {
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

  if (isLoading) return <LoadingScreen />;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'} ${view !== 'login' ? 'pb-24' : ''}`}>
      {view !== 'login' && <BottomNavigation view={view} setView={setView} isDark={isDark} />}
      <main className="max-w-md mx-auto px-6 pt-10 pb-4 h-full">
        <AnimatePresence mode="wait">
          {view === 'login' && <LoginScreen onGoogleLogin={handleGoogleLogin} onAnonymousLogin={handleAnonymousLogin} isDark={isDark} toggleTheme={toggleTheme} />}
          {view === 'simulated' && <SimulatedScreen userData={userData} isDark={isDark} setView={setView} updateProgress={updateProgress} />}
          {view === 'dashboard' && <Dashboard userData={userData} isDark={isDark} toggleTheme={toggleTheme} setView={setView} badges={BADGES} />}
          {view === 'subjects' && <SubjectsList subjects={subjectsWithIcons} userData={userData} isDark={isDark} toggleTheme={toggleTheme} setActiveSubjectId={setActiveSubjectId} setView={setView} />}
          {view === 'quiz' && activeSubject && <QuizScreen activeSubject={activeSubject} quizStep={quizStep} isDark={isDark} toggleTheme={toggleTheme} setView={setView} answerFeedback={answerFeedback} handleAnswer={handleAnswer} />}
          {view === 'ranking' && <RankingScreen globalLeaderboard={globalLeaderboard} userData={userData} isDark={isDark} toggleTheme={toggleTheme} />}
          {view === 'profile' && <ProfileScreen userData={userData} isDark={isDark} toggleTheme={toggleTheme} handleLogout={handleLogout} handleUpdateProfile={handleUpdateProfile} handleUpdateBackground={handleUpdateBackground} globalLeaderboard={globalLeaderboard} subjects={subjectsWithIcons} badges={BADGES} />}
          {view === 'geo-game' && <GeoGame setView={setView} isDark={isDark} userData={userData} updateProgress={updateProgress} unlockBadge={unlockBadge} />}
        </AnimatePresence>
        {showSubjectDetails && selectedSubject && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <SubjectDetails subject={selectedSubject} isDark={isDark} onClose={() => { setShowSubjectDetails(false); setSelectedSubject(null); }} />
          </div>
        )}
      </main>
      <AnimatePresence>
        {newBadge && <AchievementToast badge={newBadge} onDismiss={() => setNewBadge(null)} />}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } @keyframes badge-glow { 0%, 100% { filter: drop-shadow(0 0 5px rgba(16, 185, 129, 0.3)); } 50% { filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.6)); } } .badge-glow { animation: badge-glow 2s ease-in-out infinite; }` }} />
    </div>
  );
}