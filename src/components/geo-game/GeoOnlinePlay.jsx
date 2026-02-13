import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Sparkles, Target, XCircle, CheckCircle2, LogOut } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents, Circle } from 'react-leaflet';

export const GeoOnlinePlay = ({ isDark, roomData, currentQuestion, currentQuestionIndex, totalQuestions, timer, myAnswer, showExplanation, setShowExplanation, onSubmitAnswer, onAdvanceQuestion, isHost, players, sortedPlayers, allAnswered, userData, updateProgress, onLeave }) => {
  const question = roomData?.questions?.[currentQuestionIndex];
  const [guess, setGuess] = useState(null);
  const [revealedPos, setRevealedPos] = useState(null);
  const [showHintConfirm, setShowHintConfirm] = useState(false);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const [showScoreToast, setShowScoreToast] = useState(null);
  const [showGuessEffect, setShowGuessEffect] = useState(false);
  const [showXpToast, setShowXpToast] = useState(null);
  const timeouts = useRef([]);
  const HINT_COST = 200;
  const userXp = userData?.xp || 0;
  const canBuyHint = userXp >= HINT_COST && !showExplanation;

  useEffect(() => {
    return () => timeouts.current.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    // considera como "não respondeu" quando:
    // - myAnswer é null/undefined (nenhuma ação do jogador)
    // - OU myAnswer foi auto-submetido como ausência (answerIndex === -1) para a questão atual
    const unanswered = myAnswer == null || (myAnswer && myAnswer.answerIndex === -1 && myAnswer.questionIndex === currentQuestionIndex);

    // mostrar modal quando o timer zerar e a questão estiver sem resposta válida
    if (typeof timer === 'number' && timer <= 0 && unanswered) {
      setShowTimeUpModal(true);
      return;
    }

    // esconder modal quando o timer for reiniciado ou o jogador tiver respondido com uma resposta válida
    if ((typeof timer === 'number' && timer > 0) || (myAnswer && myAnswer.answerIndex != null && myAnswer.answerIndex !== -1 && myAnswer.questionIndex === currentQuestionIndex)) {
      setShowTimeUpModal(false);
    }
  }, [timer, myAnswer, currentQuestionIndex]);

  const showFloatingXp = (amount) => {
    setShowXpToast({ amount });
    const t = setTimeout(() => setShowXpToast(null), 1800);
    timeouts.current.push(t);
  };

  function ClickHandler() {
    useMapEvents({
      click(e) {
        setGuess(e.latlng);
        if (window.navigator.vibrate) window.navigator.vibrate(30);
      }
    });
    return null;
  }

  const handleConfirmGuess = () => {
    if (!guess || !question) return;

    const guessed = { lat: guess.lat, lng: guess.lng };
    const targetLat = question.lat;
    const targetLng = question.lng;
    const guessedLL = { lat: guessed.lat, lng: guessed.lng };
    const R = 6371000;
    const toRad = (v) => (v * Math.PI) / 180;
    const dLat = toRad(guessedLL.lat - targetLat);
    const dLon = toRad(guessedLL.lng - targetLng);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRad(targetLat)) * Math.cos(toRad(guessedLL.lat)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distMeters = Math.abs(R * c);
    const distKm = Math.round(distMeters / 1000);
    const isHit = distMeters <= (question.precision || 50000);
    const points = isHit ? Math.max(0, Math.round(1000 * (1 - distMeters / (question.precision || 50000)))) : 0;

    setShowScoreToast({ points, distanceKm: distKm, success: isHit });
    setShowGuessEffect(true);
    setTimeout(() => setShowGuessEffect(false), 900);

    onSubmitAnswer({ lat: guess.lat, lng: guess.lng });

    setTimeout(() => setShowScoreToast(null), 2200);
  };

  const handleBuyHint = () => {
    if (!canBuyHint) return;
    setShowHintConfirm(true);
  };

  const confirmBuyHint = () => {
    setShowHintConfirm(false);
    updateProgress?.(-HINT_COST, 'geo-hint-online');
    setShowExplanation(true);
    setRevealedPos([question.lat, question.lng]);
    setTimeout(() => setRevealedPos(null), 3000);
  };

  return (
    <div className="relative w-full h-[100dvh] bg-slate-950 overflow-hidden font-sans select-none">
      
      <div className="absolute inset-0 z-0">
        <MapContainer center={[20,0]} zoom={2} scrollWheelZoom={false} zoomControl={false} className="h-full w-full">
          <TileLayer url={isDark ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'} />
          <ClickHandler />
          {guess && <Marker position={[guess.lat, guess.lng]} />}
          {revealedPos && <Circle center={revealedPos} radius={question.precision || 50000} pathOptions={{ color: '#10b981', fillOpacity: 0.15, weight: 1 }} />}
          {showGuessEffect && guess && (
            <Circle center={[guess.lat, guess.lng]} radius={Math.min(question.precision || 50000, 200000)} pathOptions={{ color: '#f59e0b', dashArray: '6 4', weight: 3, opacity: 0.9, fillOpacity: 0 }} />
          )}
        </MapContainer>
      </div>

      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-start pointer-events-none bg-gradient-to-b from-slate-950/80 to-transparent pb-12">
        <div className="flex flex-col gap-2 pointer-events-auto">
          <div className="flex gap-2">
            <motion.button whileTap={{ scale: 0.9 }} onClick={onLeave} className="bg-rose-500/10 backdrop-blur-md w-10 h-10 rounded-2xl border border-rose-500/20 flex items-center justify-center text-rose-500">
              <LogOut size={18} />
            </motion.button>
            <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
              <MapPin size={18} className="text-emerald-400" />
              <span className="text-white font-black text-sm tracking-widest">
                {currentQuestionIndex + 1} / {totalQuestions}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-md px-5 py-2 rounded-2xl border border-white/10 flex flex-col items-center pointer-events-auto shadow-2xl">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Tempo</span>
          <div className={`text-3xl font-black flex items-center gap-2 leading-none ${timer <= 5 ? 'text-rose-500 animate-pulse' : 'text-white'}`}>
            {timer}
          </div>
        </div>
      </div>

      <div className="absolute top-24 left-4 right-4 z-10 flex gap-2 overflow-x-auto snap-x pointer-events-auto pb-2 scrollbar-hide">
        {sortedPlayers?.map((p) => (
          <div key={p.uid} className="snap-start shrink-0 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white uppercase">
              {p.displayName?.slice(0,1) || '?'}
            </div>
            <span className="text-xs font-black text-white">{p.score}</span>
          </div>
        ))}
      </div>

      {revealedPos && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute right-4 top-36 z-10 bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full text-xs font-black border border-amber-400/30 backdrop-blur-sm flex items-center gap-2">
          <Target size={14} /> Sonda Ativa
        </motion.div>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-20 pb-6 px-4 pointer-events-none">
        <div className="pointer-events-auto max-w-md mx-auto flex flex-col gap-4">
          
          <div className="bg-slate-900/90 backdrop-blur-md p-5 rounded-3xl border border-white/10 shadow-2xl">
            <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-300 mb-3">
              Alvo Atual
            </div>
            <h2 className="text-xl font-black text-white leading-snug">
              {question?.q}
            </h2>
          </div>

          <div className="flex gap-3 h-16">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleBuyHint}
              disabled={!canBuyHint}
              className={`h-full aspect-square rounded-3xl font-black flex flex-col items-center justify-center gap-1 transition-colors border ${canBuyHint ? 'bg-slate-900/90 backdrop-blur-md text-amber-400 border-amber-500/30 active:bg-slate-800' : 'bg-slate-900/50 text-slate-600 border-white/5'}`}
            >
              <Sparkles size={20} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={!guess || myAnswer}
              onClick={() => { handleConfirmGuess(); if (window.navigator.vibrate) window.navigator.vibrate(40); }}
              className={`flex-1 h-full rounded-3xl font-black text-lg transition-all shadow-2xl ${!guess || myAnswer ? 'bg-slate-800/80 text-slate-500 backdrop-blur-md border border-white/5' : 'bg-emerald-500 text-slate-950 active:bg-emerald-400'}`}
            >
              {myAnswer ? 'COORDENADA FIXADA' : 'FIXAR COORDENADA'}
            </motion.button>
          </div>

          {isHost && (
            <motion.button whileTap={{ scale: 0.98 }} onClick={onAdvanceQuestion} className="w-full py-4 rounded-2xl bg-indigo-600/90 backdrop-blur-md text-white font-black text-sm uppercase tracking-widest border border-indigo-500/50">
              Avançar Missão
            </motion.button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showHintConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="w-full max-w-sm bg-slate-900 p-6 rounded-3xl border border-amber-500/30 text-center shadow-2xl">
              <Target size={40} className="text-amber-400 mx-auto mb-4" />
              <div className="text-xl font-black text-white mb-2">Autorizar Sonda?</div>
              <div className="text-sm text-slate-400 mb-8">Consome <span className="text-amber-400 font-bold">{HINT_COST} XP</span> para varrer e revelar a zona do alvo no mapa.</div>
              <div className="flex gap-3">
                <button onClick={() => setShowHintConfirm(false)} className="flex-1 py-4 rounded-2xl bg-slate-800 text-white font-bold">Abortar</button>
                <button onClick={() => { confirmBuyHint(); showFloatingXp(-HINT_COST); if (window.navigator.vibrate) window.navigator.vibrate(30); }} className="flex-1 py-4 rounded-2xl bg-amber-500 text-slate-950 font-black">Autorizar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTimeUpModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/90 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="w-full max-w-sm bg-slate-900 rounded-3xl p-6 border border-rose-500/30 text-center shadow-2xl">
              <Clock size={40} className="text-rose-500 mx-auto mb-4" />
              <div className="text-2xl font-black text-white mb-2">Missão Expirada</div>
              <div className="text-sm text-slate-400 mb-2">Nenhuma coordenada foi reportada a tempo.</div>

              <div className="text-sm text-slate-400 mb-6">Resposta correta: <span className="text-amber-400 font-bold">{question?.title} ({question?.lat?.toFixed?.(4)}, {question?.lng?.toFixed?.(4)})</span></div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowTimeUpModal(false);
                    if (typeof onAdvanceQuestion === 'function') onAdvanceQuestion();
                  }}
                  className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-black border border-indigo-500/30"
                >
                  Avançar para a próxima
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScoreToast && (
          <motion.div initial={{ y: -50, opacity: 0, x: '-50%' }} animate={{ y: 24, opacity: 1, x: '-50%' }} exit={{ y: -50, opacity: 0, x: '-50%' }} className="fixed top-24 left-1/2 z-50 bg-slate-900/95 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 shadow-2xl flex items-center gap-4 min-w-[220px]">
            {showScoreToast.success ? <CheckCircle2 size={32} className="text-emerald-400" /> : <XCircle size={32} className="text-rose-400" />}
            <div className="flex flex-col">
              <span className="text-white font-black text-xl">{showScoreToast.points > 0 ? `+${showScoreToast.points} XP` : '0 XP'}</span>
              <span className="text-slate-400 text-[10px] font-black tracking-widest uppercase">Distância: {showScoreToast.distanceKm} KM</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showXpToast && (
          <motion.div initial={{ scale: 0.5, opacity: 0, x: '-50%' }} animate={{ scale: 1, opacity: 1, y: -60, x: '-50%' }} exit={{ opacity: 0, y: -80 }} className="fixed top-1/2 left-1/2 z-50 bg-amber-500 text-slate-950 px-5 py-2 rounded-2xl font-black text-xl shadow-2xl">
            {showXpToast.amount} XP
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default GeoOnlinePlay;