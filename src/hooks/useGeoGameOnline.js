import { useCallback } from 'react';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useGroupGame } from './useGroupGame';

// Hook wrapper: reaproveita lógica de useGroupGame mas aplica defaults e utilidades
export const useGeoGameOnline = (userData) => {
  const base = useGroupGame(userData);

  // Cria sala forçando categoria 'geografia' e maxPlayers padrão menor
  const createGeoRoom = useCallback((settings = {}) => {
    const merged = {
      ...settings,
      category: 'geografia',
      maxPlayers: settings.maxPlayers ?? 4,
      timePerQuestion: settings.timePerQuestion ?? 20,
      questionCount: settings.questionCount ?? 8
    };
    return base.createRoom(merged);
  }, [base]);

  // Adiciona um bot simples ao documento da sala (somente se houver roomCode)
  const addBot = useCallback(async (botName = 'Bot Terra') => {
    try {
      const code = base.roomCode;
      if (!code) return;
      const roomRef = doc(db, 'rooms', code);
      const botId = `bot_${Date.now().toString(36).slice(-6)}`;

      const botPayload = {
        uid: botId,
        displayName: botName,
        photoURL: '',
        score: 0,
        answers: [],
        isReady: true,
        isConnected: true,
        xp: 0,
        level: 1
      };

      await updateDoc(roomRef, { [`players.${botId}`]: botPayload, updatedAt: Timestamp.now() });
      return botId;
    } catch (err) {
      console.error('Erro adicionando bot:', err);
      return null;
    }
  }, [base.roomCode]);

  // Remove um bot (por id) — ignora se é um UID real
  const removeBot = useCallback(async (botId) => {
    try {
      const code = base.roomCode;
      if (!code || !botId) return false;
      const roomRef = doc(db, 'rooms', code);
      // atualizar players removendo a chave do bot
      await updateDoc(roomRef, { [`players.${botId}`]: null, updatedAt: Timestamp.now() });
      return true;
    } catch (err) {
      console.error('Erro removendo bot:', err);
      return false;
    }
  }, [base.roomCode]);

  // Calcula pontos customizados para GeoGame (distância -> bonus)
  const computeGeoPoints = useCallback((basePoints, distanceKm) => {
    // exemplo: quanto menor a distância, maior o multiplicador (até x2)
    const multiplier = Math.max(0.5, Math.min(2, 1.4 - Math.log10(distanceKm + 1) / 10));
    return Math.round(basePoints * multiplier);
  }, []);

  return {
    ...base,
    createRoom: createGeoRoom,
    addBot,
    removeBot,
    computeGeoPoints
  };
};

export default useGeoGameOnline;
