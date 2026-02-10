// src/components/group-game/GroupGameLobby.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Copy,
  Check,
  Play,
  ArrowLeft,
  Crown,
  Wifi,
  Settings,
  Zap,
  Clock,
  Hash,
  Swords,
  Plus,
  LogIn,
  Shield,
  Sparkles
} from 'lucide-react';
import { GAME_CATEGORIES } from '../../hooks/useGroupGame';

// ─── Tela de Menu: Criar ou Entrar ─────────────────────────────────
export const GroupGameMenu = ({ isDark, onCreateRoom, onJoinRoom, onBack, error, setError }) => {
  const [mode, setMode] = useState(null); // null | 'create' | 'join'
  const [joinCode, setJoinCode] = useState('');
  const [settings, setSettings] = useState({
    category: 'mixed',
    questionCount: 10,
    timePerQuestion: 20,
    maxPlayers: 8
  });

  const handleCreate = () => {
    onCreateRoom(settings);
  };

  const handleJoin = () => {
    if (joinCode.trim().length < 4) {
      setError('Digite um código válido.');
      return;
    }
    onJoinRoom(joinCode.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 pb-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className={`p-2 rounded-xl transition-all active:scale-90 ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`}
        >
          <ArrowLeft size={20} className={isDark ? 'text-slate-400' : 'text-slate-600'} />
        </button>
        <div>
          <h1 className={`text-2xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Arena VestQuiz
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-rose-500">
            Desafie seus amigos ao vivo
          </p>
        </div>
      </div>

      {/* Banner */}
      <div className={`relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-rose-600 via-pink-600 to-purple-700 text-white shadow-2xl border-b-4 border-black/20`}>
        <Swords className="absolute -right-4 -bottom-4 w-36 h-36 opacity-10 rotate-12" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-yellow-300" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Modo Multiplayer</span>
          </div>
          <h2 className="text-xl font-black uppercase leading-tight">
            Batalha de{'\n'}Conhecimento
          </h2>
          <p className="text-xs text-white/70 leading-relaxed">
            Crie uma sala e compartilhe o código com amigos. Respondam juntos em tempo real e descubram quem é o mais rápido!
          </p>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-medium text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {!mode && (
        <div className="space-y-3">
          {/* Criar Sala */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => { setMode('create'); setError(null); }}
            className={`w-full p-5 rounded-2xl border transition-all flex items-center gap-4 ${
              isDark
                ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50'
                : 'bg-white border-slate-200 hover:border-indigo-400 shadow-sm'
            }`}
          >
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
              <Plus size={24} className="text-white" />
            </div>
            <div className="text-left flex-1">
              <p className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>Criar Sala</p>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Configure e convide seus amigos
              </p>
            </div>
            <Sparkles size={18} className="text-indigo-500" />
          </motion.button>

          {/* Entrar na Sala */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => { setMode('join'); setError(null); }}
            className={`w-full p-5 rounded-2xl border transition-all flex items-center gap-4 ${
              isDark
                ? 'bg-slate-900 border-slate-800 hover:border-emerald-500/50'
                : 'bg-white border-slate-200 hover:border-emerald-400 shadow-sm'
            }`}
          >
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <LogIn size={24} className="text-white" />
            </div>
            <div className="text-left flex-1">
              <p className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>Entrar na Sala</p>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Use o código do anfitrião
              </p>
            </div>
            <LogIn size={18} className="text-emerald-500" />
          </motion.button>
        </div>
      )}

      {/* ── Formulário criar sala ── */}
      {mode === 'create' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-black uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <Settings size={14} className="inline mr-1.5 -mt-0.5" />
              Configurações da Sala
            </h3>
            <button onClick={() => setMode(null)} className="text-xs text-indigo-500 font-bold">Voltar</button>
          </div>

          {/* Categoria */}
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Matéria
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {GAME_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSettings(s => ({ ...s, category: cat.id }))}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    settings.category === cat.id
                      ? 'border-indigo-500 bg-indigo-500/10 text-indigo-500'
                      : isDark
                        ? 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <span className="mr-1.5">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Questões + Tempo + Máx jogadores */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Hash size={10} className="inline mr-0.5" /> Questões
              </label>
              <select
                value={settings.questionCount}
                onChange={e => setSettings(s => ({ ...s, questionCount: Number(e.target.value) }))}
                className={`w-full mt-1 p-2.5 rounded-xl border text-sm font-bold transition-all ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {[5, 10, 15, 20].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Clock size={10} className="inline mr-0.5" /> Tempo (s)
              </label>
              <select
                value={settings.timePerQuestion}
                onChange={e => setSettings(s => ({ ...s, timePerQuestion: Number(e.target.value) }))}
                className={`w-full mt-1 p-2.5 rounded-xl border text-sm font-bold transition-all ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {[10, 15, 20, 30].map(n => (
                  <option key={n} value={n}>{n}s</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Users size={10} className="inline mr-0.5" /> Máx.
              </label>
              <select
                value={settings.maxPlayers}
                onChange={e => setSettings(s => ({ ...s, maxPlayers: Number(e.target.value) }))}
                className={`w-full mt-1 p-2.5 rounded-xl border text-sm font-bold transition-all ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {[2, 4, 6, 8, 10].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleCreate}
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
          >
            <Zap size={16} className="inline mr-2 -mt-0.5" />
            Criar Sala
          </button>
        </motion.div>
      )}

      {/* ── Formulário entrar na sala ── */}
      {mode === 'join' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-black uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <LogIn size={14} className="inline mr-1.5 -mt-0.5" />
              Entrar na Sala
            </h3>
            <button onClick={() => setMode(null)} className="text-xs text-indigo-500 font-bold">Voltar</button>
          </div>

          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Código da Sala
            </label>
            <input
              type="text"
              value={joinCode}
              onChange={e => setJoinCode(e.target.value.toUpperCase())}
              maxLength={6}
              placeholder="EX: ABC123"
              className={`w-full mt-2 p-4 rounded-2xl border text-center text-2xl font-black tracking-[0.3em] uppercase transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-600 focus:border-emerald-500'
                  : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-300 focus:border-emerald-500'
              } outline-none`}
            />
          </div>

          <button
            onClick={handleJoin}
            disabled={joinCode.trim().length < 4}
            className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all shadow-lg active:scale-[0.98] ${
              joinCode.trim().length >= 4
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20'
                : 'bg-slate-700 cursor-not-allowed opacity-50'
            }`}
          >
            <LogIn size={16} className="inline mr-2 -mt-0.5" />
            Entrar
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

// ─── Tela de Lobby (Sala de Espera) ─────────────────────────────────
export const GroupGameLobby = ({
  isDark,
  roomCode,
  roomData,
  players,
  isHost,
  onStartGame,
  onLeave,
  error
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = roomCode;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const categoryLabel = GAME_CATEGORIES.find(c => c.id === roomData?.settings?.category)?.label || 'Misto';
  const categoryIcon = GAME_CATEGORIES.find(c => c.id === roomData?.settings?.category)?.icon || '🎲';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 pb-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 mb-0.5">
            Sala de Espera
          </p>
          <h1 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Arena VestQuiz
          </h1>
        </div>
        <button
          onClick={onLeave}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
            isDark ? 'bg-slate-800 text-rose-400 hover:bg-slate-700' : 'bg-slate-200 text-rose-600 hover:bg-slate-300'
          }`}
        >
          Sair
        </button>
      </div>

      {/* Código da Sala */}
      <div className={`rounded-3xl p-6 text-center space-y-3 ${
        isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200 shadow-xl'
      }`}>
        <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          Compartilhe este código
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className={`text-4xl font-black tracking-[0.4em] ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {roomCode}
          </div>
          <button
            onClick={handleCopy}
            className={`p-2.5 rounded-xl transition-all active:scale-90 ${
              copied
                ? 'bg-emerald-500/10 text-emerald-500'
                : isDark
                  ? 'bg-slate-800 text-slate-400 hover:text-white'
                  : 'bg-slate-100 text-slate-500 hover:text-slate-900'
            }`}
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
        <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {copied ? '✅ Código copiado!' : 'Seus amigos precisam desse código para entrar'}
        </p>
      </div>

      {/* Configurações */}
      <div className={`rounded-2xl p-4 grid grid-cols-3 gap-3 ${
        isDark ? 'bg-slate-900/50 border border-slate-800' : 'bg-slate-50 border border-slate-200'
      }`}>
        <div className="text-center">
          <span className="text-lg">{categoryIcon}</span>
          <p className={`text-[10px] font-bold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{categoryLabel}</p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{roomData?.settings?.questionCount || 10}</p>
          <p className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Questões</p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{roomData?.settings?.timePerQuestion || 20}s</p>
          <p className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Por Questão</p>
        </div>
      </div>

      {/* Lista de Jogadores */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Users size={12} className="inline mr-1.5 -mt-0.5" />
            Jogadores ({players.length}/{roomData?.settings?.maxPlayers || 8})
          </h3>
          <div className="flex items-center gap-1.5">
            <Wifi size={10} className="text-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-500">AO VIVO</span>
          </div>
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {players.map((player, idx) => (
              <motion.div
                key={player.uid}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500/20">
                    {player.photoURL ? (
                      <img src={player.photoURL} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                        {player.displayName?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>
                  {player.uid === roomData?.hostId && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center border-2 border-slate-950">
                      <Crown size={10} className="text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {player.displayName || 'Jogador'}
                  </p>
                  <p className={`text-[10px] font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    Nível {player.level || 1} • {(player.xp || 0).toLocaleString()} XP
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className={`text-[10px] font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Online</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-medium text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Waiting / Start */}
      {isHost ? (
        <div className="space-y-3">
          <button
            onClick={onStartGame}
            disabled={players.length < 2}
            className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all shadow-lg active:scale-[0.98] ${
              players.length >= 2
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-rose-500/20'
                : 'bg-slate-700 cursor-not-allowed opacity-50'
            }`}
          >
            <Play size={16} className="inline mr-2 -mt-0.5" />
            {players.length >= 2 ? 'Iniciar Partida' : `Aguardando jogadores (${players.length}/2+)`}
          </button>
          {players.length < 2 && (
            <p className={`text-center text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              Mínimo de 2 jogadores para iniciar
            </p>
          )}
        </div>
      ) : (
        <div className={`text-center py-6 rounded-2xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-slate-50 border border-slate-200'}`}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block mb-2"
          >
            <Shield size={32} className="text-indigo-500" />
          </motion.div>
          <p className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Aguardando o anfitrião iniciar...
          </p>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Prepare-se para a batalha!
          </p>
        </div>
      )}
    </motion.div>
  );
};
