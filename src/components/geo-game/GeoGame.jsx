import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Target,
    HelpCircle,
    ShieldAlert,
    CheckCircle2,
    XCircle,
    Award,
    LocateFixed,
    ChevronRight,
    Zap,
    Wifi,
    Sun,
    Moon,
    X
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MISSION_DATABASE } from './missionDatabase';
import { GeoGameOnline } from './GeoGameOnline';

const customIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="relative">
          <div class="absolute -inset-2 bg-emerald-500/20 rounded-full animate-ping"></div>
          <div style="background-color: #10b981; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px #10b981;"></div>
         </div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
});

function MapController({ targetPos, zoomLevel }) {
    const map = useMap();
    useEffect(() => {
        if (targetPos) {
            map.flyTo(targetPos, zoomLevel || 5, { duration: 1.5 });
        }
    }, [targetPos, zoomLevel, map]);
    return null;
}

function ClickHandler({ setPos, active }) {
    useMapEvents({
        click(e) {
            if (active) {
                setPos(e.latlng);
                if (window.navigator.vibrate) window.navigator.vibrate(50);
            }
        },
    });
    return null;
}

export const GeoGame = ({ setView, userData, updateProgress, unlockBadge }) => {
    const [showOnlineMode, setShowOnlineMode] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [missionLimit, setMissionLimit] = useState(10);
    const [missions, setMissions] = useState([]);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [userGuess, setUserGuess] = useState(null);
    const [sessionScore, setSessionScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [hintUsedCount, setHintUsedCount] = useState(0);
    const [streak, setStreak] = useState(0);
    const [showHintConfirm, setShowHintConfirm] = useState(false);
    const [lastResult, setLastResult] = useState(null);
    const [mapFly, setMapFly] = useState(null);
    const [mapStyle, setMapStyle] = useState('light'); // 'light' = clearer basemap for GeoGame

    const initializeGame = (limit) => {
        const shuffled = [...MISSION_DATABASE].sort(() => Math.random() - 0.5).slice(0, limit);
        setMissions(shuffled);
        setMissionLimit(limit);
        setGameStarted(true);
        setCurrentLevel(0);
        setSessionScore(0);
        setStreak(0);
        setHintUsedCount(0);
    };

    // debug-friendly opener for online mode (logs + sets state)
    const openOnlineMode = () => {
        console.log('GeoGame: openOnlineMode called');
        setShowOnlineMode(true);
    };

    const handleConfirm = () => {
        if (!userGuess) return;

        const target = missions[currentLevel];
        const distance = L.latLng(userGuess).distanceTo([target.lat, target.lng]);
        const distKm = Math.round(distance / 1000);
        const isHit = distance < target.precision;

        let points = 0;
        if (isHit) {
            points = Math.round(1000 * (1 - distance / target.precision));
            const newStreak = streak + 1;
            setStreak(newStreak);

            // 1. Sniper de Elite (erro < 10km)
            if (distKm <= 10) unlockBadge('geo-sniper-elite');
            // 2. Zero Absoluto (erro 0km)
            if (distKm === 0) unlockBadge('geo-perfeccionista');
            // 3. Dono do Pelô (Salvador < 5km)
            if (target.title === "Salvador" && distKm < 5) unlockBadge('geo-bahia-expert');
            // 4. Imbatível (streak 10)
            if (newStreak >= 10) unlockBadge('geo-streak-10');
        } else {
            setStreak(0);
        }

        const newSessionScore = sessionScore + points;
        setSessionScore(newSessionScore);
        updateProgress(points, 'geo-command');

        // 5. Magnata do Radar (100k XP na sessão)
        if (newSessionScore >= 100000) unlockBadge('geo-rich-session');

        setLastResult({ isHit, points, distance: distKm, title: target.title });
        setMapFly({ pos: [target.lat, target.lng], zoom: 5 });
        setShowResult(true);
    };

    const nextMission = () => {
        if (currentLevel + 1 >= missions.length) {
            // 6. Desbravador (50 missões)
            if (missionLimit === 50) unlockBadge('geo-pioneiro');
            // 7. Cartógrafo Imperial (100 missões)
            if (missionLimit === 100) unlockBadge('geo-half-marathon');
            // 8. Lenda dos Mares (300 missões)
            if (missionLimit === 300) unlockBadge('geo-marathon-300');
            // 9. Olho de Águia (Sem sonda em 50+ rodadas)
            if (hintUsedCount === 0 && missionLimit >= 50) unlockBadge('geo-no-sonda');
            // 10. Navegador Global (Finalizou qualquer operação)
            unlockBadge('geo-explorer');

            setGameStarted(false);
            return;
        }
        setCurrentLevel(prev => prev + 1);
        setUserGuess(null);
        setShowResult(false);
        setMapFly(null);
    };

    if (!gameStarted) {
        return (
            <div className="fixed inset-0 z-[5000] flex flex-col items-center justify-center p-6 bg-slate-950">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto z-10">

                    {/* header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 bg-emerald-500/12 rounded-xl flex items-center justify-center border border-emerald-500/20">
                            <Target size={34} className="text-emerald-500" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-white">Geo</h2>
                            <p className="text-xs text-slate-400 mt-1">Escolha um modo para começar — toque para selecionar.</p>
                        </div>
                    </div>

                    {/* OFFLINE (stacked, mobile-first) */}
                    <div className="mb-4 p-5 rounded-2xl bg-slate-900 border border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <div className="text-sm font-black text-white">Offline — Solo</div>
                                <div className="text-[11px] text-slate-400 mt-1">Treine no seu ritmo e ganhe XP.</div>
                            </div>
                            <div className="text-xs font-black text-emerald-400 px-2 py-1 rounded-lg bg-emerald-500/8">Rápido</div>
                        </div>

                        <div className="mt-3">
                            <div className="text-[11px] font-bold text-slate-400 mb-2">Alvos</div>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                                {[10, 50, 100, 300].map(num => (
                                    <button
                                        key={num}
                                        onClick={() => setMissionLimit(num)}
                                        className={`min-w-[72px] py-3 rounded-2xl font-black ${missionLimit === num ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-white'} text-center`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4">
                            <button onClick={() => initializeGame(missionLimit || 10)} className="w-full py-4 rounded-2xl font-black text-slate-950 bg-emerald-500">Começar (offline)</button>
                        </div>

                        <div className="mt-3 text-xs text-slate-400">Dica: tocar em um número seleciona a quantidade — depois toque "Começar".</div>
                    </div>

                    {/* ONLINE (stacked) */}
                    <div className="p-5 rounded-2xl bg-slate-900 border border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <div className="text-sm font-black text-white">Online — Multijogador</div>
                                <div className="text-[11px] text-slate-400 mt-1">Crie sala ou entre com código e jogue em tempo real.</div>
                            </div>
                            <div className="text-xs font-black text-rose-400 px-2 py-1 rounded-lg bg-rose-500/8">Competitivo</div>
                        </div>

                        <div className="mt-2 grid gap-3">
                            <button onClick={openOnlineMode} className="w-full py-4 rounded-2xl font-black text-white bg-rose-500">Jogar Online</button>
                            <button onClick={openOnlineMode} className="w-full py-3 rounded-2xl font-black bg-slate-800 text-white">Criar / Entrar</button>
                        </div>

                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                            <Wifi size={14} className="text-amber-400" />
                            <div>Partidas sincronizadas em tempo real • anfitrião inicia</div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <button onClick={() => setView('dashboard')} className="text-xs font-black uppercase text-slate-400">Voltar</button>
                    </div>

                </motion.div>

                {/* modal de online também disponível na tela inicial */}
                {showOnlineMode && (
                    <GeoGameOnline
                        onClose={() => setShowOnlineMode(false)}
                        setView={setView}
                        isDark={mapStyle === 'dark'}
                        userData={userData}
                        updateProgress={updateProgress}
                        unlockBadge={unlockBadge}
                    />
                )}

            </div>
        );
    }

    // show online overlay when requested (rendered inside main UI)

    return (
        <div className="fixed inset-0 z-[4000] flex flex-col bg-slate-950 font-sans select-none touch-none">
            <header className="absolute top-4 left-4 right-4 z-[1000] flex justify-between items-start pointer-events-none">
                <div className="flex gap-2 pointer-events-auto">
                    <button onClick={() => setView('dashboard')} className="hud-glass w-10 h-10 rounded-xl flex items-center justify-center text-white border border-white/10 active:bg-red-500/20"><X size={20} /></button>
                    <div className="hud-glass px-4 py-2 rounded-2xl flex items-center gap-3 border-l-4 border-emerald-500">
                        <span className="text-[10px] font-black tracking-widest text-white uppercase opacity-80">RADAR_ATIVO</span>
                    </div>
                </div>
                <div className="flex gap-2 pointer-events-auto">
                    <button onClick={() => setMapStyle(s => s === 'dark' ? 'light' : 'dark')} title="Alternar estilo do mapa" className="hud-glass w-10 h-10 rounded-xl flex items-center justify-center text-white border border-white/10 active:bg-emerald-500/20 pointer-events-auto">
                        {mapStyle === 'dark' ? <Sun size={18} className="text-amber-300" /> : <Moon size={18} className="text-slate-400" />}
                    </button>
                    <button onClick={() => setShowOnlineMode(true)} title="Jogar Online" className="hud-glass w-10 h-10 rounded-xl flex items-center justify-center text-white border border-white/10 active:bg-emerald-500/20 pointer-events-auto">
                        <Wifi size={16} />
                    </button>
                    <div className="hud-glass px-4 py-2 rounded-2xl text-center min-w-[60px]">
                        <p className="text-[8px] opacity-40 font-black uppercase">STREAK</p>
                        <p className="text-sm font-black text-amber-400 leading-none">{streak}</p>
                    </div>
                    <div className="hud-glass px-4 py-2 rounded-2xl text-center min-w-[60px]">
                        <p className="text-[8px] opacity-40 font-black uppercase">ALVO</p>
                        <p className="text-sm font-black text-white leading-none">{currentLevel + 1}/{missions.length}</p>
                    </div>
                </div>
            </header>

            {showOnlineMode && (
                <GeoGameOnline
                    onClose={() => setShowOnlineMode(false)}
                    setView={setView}
                    isDark={mapStyle === 'dark'}
                    userData={userData}
                    updateProgress={updateProgress}
                    unlockBadge={unlockBadge}
                />
            )}

            <div className="flex-1 relative z-0">
                <MapContainer center={[20, 0]} zoom={2} zoomControl={false} className={`h-full w-full ${mapStyle === 'light' ? 'leaflet-container--light' : ''}`} worldCopyJump={true}>
                    <TileLayer
                      url={mapStyle === 'dark'
                        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
                      noWrap={false}
                    />
                    <ClickHandler setPos={setUserGuess} active={!showResult} />
                    <MapController targetPos={mapFly?.pos} zoomLevel={mapFly?.zoom} />
                    {userGuess && <Marker position={userGuess} icon={customIcon} />}
                    {showResult && (
                        <>
                            <Circle center={[missions[currentLevel].lat, missions[currentLevel].lng]} radius={missions[currentLevel].precision} pathOptions={{ color: '#10b981', fillOpacity: 0.2 }} />
                            <Marker position={[missions[currentLevel].lat, missions[currentLevel].lng]} icon={customIcon} />
                        </>
                    )}
                </MapContainer>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-[1000] p-4 pb-8 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                <motion.div layout className="hud-glass rounded-[3rem] p-6 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-1 bg-emerald-500/20 w-full">
                        <motion.div className="h-full bg-emerald-500" initial={{ width: 0 }} animate={{ width: `${((currentLevel + 1) / missions.length) * 100}%` }} />
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2"><Zap size={14} className="text-amber-400" /><span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Breve</span></div>
                        <div className="flex gap-1">{missions[currentLevel]?.tags.map(tag => <span key={tag} className="text-[8px] font-bold px-2 py-0.5 bg-white/5 rounded text-slate-400 uppercase">{tag}</span>)}</div>
                    </div>
                    <p className="text-lg font-bold mb-8 text-white tracking-tight leading-tight">{missions[currentLevel]?.description}</p>
                    <div className="flex gap-4">
                        <button disabled={showResult || (userData.xp || 0) < 200} onClick={() => { setShowHintConfirm(true); }} className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-indigo-400 border border-white/5 disabled:opacity-20 transition-all"><HelpCircle size={32} /></button>
                        <button disabled={!userGuess || showResult} onClick={handleConfirm} className={`flex-1 h-16 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 ${userGuess && !showResult ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-600'}`}><LocateFixed size={20} />Confirmar Alvo</button>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {showHintConfirm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[6000] flex items-end justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                        <div className="hud-glass w-full max-w-sm p-8 rounded-[3rem] border-t-4 border-indigo-500">
                            <ShieldAlert size={48} className="text-indigo-400 mx-auto mb-6" />
                            <h4 className="text-xl font-black text-white text-center mb-2 uppercase">Lançar Sonda?</h4>
                            <p className="text-slate-400 text-sm text-center mb-8">Consumirá <span className="text-indigo-400 font-bold">200 XP</span> para varredura orbital.</p>
                            <div className="flex flex-col gap-3">
                                <button onClick={() => { updateProgress(-200, 'geo-hint'); setHintUsedCount(c => c + 1); setShowHintConfirm(false); setMapFly({ pos: [missions[currentLevel].lat, missions[currentLevel].lng], zoom: 4 }); }} className="w-full py-5 bg-indigo-500 text-white rounded-2xl font-black uppercase text-sm">Lançar</button>
                                <button onClick={() => setShowHintConfirm(false)} className="w-full py-4 text-slate-500 font-black uppercase text-xs">Abortar</button>
                            </div>
                        </div>
                    </motion.div>
                )}
                {showResult && lastResult && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[6000] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl">
                        <div className="hud-glass w-full max-w-sm p-10 rounded-[4rem] text-center border-t-8 border-emerald-500">
                            <div className="mb-6 flex justify-center">{lastResult.isHit ? <CheckCircle2 size={80} className="text-emerald-500" /> : <XCircle size={80} className="text-red-500" />}</div>
                            <h3 className="text-2xl font-black mb-1 text-white uppercase italic">{lastResult.isHit ? 'Impacto!' : 'Falha'}</h3>
                            <div className="bg-white/5 rounded-[2.5rem] p-8 mb-10 border border-white/5">
                                <p className="text-6xl font-black text-emerald-400 mb-2">{lastResult.isHit ? `+${lastResult.points}` : '0'}<span className="text-xs opacity-50 ml-1">XP</span></p>
                                <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">Erro de Alvo: {lastResult.distance} KM</p>
                            </div>
                            <button onClick={nextMission} className="w-full py-6 bg-white text-slate-950 rounded-3xl font-black uppercase tracking-widest text-sm active:scale-95 transition-all">Próxima Etapa</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};