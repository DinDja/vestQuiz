// src/components/group-game/GroupGameResults.jsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Medal,
  Target,
  Zap,
  Star,
  Home,
  RefreshCw,
  Crown,
  Flame,
  ChevronRight,
  Award,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { auth } from '../../firebase';

// ─── Confetti decorativo ────────────────────────────────────────────
const ConfettiDot = ({ delay, color, left }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: [0, 300], opacity: [1, 0], rotate: [0, 720] }}
    transition={{ delay, duration: 3, ease: 'easeIn', repeat: Infinity, repeatDelay: 2 }}
    className={`absolute w-2 h-2 rounded-full ${color}`}
    style={{ left: `${left}%`, top: -10 }}
  />
);

export const GroupGameResults = ({
  isDark,
  roomData,
  sortedPlayers,
  onLeave,
  updateProgress,
  unlockBadge
}) => {
  const uid = auth.currentUser?.uid;

  // Meu resultado
  const myResult = sortedPlayers.find(p => p.uid === uid);
  const myPosition = sortedPlayers.findIndex(p => p.uid === uid) + 1;
  const totalQuestions = roomData?.questions?.length || 0;

  // Estatísticas do jogador
  const myStats = useMemo(() => {
    if (!myResult) return { correct: 0, wrong: 0, unanswered: 0, avgTime: 0 };
    const answers = myResult.answers || [];
    const correct = answers.filter(a => a.correct).length;
    const wrong = answers.filter(a => !a.correct && a.answerIndex !== -1).length;
    const unanswered = answers.filter(a => a.answerIndex === -1).length;
    const avgTime = answers.length > 0
      ? (answers.reduce((sum, a) => sum + (a.timeSpent || 0), 0) / answers.length).toFixed(1)
      : 0;
    return { correct, wrong, unanswered, avgTime };
  }, [myResult]);

  // XP ganho (baseado na posição)
  const xpReward = useMemo(() => {
    if (myPosition === 1) return 500;
    if (myPosition === 2) return 350;
    if (myPosition === 3) return 250;
    return 100 + Math.max(0, (myStats.correct * 20));
  }, [myPosition, myStats.correct]);

  // ── Award multiplayer badges (run once per results screen)
  React.useEffect(() => {
    if (!roomData || !sortedPlayers || !uid || !unlockBadge) return;
    // guard to avoid duplicate awarding on re-renders
    let awarded = false;
    try {
      const playersMap = roomData.players || {};
      const me = playersMap[uid] || sortedPlayers.find(p => p.uid === uid);
      if (!me) return;

      const answers = me.answers || [];
      const questionCount = roomData.questions?.length || 0;

      const answeredAll = answers.length === questionCount;
      const allCorrect = answeredAll && answers.every(a => a.correct);
      const hasFast = answers.some(a => a.correct && (a.timeSpent || 0) <= 3);
      const stayedConnected = me.isConnected !== false && answers.length > 0;
      const isHost = roomData.hostId === uid;
      const won = sortedPlayers[0]?.uid === uid;

      // comeback detection: rank before last question
      const beforeLastScores = Object.values(playersMap).map(p => {
        const s = (p.answers || []).filter(a => (a.questionIndex || 0) < (questionCount - 1)).reduce((sum, x) => sum + (x.points || 0), 0);
        return { uid: p.uid, scoreBefore: s };
      }).sort((a, b) => b.scoreBefore - a.scoreBefore);
      const rankBefore = beforeLastScores.findIndex(x => x.uid === uid) + 1;
      const wasBehindBeforeLast = rankBefore >= 3;

      // MVP heuristic
      const myAvg = answers.length > 0 ? (me.score || 0) / answers.length : 0;
      const othersAvg = Object.values(playersMap).map(p => {
        const cnt = (p.answers || []).length || 1;
        return ((p.score || 0) / cnt) || 0;
      });
      const topAvg = Math.max(...othersAvg, myAvg);

      (async () => {
        if (isHost) await unlockBadge('multi-host');
        if (won) {
          await unlockBadge('multi-first-win');
          await unlockBadge('multi-winner-pro');
        }
        if (allCorrect) await unlockBadge('multi-perfect');
        if (hasFast) await unlockBadge('multi-quickdraw');
        if (stayedConnected && answeredAll) await unlockBadge('multi-reliable');
        if (wasBehindBeforeLast && won) await unlockBadge('multi-comeback');
        if (myAvg > 0 && myAvg === topAvg && myAvg >= 600) await unlockBadge('multi-mvp');
      })();

      awarded = true;
    } catch (err) {
      // swallow errors silently (no blocking UX)
      console.error('Erro ao avaliar conquistas multiplayer:', err);
    }
    return () => {
      if (awarded) awarded = true;
    };
  }, [roomData, sortedPlayers, uid, unlockBadge]);

  // Podium (top 3)
  const podium = sortedPlayers.slice(0, 3);
  const podiumOrder = podium.length >= 3 ? [podium[1], podium[0], podium[2]] : podium;

  const confettiColors = ['bg-yellow-400', 'bg-pink-500', 'bg-indigo-500', 'bg-emerald-400', 'bg-rose-500', 'bg-violet-500'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-6 relative overflow-hidden"
    >
      {/* Confetti */}
      {myPosition <= 3 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <ConfettiDot
              key={i}
              delay={i * 0.2}
              color={confettiColors[i % confettiColors.length]}
              left={Math.random() * 100}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="text-center pt-4 relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
          className="inline-block"
        >
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-2xl ${
            myPosition === 1
              ? 'bg-gradient-to-br from-yellow-400 to-amber-600 shadow-yellow-500/30'
              : myPosition === 2
                ? 'bg-gradient-to-br from-slate-300 to-slate-500 shadow-slate-400/20'
                : myPosition === 3
                  ? 'bg-gradient-to-br from-amber-600 to-orange-800 shadow-amber-600/20'
                  : 'bg-gradient-to-br from-indigo-500 to-violet-600 shadow-indigo-500/20'
          }`}>
            {myPosition <= 3 ? (
              <Trophy size={36} className="text-white" />
            ) : (
              <Target size={36} className="text-white" />
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 space-y-1"
        >
          <h1 className={`text-3xl font-black uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {myPosition === 1 ? 'Campeão!' : myPosition === 2 ? '2º Lugar!' : myPosition === 3 ? '3º Lugar!' : 'Partida Encerrada'}
          </h1>
          <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Você ficou em <strong>{myPosition}º lugar</strong> de {sortedPlayers.length} jogadores
          </p>
        </motion.div>
      </div>

      {/* Podium */}
      {podium.length >= 2 && (
        <div className="flex items-end justify-center gap-3 px-4 pt-4">
          {podiumOrder.map((player, displayIdx) => {
            const actualPos = sortedPlayers.indexOf(player) + 1;
            const isMe = player.uid === uid;
            const height = actualPos === 1 ? 'h-28' : actualPos === 2 ? 'h-22' : 'h-16';

            return (
              <motion.div
                key={player.uid}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + displayIdx * 0.15 }}
                className="flex flex-col items-center flex-1 max-w-[100px]"
              >
                {/* Avatar */}
                <div className="relative mb-2">
                  <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${
                    actualPos === 1 ? 'border-yellow-500' : actualPos === 2 ? 'border-slate-400' : 'border-amber-600'
                  }`}>
                    {player.photoURL ? (
                      <img src={player.photoURL} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                        {player.displayName?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>
                  {actualPos === 1 && (
                    <Crown size={16} className="absolute -top-2 left-1/2 -translate-x-1/2 text-yellow-500 fill-yellow-500" />
                  )}
                </div>

                <p className={`text-[10px] font-bold text-center truncate w-full ${
                  isMe ? 'text-indigo-400' : isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {player.displayName?.split(' ')[0] || 'Jogador'}
                </p>
                <p className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {(player.score || 0).toLocaleString()}
                </p>

                {/* Barra do pódio */}
                <div className={`w-full ${height} mt-2 rounded-t-xl flex items-start justify-center pt-2 ${
                  actualPos === 1
                    ? 'bg-gradient-to-t from-yellow-600 to-yellow-400'
                    : actualPos === 2
                      ? 'bg-gradient-to-t from-slate-500 to-slate-300'
                      : 'bg-gradient-to-t from-amber-700 to-amber-500'
                }`}>
                  <span className="text-white font-black text-lg">{actualPos}º</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Minhas Estatísticas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`rounded-2xl p-5 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-lg'}`}
      >
        <h3 className={`text-xs font-black uppercase tracking-widest mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <Target size={12} className="inline mr-1.5 -mt-0.5" />
          Suas Estatísticas
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-xl ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Acertos</span>
            </div>
            <p className={`text-xl font-black ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {myStats.correct}/{totalQuestions}
            </p>
          </div>

          <div className={`p-3 rounded-xl ${isDark ? 'bg-rose-500/10' : 'bg-rose-50'}`}>
            <div className="flex items-center gap-2 mb-1">
              <XCircle size={14} className="text-rose-500" />
              <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>Erros</span>
            </div>
            <p className={`text-xl font-black ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
              {myStats.wrong + myStats.unanswered}
            </p>
          </div>

          <div className={`p-3 rounded-xl ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-indigo-500" />
              <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Pontuação</span>
            </div>
            <p className={`text-xl font-black ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
              {(myResult?.score || 0).toLocaleString()}
            </p>
          </div>

          <div className={`p-3 rounded-xl ${isDark ? 'bg-amber-500/10' : 'bg-amber-50'}`}>
            <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className="text-amber-500" />
              <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>Tempo Médio</span>
            </div>
            <p className={`text-xl font-black ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
              {myStats.avgTime}s
            </p>
          </div>
        </div>
      </motion.div>

      {/* XP Reward */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className={`rounded-2xl p-5 border text-center ${
          isDark
            ? 'bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border-indigo-500/20'
            : 'bg-gradient-to-br from-indigo-50 to-violet-50 border-indigo-200'
        }`}
      >
        <Star size={24} className="text-yellow-500 mx-auto mb-2" />
        <p className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Recompensa da partida</p>
        <p className={`text-3xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          +{xpReward} XP
        </p>
        <p className={`text-[10px] font-bold mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {myPosition === 1 ? '🏆 Bônus de Campeão!' : myPosition <= 3 ? '🥇 Bônus de Pódio!' : 'Obrigado por participar!'}
        </p>
      </motion.div>

      {/* Ranking Completo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className={`rounded-2xl p-4 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-lg'}`}
      >
        <h3 className={`text-xs font-black uppercase tracking-widest mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <Trophy size={12} className="inline mr-1.5 -mt-0.5" />
          Ranking Final
        </h3>

        <div className="space-y-2">
          {sortedPlayers.map((player, idx) => {
            const isMe = player.uid === uid;
            const answers = player.answers || [];
            const correct = answers.filter(a => a.correct).length;

            return (
              <div
                key={player.uid}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isMe
                    ? isDark ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-indigo-50 border border-indigo-200'
                    : isDark ? 'bg-slate-800/50' : 'bg-slate-50'
                }`}
              >
                <span className={`text-sm font-black w-7 text-center ${
                  idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-slate-400' : idx === 2 ? 'text-amber-600' : isDark ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}º`}
                </span>

                <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-700 flex-shrink-0">
                  {player.photoURL ? (
                    <img src={player.photoURL} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                      {player.displayName?.charAt(0) || '?'}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate ${isMe ? 'text-indigo-400' : isDark ? 'text-white' : 'text-slate-900'}`}>
                    {player.displayName || 'Jogador'}
                    {isMe && ' (você)'}
                  </p>
                  <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    {correct}/{totalQuestions} acertos
                  </p>
                </div>

                <p className={`text-sm font-black tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {(player.score || 0).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Ações */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="space-y-3 pt-2"
      >
        <button
          onClick={() => {
            if (updateProgress && xpReward > 0) {
              updateProgress(xpReward, null);
            }
            onLeave();
          }}
          className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
        >
          <Home size={16} className="inline mr-2 -mt-0.5" />
          Voltar ao Painel
        </button>
      </motion.div>
    </motion.div>
  );
};
