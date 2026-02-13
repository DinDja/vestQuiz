import React, { useState } from 'react';
import { MapPin, Users, Plus, ArrowLeft } from 'lucide-react';

export const GeoOnlineMenu = ({ isDark, onCreateRoom, onJoinRoom, onBack, error, setError }) => {
  const [mode, setMode] = useState(null);
  const [joinCode, setJoinCode] = useState('');
  const [settings, setSettings] = useState({ questionCount: 8, timePerQuestion: 20, maxPlayers: 4 });

  const handleCreate = () => onCreateRoom(settings);
  const handleJoin = () => onJoinRoom(joinCode.trim());

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} aria-label="Voltar" className={`p-2 rounded-xl bg-slate-800 text-white`}><ArrowLeft size={18} /></button>
        <div>
          <h1 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Geo — Multijogador</h1>
          <p className="text-[11px] text-slate-400 mt-1">Crie ou entre em salas com amigos — partidas em tempo real.</p>
        </div>
      </div>

      {error && <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">{error}</div>}

      {!mode && (
        <div className="grid gap-3">
          <button onClick={() => setMode('create')} className="p-4 rounded-2xl bg-emerald-600 text-slate-950 font-black flex items-center gap-3 justify-center">
            <Plus size={18} /> Criar Sala (geografia)
          </button>
          <button onClick={() => setMode('join')} className="p-4 rounded-2xl bg-slate-800 text-white font-black flex items-center gap-3 justify-center">
            <MapPin size={18} /> Entrar com código
          </button>
        </div>
      )}

      {mode === 'create' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider">Configurações da sala</h3>
            <button onClick={() => setMode(null)} className="text-xs text-emerald-400 font-bold">Voltar</button>
          </div>

          <label className="text-[10px] font-bold uppercase">Questões</label>
          <select value={settings.questionCount} onChange={e => setSettings(s => ({ ...s, questionCount: Number(e.target.value) }))} className="w-full p-3 rounded-xl bg-slate-900 text-white">
            {[5,8,10,15].map(n => <option key={n} value={n}>{n}</option>)}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase">Tempo (s)</label>
              <select value={settings.timePerQuestion} onChange={e => setSettings(s => ({ ...s, timePerQuestion: Number(e.target.value) }))} className="w-full p-3 rounded-xl bg-slate-900 text-white">
                {[15,20,25,30].map(n => <option key={n} value={n}>{n}s</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase">Máx. jogadores</label>
              <select value={settings.maxPlayers} onChange={e => setSettings(s => ({ ...s, maxPlayers: Number(e.target.value) }))} className="w-full p-3 rounded-xl bg-slate-900 text-white">
                {[2,3,4,6].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <button onClick={handleCreate} className="w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 to-teal-500">Criar Sala</button>
        </div>
      )}

      {mode === 'join' && (
        <div className="space-y-4">
          <label className="text-[10px] font-bold uppercase">Código da Sala</label>
          <input type="text" value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} maxLength={6} className="w-full p-4 rounded-2xl bg-slate-900 text-white text-center text-2xl font-black" placeholder="EX: ABC123" />
          <button onClick={handleJoin} className="w-full py-4 rounded-2xl font-black text-slate-950 bg-emerald-500" disabled={joinCode.trim().length < 4}>Entrar</button>
        </div>
      )}
    </div>
  );
};

export default GeoOnlineMenu;
