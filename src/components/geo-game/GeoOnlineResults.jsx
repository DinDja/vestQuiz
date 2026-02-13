import React from 'react';

export const GeoOnlineResults = ({ isDark, roomData, sortedPlayers, onLeave, updateProgress, unlockBadge }) => {
  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">Resultados</p>
          <h1 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Placar Final — Geo</h1>
        </div>
        <button onClick={onLeave} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white">Fechar</button>
      </div>

      <div className="rounded-2xl p-4 bg-slate-900 border border-white/5">
        {sortedPlayers?.map((p, idx) => (
          <div key={p.uid} className="flex items-center justify-between py-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-sm font-black">{idx + 1}</div>
              <div>
                <div className="font-bold">{p.displayName}</div>
                <div className="text-xs text-slate-400">{p.level ? `nível ${p.level}` : ''}</div>
              </div>
            </div>
            <div className="text-lg font-black text-emerald-400">{p.score}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onLeave} className="flex-1 py-4 rounded-2xl font-black text-white bg-emerald-500">Sair</button>
      </div>
    </div>
  );
};

export default GeoOnlineResults;
