import { useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { BADGES, GEO_BADGES, TERRITORY_BADGES } from '../constants/badges';

const ALL_BADGES = [...BADGES, ...GEO_BADGES, ...TERRITORY_BADGES];

export const useUserData = () => {
  const [userData, setUserData] = useState({});

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

  const updateProgress = async (newXp, subjectId) => {
    const totalXp = (userData.xp || 0) + newXp;
    const newPoints = (userData.points || 0) + (newXp * 0.5);
    const updatedCompleted = [...(userData.completed || [])];

    if (subjectId && !updatedCompleted.includes(subjectId)) {
      updatedCompleted.push(subjectId);
    }

    const updatedData = {
      ...userData,
      xp: totalXp,
      points: newPoints,
      completed: updatedCompleted
    };

    setUserData(updatedData);
    await saveProgressToFirestore(updatedData);
  };

  const checkForBadges = async (currentCorrectQuestions) => {
    const currentBadges = [...(userData.badges || [])];
    const newBadgesList = [];

    ALL_BADGES.forEach(badge => {
      if (!currentBadges.includes(badge.id)) {
        if (badge.reqQuestions && badge.reqQuestions.length > 0) {
          const hasAllRequirements = badge.reqQuestions.every(reqId =>
            currentCorrectQuestions.includes(reqId)
          );

          if (hasAllRequirements) {
            newBadgesList.push(badge.id);
          }
        }

        // suporte a badges baseadas em acertos consecutivos (reqStreak)
        if (badge.reqStreak) {
          const streak = userData.correctStreak || 0;
          if (streak >= badge.reqStreak) newBadgesList.push(badge.id);
        }
      }
    });

    if (newBadgesList.length > 0) {
      const updatedData = {
        ...userData,
        badges: [...currentBadges, ...newBadgesList]
      };
      setUserData(updatedData);
      await saveProgressToFirestore(updatedData);

      const achievementsRef = collection(db, 'users', auth.currentUser.uid, 'achievements');
      for (const badgeId of newBadgesList) {
        await setDoc(doc(achievementsRef, badgeId), {
          badgeId,
          unlockedAt: new Date().toISOString()
        });
      }

      return ALL_BADGES.find(b => b.id === newBadgesList[0]);
    }
    return null;
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

  return {
    userData,
    setUserData,
    updateProgress,
    checkForBadges,
    saveProgressToFirestore,
    handleUpdateProfile
  };
};