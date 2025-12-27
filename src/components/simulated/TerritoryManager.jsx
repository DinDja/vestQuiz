import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, Users, Leaf, AlertTriangle, CheckCircle2,
    ArrowRight, RotateCcw, Building2,
    MapPin, Zap, ShieldAlert, Tag, ChevronRight,
    Info, BookOpen, Target, Bell
} from 'lucide-react';
import {
    TERRITORY_SCENARIOS,
    INITIAL_STATS,
    getRandomScenario,
    updateStats,
    checkGameOver,
    getGameOverMessage
} from '../../constants/territoryScenarios';

export const TerritoryManager = ({ setView, isDark, updateProgress }) => {
    const [showBriefing, setShowBriefing] = useState(true);
    const [briefingStep, setBriefingStep] = useState(0);
    const [currentScenario, setCurrentScenario] = useState(null);
    const [stats, setStats] = useState({ ...INITIAL_STATS, politicalCapital: 100 });
    const [gameState, setGameState] = useState('playing');
    const [lastChoice, setLastChoice] = useState(null);
    const [turn, setTurn] = useState(1);
    const [history, setHistory] = useState([]);
    const [activeAlert, setActiveAlert] = useState(null);

    useEffect(() => {
        setCurrentScenario(getRandomScenario());
    }, []);

    const tutorialSteps = [
        {
            title: "Missão: Gestor do Território",
            desc: "Você assumiu o comando estratégico da Bahia. Cada decisão molda o futuro do estado. Seu objetivo é sobreviver ao maior número de semanas mantendo o equilíbrio.",
            icon: <Building2 className="text-amber-500" size={48} />
        },
        {
            title: "Os Três Pilares",
            desc: "Economia (Investimentos), Sociedade (Bem-estar) e Meio Ambiente (Preservação). Se qualquer um chegar a 0% ou 100%, seu governo colapsa por negligência ou radicalismo.",
            icon: <div className="flex gap-2 text-indigo-500"><TrendingUp size={24} /><Users size={24} /><Leaf size={24} /></div>
        },
        {
            title: "Capital Político",
            desc: "Representa sua governabilidade. Cada ação consome Capital. Se ele zerar, você perde o apoio e sofre impeachment. Pense bem antes de agir!",
            icon: <Zap className="text-yellow-500" size={40} />
        }
    ];

    const checkAlerts = (newStats) => {
        if (newStats.economy < 20) return { type: 'danger', msg: "COFRES VAZIOS: O estado está operando no limite financeiro." };
        if (newStats.society < 20) return { type: 'danger', msg: "CONVULSÃO SOCIAL: Protestos massivos em Salvador e interior." };
        if (newStats.environment < 20) return { type: 'danger', msg: "ECOSISTEMA EM RUÍNAS: Danos ambientais irreversíveis detectados." };
        if (newStats.politicalCapital < 20) return { type: 'warning', msg: "ISOLAMENTO POLÍTICO: A Assembleia Legislativa ameaça impeachment." };

        if (newStats.economy > 90) return { type: 'warning', msg: "BOLHA ECONÔMICA: O crescimento acelerado ameaça a estabilidade social." };
        if (newStats.society > 90) return { type: 'warning', msg: "POPULISMO: A alta demanda social está drenando todos os recursos." };
        if (newStats.environment > 90) return { type: 'warning', msg: "ESTAGNAÇÃO: A rigidez ambiental paralisou o desenvolvimento industrial." };

        return null;
    };

    const handleChoice = (option) => {
        const nextStats = updateStats(stats, option.impact);
        nextStats.politicalCapital = Math.max(0, stats.politicalCapital - 8);

        const alert = checkAlerts(nextStats);
        setActiveAlert(alert);

        setStats(nextStats);
        setLastChoice({ ...option });
        setHistory(prev => [{ title: currentScenario.title, region: currentScenario.region, choice: option.text }, ...prev].slice(0, 5));

        if (checkGameOver(nextStats) || nextStats.politicalCapital <= 0) {
            setGameState('gameover');
        } else {
            setGameState('feedback');
        }
    };

    const nextTurn = () => {
        setCurrentScenario(getRandomScenario());
        setTurn(prev => prev + 1);
        setActiveAlert(null);
        setGameState('playing');
        if (turn % 5 === 0 && updateProgress) updateProgress(50, null);
    };

    const handleRestart = () => {
        setStats({ ...INITIAL_STATS, politicalCapital: 100 });
        setTurn(1);
        setHistory([]);
        setActiveAlert(null);
        setGameState('playing');
        setCurrentScenario(getRandomScenario());
    };

    const StatIcon = ({ icon: Icon, value, color, label }) => (
        <div className="flex flex-col items-center flex-1">
            <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl mb-1 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <Icon size={16} className={value < 25 ? 'text-red-500 animate-pulse' : isDark ? 'text-slate-400' : 'text-slate-600'} />
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-700/10" />
                    <motion.circle
                        cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="113"
                        initial={{ strokeDashoffset: 113 }}
                        animate={{ strokeDashoffset: 113 - (113 * value) / 100 }}
                        className={color}
                    />
                </svg>
            </div>
            <span className="text-[10px] font-bold">{value}%</span>
        </div>
    );

    if (!currentScenario) return null;

    return (
        <div className={`min-h-[100dvh] flex flex-col ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

            <header className="p-4 sticky top-0 z-50">
                <div className={`p-4 rounded-3xl border flex justify-around items-center shadow-2xl backdrop-blur-xl ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
                    <StatIcon icon={TrendingUp} value={stats.economy} color="text-blue-500" label="Econ" />
                    <StatIcon icon={Users} value={stats.society} color="text-rose-500" label="Social" />
                    <StatIcon icon={Leaf} value={stats.environment} color="text-emerald-500" label="Amb" />
                    <StatIcon icon={Zap} value={stats.politicalCapital} color="text-amber-500" label="Cap" />
                </div>
            </header>

            <main className="flex-1 flex flex-col px-4 pb-28 justify-center max-w-lg mx-auto w-full">
                <AnimatePresence mode="wait">

                    {showBriefing ? (
                        <motion.div
                            key="briefing"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className={`p-8 rounded-[3rem] border shadow-2xl text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                        >
                            <div className="flex justify-center mb-6">
                                {tutorialSteps[briefingStep].icon}
                            </div>
                            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">
                                {tutorialSteps[briefingStep].title}
                            </h2>
                            <p className="text-sm opacity-70 leading-relaxed mb-10 min-h-[80px]">
                                {tutorialSteps[briefingStep].desc}
                            </p>

                            <div className="flex gap-2 mb-8 justify-center">
                                {tutorialSteps.map((_, i) => (
                                    <div key={i} className={`h-1.5 rounded-full transition-all ${i === briefingStep ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700'}`} />
                                ))}
                            </div>

                            <button
                                onClick={() => briefingStep < tutorialSteps.length - 1 ? setBriefingStep(s => s + 1) : setShowBriefing(false)}
                                className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs active:scale-95"
                            >
                                {briefingStep === tutorialSteps.length - 1 ? "Iniciar Comando" : "Próximo"} <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    ) : (
                        <>
                            {gameState === 'playing' && (
                                <motion.div key="scen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                    <div className={`relative overflow-hidden rounded-[2.5rem] border shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                                        <div className="bg-indigo-600 px-6 py-2 flex items-center gap-2">
                                            <MapPin size={12} className="text-indigo-200" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">{currentScenario.region}</span>
                                        </div>
                                        <div className="p-6 md:p-8">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-0.5 rounded-md bg-slate-500/10 text-slate-500 text-[9px] font-black uppercase tracking-widest border border-slate-500/20">
                                                    {currentScenario.category}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl font-black leading-tight mb-4">{currentScenario.title}</h2>
                                            <p className="text-sm opacity-70 mb-10 font-medium">{currentScenario.description}</p>
                                            <div className="space-y-3">
                                                {currentScenario.options.map((opt, idx) => (
                                                    <button key={idx} onClick={() => handleChoice(opt)} className={`w-full group p-5 rounded-2xl border text-left transition-all active:scale-[0.96] flex items-center justify-between ${isDark ? 'bg-slate-800/40 border-slate-700 hover:border-indigo-500' : 'bg-slate-50 border-slate-200 hover:border-indigo-500'}`}>
                                                        <span className="text-sm font-bold flex-1 pr-4">{opt.text}</span>
                                                        <ChevronRight size={18} className="text-indigo-500" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {gameState === 'feedback' && (
                                <motion.div key="feed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">

                                    {activeAlert && (
                                        <motion.div
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className={`p-4 rounded-2xl flex items-center gap-3 border-l-4 shadow-lg ${activeAlert.type === 'danger'
                                                    ? 'bg-red-500/10 border-red-500 text-red-500'
                                                    : 'bg-amber-500/10 border-amber-500 text-amber-500'
                                                }`}
                                        >
                                            <Bell size={20} className="animate-bounce" />
                                            <p className="text-[10px] font-black uppercase tracking-tight leading-tight">{activeAlert.msg}</p>
                                        </motion.div>
                                    )}

                                    <div className={`p-8 rounded-[3rem] border shadow-2xl text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 size={40} className="text-emerald-500" />
                                        </div>
                                        <h3 className="text-xl font-black uppercase mb-4">Ação Processada</h3>
                                        <div className="p-5 rounded-2xl bg-slate-500/5 mb-8"><p className="text-sm italic opacity-80">"{lastChoice.feedback}"</p></div>
                                        <button onClick={nextTurn} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs active:scale-95">
                                            Avançar Turno <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {gameState === 'gameover' && (
                                <motion.div key="go" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                                    <div className="p-8 rounded-[3rem] border-2 border-red-500/40 bg-red-500/5 backdrop-blur-md shadow-2xl">
                                        <ShieldAlert size={48} className="text-red-500 mx-auto mb-6" />
                                        <h2 className="text-2xl font-black text-red-500 uppercase mb-4">Fim do Mandato</h2>
                                        <p className="text-sm font-bold mb-8 px-4">{getGameOverMessage(stats)}</p>
                                        <button onClick={handleRestart} className="w-full py-5 bg-red-600 text-white font-black rounded-2xl uppercase text-xs active:scale-95">
                                            Novo Comando
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};