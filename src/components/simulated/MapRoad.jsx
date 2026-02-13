import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Info, Clock } from 'lucide-react';

// Compact, interactive "map road" showing turns + events. Meant to be rendered persistently.
export default function MapRoad({ totalTurns = 10, currentTurn = 1, timelineEvents = {}, statsHistory = [], isDark = false, small = false }) {
  const svgRef = useRef(null);

  // normalize props
  totalTurns = Math.max(1, Number(totalTurns || 10));
  currentTurn = Math.max(1, Math.min(totalTurns, Number(currentTurn || 1)));
  const [selected, setSelected] = useState(null);
  const closeBtnRef = useRef(null);
  const turns = Array.from({ length: totalTurns }, (_, i) => i + 1);

  // versão compacta para previews inline (sem comportamento "fixed" nem bottom-sheet)
  if (small) {
    return (
      <div className="w-full h-12">
        <svg className="w-full h-12" viewBox={`0 0 ${Math.max(400, totalTurns * 40)} 48`} preserveAspectRatio="xMinYMid meet" role="img" aria-label="Preview de percurso">
          <rect x="0" y="20" width="100%" height="8" fill={isDark ? '#0f1724' : '#f1f5f9'} rx="4" />
          {turns.map((t, i) => {
            const x = 20 + i * 40;
            const isPast = t < currentTurn;
            const isNow = t === currentTurn;
            return (
              <g key={t} transform={`translate(${x},24)`}>
                <circle cx={0} cy={0} r={isNow ? 6 : isPast ? 5 : 4} fill={isNow ? '#10b981' : isPast ? '#60a5fa' : '#e6e9ef'} />
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  React.useEffect(() => {
    if (selected) {
      // focus the close button for accessibility on open (mobile-friendly)
      closeBtnRef.current?.focus();
    }
  }, [selected]);

  const exportSVG = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vestroad-turns-${currentTurn}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const eventsFor = (t) => (timelineEvents && timelineEvents[t]) || [];

  return (
    <div className="fixed left-0 right-0 bottom-20 md:bottom-28 z-40 flex justify-center pointer-events-auto px-4">
      <div className={`w-full max-w-3xl bg-gradient-to-r ${isDark ? 'from-slate-900/80 to-slate-900/60' : 'from-white/60 to-white/40'} backdrop-blur-sm border ${isDark ? 'border-slate-800' : 'border-slate-200'} rounded-2xl p-3 shadow-lg flex items-center gap-3`}>
        <div className="flex-1 overflow-x-auto no-scrollbar">
          <svg ref={svgRef} className="w-[900px] h-20" viewBox={`0 0 ${Math.max(800, totalTurns * 80)} 80`} preserveAspectRatio="xMinYMid meet" role="img" aria-label="Mapa de progresso do mandato">
            {/* road */}
            <defs>
              <linearGradient id="roadGrad" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#e6edf7" />
                <stop offset="100%" stopColor="#f8f5ff" />
              </linearGradient>
            </defs>
            <rect x="0" y="34" width="100%" height="12" fill="url(#roadGrad)" rx="6" />

            {turns.map((t, i) => {
              const x = 40 + i * 80;
              const isPast = t < currentTurn;
              const isNow = t === currentTurn;
              const hasEvent = eventsFor(t).length > 0;
              return (
                <g key={t} transform={`translate(${x},40)`}>
                  <circle
                    cx={0}
                    cy={0}
                    r={isNow ? 12 : isPast ? 9 : 7}
                    fill={isNow ? '#7c3aed' : isPast ? '#3b82f6' : '#e6e9ef'}
                    stroke={hasEvent ? (isNow ? '#f59e0b' : '#34d399') : 'transparent'}
                    strokeWidth={hasEvent ? 3 : 0}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelected(t)}
                  />
                  <text x={0} y={28} textAnchor="middle" fontSize="10" fill={isNow ? '#fff' : '#6b7280'} fontWeight={700}>{t}</text>
                  {hasEvent && (
                    <g transform="translate(14,-14)">
                      <rect x={0} y={0} width={8} height={8} rx={2} fill="#34d399" />
                    </g>
                  )}
                </g>
              );
            })}

            {/* progress marker */}
            {(() => {
              const pct = Math.min(1, (currentTurn - 1) / Math.max(1, totalTurns - 1));
              const width = Math.max(800, totalTurns * 80);
              const cx = 40 + pct * (width - 80);
              return <rect x={40} y={34} width={Math.max(6, cx - 40)} height={12} fill={isDark ? 'rgba(124,58,237,0.12)' : 'rgba(59,130,246,0.12)'} rx={6} />;
            })()}
          </svg>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={exportSVG} title="Exportar SVG" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm flex items-center gap-2">
            <Download size={14} /> <span className="hidden sm:inline">Exportar</span>
          </button>
          <div className="text-xs text-slate-400 hidden sm:block">Turno {currentTurn} / {totalTurns}</div>
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              aria-modal="true"
              role="dialog"
              aria-label={`Detalhes do turno ${selected}`}
              className="fixed left-0 right-0 bottom-0 z-50 md:left-1/2 md:-translate-x-1/2 md:bottom-36 w-full md:w-[92%] md:max-w-md px-4 md:px-0"
            >
              {/* Mobile: bottom-sheet; Desktop: centered card */}
              <div className={`mx-auto ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border shadow-lg rounded-t-2xl md:rounded-2xl`} style={{ maxWidth: 720 }}>
                <div className="p-4 md:p-4 max-h-[68vh] overflow-auto" style={{ WebkitOverflowScrolling: 'touch', paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Info size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-bold">Turno {selected}</div>
                        <div className="text-xs text-slate-400">{(eventsFor(selected) || []).length} evento(s)</div>
                      </div>

                      <div className="mt-3 text-sm space-y-3">
                        {(eventsFor(selected) || []).length === 0 && <div className="text-xs opacity-60">Nenhum evento registrado neste turno.</div>}
                        {(eventsFor(selected) || []).map((ev, i) => (
                          <div key={ev.id || i} className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center text-slate-700 text-sm">{ev.icon || <Clock size={14} />}</div>
                            <div>
                              <div className="text-sm font-bold">{ev.title}</div>
                              {ev.detail && <div className="text-xs opacity-60 mt-0.5">{ev.detail}</div>}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-end gap-2">
                        <button ref={closeBtnRef} onClick={() => setSelected(null)} className="text-sm px-4 py-3 rounded-lg bg-slate-100/40">Fechar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
