// src/components/group-game/GroupGamePlay.jsx
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  SkipForward,
  Users,
  Shield,
  ChevronRight,
  Lightbulb,
  Trophy,
  AlertCircle,
  Timer
} from 'lucide-react';
import { auth } from '../../firebase';

// ─── Countdown Overlay ──────────────────────────────────────────────
export const CountdownOverlay = ({ value, isDark }) => {
  const prev = useRef(null);
  useEffect(() => {
    prev.current = value;
    console.log('group-game: CountdownOverlay value', value);
  }, [value]);

  // não renderiza se não houver valor definido (defensivo)
  if (value === null || typeof value === 'undefined') return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md"
      style={{ zIndex: 99999 }}
    >
      <div className="text-center space-y-6">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Shield size={48} className="text-indigo-500 mx-auto" />
        </motion.div>
        <p className="text-sm font-black uppercase tracking-widest text-slate-400">
          Preparados?
        </p>
        <motion.div
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="text-8xl font-black text-white"
        >
          {value}
        </motion.div>
        <p className="text-lg font-bold text-indigo-400">A partida vai começar!</p>
      </div>
    </motion.div>
  );
};

// ─── Tela de Jogo ───────────────────────────────────────────────────
export const GroupGamePlay = ({
  isDark,
  roomData,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  timer,
  myAnswer,
  showExplanation,
  setShowExplanation,
  onSubmitAnswer,
  onAdvanceQuestion,
  isHost,
  players,
  sortedPlayers,
  allAnswered
}) => {
  useEffect(() => { console.log('group-game: GroupGamePlay mounted/props', { currentQuestionIndex, timer, myAnswer }); }, [currentQuestionIndex, timer, myAnswer]);
  const uid = auth.currentUser?.uid;

  // Calcular porcentagem do timer
  const timeLimit = roomData?.settings?.timePerQuestion || 20;
  const timerPercent = (timer / timeLimit) * 100;
  const isTimeCritical = timer <= 5;
  const isTimeUp = timer === 0;

  // Meu status na questão atual
  const hasAnswered = myAnswer !== null;
  const isCorrect = myAnswer?.correct === true;
  const myPoints = myAnswer?.points || 0;

  // Quantos já responderam
  const answeredCount = players.filter(p => {
    const ans = p.answers || [];
    return ans.some(a => a.questionIndex === currentQuestionIndex);
  }).length;

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center py-20">
        <AlertCircle className="text-rose-500" size={32} />
        <p className="text-rose-400 ml-2">Questão não encontrada.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4 pb-6"
    >
      {/* ── Top Bar: Progresso + Timer ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Questão
          </span>
          <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {currentQuestionIndex + 1}/{totalQuestions}
          </span>
        </div>

        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          isTimeCritical
            ? 'bg-rose-500/10 border border-rose-500/30'
            : isDark
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-slate-100 border border-slate-200'
        }`}>
          <Timer size={14} className={isTimeCritical ? 'text-rose-500' : 'text-indigo-500'} />
          <motion.span
            key={timer}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className={`text-sm font-black tabular-nums ${
              isTimeCritical ? 'text-rose-500' : isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {timer}s
          </motion.span>
        </div>

        <div className="flex items-center gap-1.5">
          <Users size={12} className="text-indigo-500" />
          <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {answeredCount}/{players.length}
          </span>
        </div>
      </div>

      {/* ── Timer Bar ── */}
      <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
        <motion.div
          className={`h-full rounded-full transition-colors duration-300 ${
            isTimeCritical ? 'bg-rose-500' : 'bg-indigo-500'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${timerPercent}%` }}
          transition={{ duration: 0.5, ease: 'linear' }}
        />
      </div>

      {/* ── Questão ── */}
      <div className={`rounded-2xl p-5 border ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-lg'
      }`}>
        <div className="flex items-start gap-2 mb-1">
          {currentQuestion.difficulty && (
            <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${
              currentQuestion.difficulty === 'easy'
                ? 'bg-emerald-500/10 text-emerald-500'
                : currentQuestion.difficulty === 'medium'
                  ? 'bg-amber-500/10 text-amber-500'
                  : 'bg-rose-500/10 text-rose-500'
            }`}>
              {currentQuestion.difficulty === 'easy' ? 'Fácil' : currentQuestion.difficulty === 'medium' ? 'Médio' : 'Difícil'}
            </span>
          )}
          {currentQuestion.skillCode && (
            <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
              {currentQuestion.skillCode}
            </span>
          )}
        </div>
        <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
          {currentQuestion.q}
        </p>
      </div>

      {/* ── Alternativas ── */}
      <div className="space-y-2.5">
        {currentQuestion.a.map((option, idx) => {
          let status = null;
          if (hasAnswered || isTimeUp) {
            if (idx === currentQuestion.correct) {
              status = 'correct';
            } else if (myAnswer?.answerIndex === idx && !isCorrect) {
              status = 'wrong';
            }
          }

          const isDisabled = hasAnswered || isTimeUp;

          return (
            <motion.button
              type="button"
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => !isDisabled && onSubmitAnswer(idx)}
              disabled={isDisabled}
              aria-disabled={isDisabled}
              className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center justify-between ${
                status === 'correct'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                  : status === 'wrong'
                    ? 'bg-rose-500/10 border-rose-500 text-rose-500'
                    : isDark
                      ? `bg-slate-900 border-slate-800 text-slate-300 ${!isDisabled ? 'hover:border-indigo-500/50 active:scale-[0.98]' : ''}`
                      : `bg-white border-slate-200 text-slate-600 ${!isDisabled ? 'hover:border-indigo-400 active:scale-[0.98]' : ''}`
              } ${isDisabled && !status ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold transition-colors ${
                  status === 'correct'
                    ? 'bg-emerald-500 text-white'
                    : status === 'wrong'
                      ? 'bg-rose-500 text-white'
                      : isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed">{option}</span>
              </div>
              <div className="pl-2">
                {status === 'correct' && <CheckCircle2 size={20} className="text-emerald-500" />}
                {status === 'wrong' && <XCircle size={20} className="text-rose-500" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* ── Feedback da Resposta ── */}
      <AnimatePresence>
        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`rounded-2xl p-4 border ${
              isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-rose-500/10 border-rose-500/30'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              {isCorrect ? (
                <>
                  <Zap size={18} className="text-emerald-500" />
                  <span className="text-sm font-black text-emerald-500">
                    +{myPoints} pontos!
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400/60">
                    ({myAnswer.timeSpent}s de resposta)
                  </span>
                </>
              ) : (
                <>
                  <XCircle size={18} className="text-rose-500" />
                  <span className="text-sm font-bold text-rose-400">
                    {myAnswer.answerIndex === -1 ? 'Tempo esgotado!' : 'Resposta incorreta'}
                  </span>
                </>
              )}
            </div>

            {/* Toggle Explicação */}
            {currentQuestion.explanation && (
              <div>
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className={`text-xs font-bold flex items-center gap-1 ${isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Lightbulb size={12} />
                  {showExplanation ? 'Ocultar explicação' : 'Ver explicação'}
                </button>
                <AnimatePresence>
                  {showExplanation && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className={`text-xs leading-relaxed mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                    >
                      {currentQuestion.explanation}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mini Scoreboard ── */}
      <div className={`rounded-2xl p-4 border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border border-slate-200'}`}>
        <h4 className={`text-[10px] font-black uppercase tracking-widest mb-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          <Trophy size={10} className="inline mr-1 -mt-0.5" />
          Placar ao Vivo
        </h4>
        <div className="space-y-1.5">
          {sortedPlayers.slice(0, 5).map((player, idx) => {
            const isMe = player.uid === uid;
            const playerAnswered = (player.answers || []).some(a => a.questionIndex === currentQuestionIndex);

            return (
              <div
                key={player.uid}
                className={`flex items-center gap-2.5 p-2 rounded-xl transition-all ${
                  isMe
                    ? isDark ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-indigo-50 border border-indigo-200'
                    : ''
                }`}
              >
                <span className={`text-xs font-black w-5 text-center ${
                  idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-slate-400' : idx === 2 ? 'text-amber-600' : isDark ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {idx + 1}º
                </span>

                <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-700 flex-shrink-0">
                  {player.photoURL ? (
                    <img src={player.photoURL} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                      {player.displayName?.charAt(0) || '?'}
                    </div>
                  )}
                </div>

                <span className={`text-xs font-bold flex-1 truncate ${
                  isMe
                    ? 'text-indigo-400'
                    : isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {player.displayName?.split(' ')[0] || 'Jogador'}
                  {isMe && ' (você)'}
                </span>

                <div className="flex items-center gap-2">
                  {playerAnswered ? (
                    <CheckCircle2 size={12} className="text-emerald-500" />
                  ) : (
                    <Clock size={12} className={isDark ? 'text-slate-600' : 'text-slate-400'} />
                  )}
                  <span className={`text-xs font-black tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {(player.score || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Botão próxima questão (host somente, quando todos responderam ou tempo acabou) ── */}
      {isHost && (allAnswered || isTimeUp) && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onAdvanceQuestion}
          className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
        >
          {currentQuestionIndex + 1 >= totalQuestions ? (
            <>
              <Trophy size={16} className="inline mr-2 -mt-0.5" />
              Ver Resultados
            </>
          ) : (
            <>
              <ChevronRight size={16} className="inline mr-2 -mt-0.5" />
              Próxima Questão
            </>
          )}
        </motion.button>
      )}

      {/* Mensagem para não-host aguardem */}
      {!isHost && (allAnswered || isTimeUp) && (
        <div className={`text-center py-3 rounded-2xl ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
          <p className={`text-xs font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Aguardando o anfitrião avançar...
          </p>
        </div>
      )}
    </motion.div>
  );
};
