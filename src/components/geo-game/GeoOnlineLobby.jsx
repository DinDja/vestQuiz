import React from 'react';
import { Users, Copy, Plus, Crown } from 'lucide-react';
import MapRoad from '../simulated/MapRoad';

export const GeoOnlineLobby = ({ isDark, roomCode, roomData, players, isHost, onStartGame, onLeave, addBot, error }) => {
  const playerList = Object.values(players || {});
  const maxPlayers = roomData?.settings?.maxPlayers || 4;
  const nowCount = playerList.length;
  const isFull = nowCount >= maxPlayers;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
    } catch {}
  };

  return (
    <div className="space-y-6 pb-6">
      {/* header com identidade Geo + botão voltar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/12 flex items-center justify-center border border-emerald-500/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2Z" fill="#10B981"/><path d="M12 8C16.4183 8 20 10.6863 20 14C20 17.3137 16.4183 20 12 20C7.58172 20 4 17.3137 4 14C4 10.6863 7.58172 8 12 8Z" fill="#059669"/></svg>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Geo Arena</p>
            <h1 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Mapa — Sala {roomCode ? '' : ''}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onLeave} aria-label="Voltar" className="px-3 py-2 rounded-lg bg-slate-800 text-xs text-slate-200 font-bold">Voltar</button>
        </div>
      </div>

      <div className="rounded-2xl p-4 bg-gradient-to-br from-emerald-900/10 to-slate-900 border border-emerald-700/10 text-center">
        <div className="text-4xl font-black tracking-[0.3em] text-emerald-300">{roomCode || '—'}</div>
        <div className="mt-2 text-xs text-slate-400">Compartilhe este código com amigos para entrar na sala</div>
        <div className="mt-3 flex justify-center gap-2">
          <button onClick={handleCopy} className="px-3 py-2 rounded-xl bg-slate-800 text-white text-xs flex items-center gap-2"><Copy size={14} />Copiar</button>
          {isHost && (
            <button
              onClick={() => addBot && addBot('Bot Geo')}
              className={`px-3 py-2 rounded-xl text-xs flex items-center gap-2 ${isFull ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-slate-950'}`}
              disabled={isFull}
              title={isFull ? 'Sala cheia' : 'Adicionar bot para preencher vagas'}
            >
              <Plus size={14} />{isFull ? 'Cheia' : 'Adicionar bot'}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-2xl p-4 bg-slate-900 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-black uppercase text-slate-400">Jogadores</h4>
            <div className="text-xs text-slate-400">Máx. {maxPlayers}</div>
          </div>

          <div className="mt-3 space-y-2">
            {playerList.map(p => {
              const isBot = typeof p.uid === 'string' && p.uid.startsWith('bot_');
              const isHostPlayer = roomData?.hostId === p.uid;
              return (
                <div key={p.uid} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-800/20 flex items-center justify-center text-xs text-emerald-300">{p.displayName?.slice(0,1) || '?'}</div>
                    <div>
                      <div className="text-sm font-bold text-white">{p.displayName}{isBot ? ' (bot)' : ''}</div>
                      {isHostPlayer && <div className="text-[10px] uppercase text-emerald-400 font-black flex items-center gap-1"><Crown size={12} />anfitrião</div>}
                    </div>
                  </div>
                  <div className="text-sm font-black text-emerald-400">{p.score || 0}</div>
                </div>
              );
            })}

            {nowCount === 0 && <div className="text-xs opacity-60">Nenhum jogador na sala ainda.</div>}
          </div>
        </div>

        <div className="rounded-2xl p-4 bg-slate-900 border border-white/5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-black uppercase text-slate-400">Preview do mapa</h4>
            <div className="text-xs text-slate-400">Questões {roomData?.settings?.questionCount || 8}</div>
          </div>

          <div className="mt-3 h-28 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <MapRoad small totalTurns={Math.min(12, roomData?.settings?.questionCount || 8)} currentTurn={2} isDark={isDark} />
          </div>

          <div className="mt-4 text-xs text-slate-400">Preview rápido do percurso — o jogo real mostrará alvos no mapa.</div>
        </div>
      </div>

      {error && <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">{error}</div>}

      <div className="flex gap-3">
        <button
          onClick={onStartGame}
          disabled={!isHost || nowCount < 2}
          className={`flex-1 py-4 rounded-2xl font-black ${(!isHost || nowCount < 2) ? 'bg-slate-700 cursor-not-allowed text-white' : 'bg-emerald-500 text-slate-950'}`}
          title={!isHost ? 'Apenas o anfitrião pode iniciar' : nowCount < 2 ? 'Pelo menos 2 jogadores necessários' : 'Iniciar partida'}
        >
          Começar
        </button>
        <button onClick={onLeave} className="py-4 px-6 rounded-2xl font-black bg-slate-800 text-white">Sair</button>
      </div>
    </div>
  );
};

export default GeoOnlineLobby;
