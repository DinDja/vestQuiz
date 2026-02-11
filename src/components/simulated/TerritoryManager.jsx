import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, Users, Leaf, AlertTriangle, CheckCircle2,
    ArrowRight, RotateCcw, Building2,
    MapPin, Zap, ShieldAlert, Tag, ChevronRight,
    Info, BookOpen, Target, Bell, TrendingDown, Minus,
    Activity, BarChart3, Sparkles, Award, ShoppingBag, X,
    Shield, Timer, Flame, CreditCard, Package, Star
} from 'lucide-react';
import {
    TERRITORY_SCENARIOS,
    INITIAL_STATS,
    STATS_LIMITS,
    getRandomScenario,
    updateStats,
    checkGameOver,
    getGameOverMessage,
    POWER_CARDS,
    CARD_RARITIES,
    getShopCards,
    applyCardEffect,
    applyActiveEffectsToImpact,
    applyShieldsToStats,
    tickActiveEffects
} from '../../constants/territoryScenarios';
import { TERRITORY_BADGES } from '../../constants/badges';
import { AchievementToast } from '../common/AchievementToast';
import MapRoad from './MapRoad';

export const TerritoryManager = ({ setView, isDark, updateProgress }) => {
    const [showBriefing, setShowBriefing] = useState(true);
    const [briefingStep, setBriefingStep] = useState(0);
    const [currentScenario, setCurrentScenario] = useState(null);
    const [stats, setStats] = useState({ ...INITIAL_STATS, politicalCapital: 100 });
    const [statsHistory, setStatsHistory] = useState([{ ...INITIAL_STATS, politicalCapital: 100 }]);
    const [gameState, setGameState] = useState('playing');
    const [lastChoice, setLastChoice] = useState(null);
    const [turn, setTurn] = useState(1);
    const [history, setHistory] = useState([]);
    const [earnedBadges, setEarnedBadges] = useState([]);
    const [toastBadge, setToastBadge] = useState(null);
    const [activeAlert, setActiveAlert] = useState(null);
    const [hoveredOption, setHoveredOption] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const [impactParticles, setImpactParticles] = useState([]);

    // Sistema de cartas
    const [showShop, setShowShop] = useState(false);
    const [shopCards, setShopCards] = useState([]);
    const [ownedCards, setOwnedCards] = useState([]);
    const [usedCards, setUsedCards] = useState([]);
    const [activeEffects, setActiveEffects] = useState([]);
    const [cardAnimation, setCardAnimation] = useState(null); // { card, type: 'buy'|'use' }
    const [wildcardResult, setWildcardResult] = useState(null);
    const [showInventory, setShowInventory] = useState(false);
    const MANDATE_TURNS = 10; // roadmap length (configurável)
    const [timelineEvents, setTimelineEvents] = useState({});

    // Mobile-friendly header: compact mode for very small screens + manual expand
    const [compactHeader, setCompactHeader] = useState(false);
    const [showFullHeader, setShowFullHeader] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            const mq = window.matchMedia('(max-width:420px)');
            const handler = (e) => setCompactHeader(!!e.matches);
            handler(mq);
            // modern + fallback listener
            mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
            return () => mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler);
        }
        return undefined;
    }, []);

    useEffect(() => {
        setCurrentScenario(getRandomScenario());
        setShopCards(getShopCards(1));
    }, []);

    // Timeline helper: append small event objects per turn
    const addTimelineEvent = (turnNum, ev) => {
        setTimelineEvents(prev => {
            const existing = prev[turnNum] ? [...prev[turnNum]] : [];
            return { ...prev, [turnNum]: [{ id: Math.random().toString(36).slice(2), ...ev }, ...existing] };
        });
    }; 

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
        },
        {
            title: "Cartas de Poder",
            desc: "A cada turno uma loja oferece cartas especiais! Gaste Capital Político para comprar: boosts imediatos, escudos protetores, multiplicadores e até uma Segunda Chance.",
            icon: <div className="flex gap-2"><span className="text-3xl">🃏</span><ShoppingBag className="text-violet-500" size={40} /></div>
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

    const computeAlertForStats = (s) => {
        if (s.economy < 20) return true;
        if (s.society < 20) return true;
        if (s.environment < 20) return true;
        if (s.politicalCapital < 20) return true;
        if (s.economy > 90) return true;
        if (s.society > 90) return true;
        if (s.environment > 90) return true;
        return false;
    };

    const evaluateTerritoryBadges = (historySnapshot, currentTurn, isGameOver) => {
        const newly = [];
        TERRITORY_BADGES.forEach(b => {
            if (earnedBadges.includes(b.id)) return;

            // reqTurns
            if (b.reqTurns) {
                if (historySnapshot.length >= b.reqTurns) newly.push(b.id);
                return;
            }

            // reqBalancedTurns
            if (b.reqBalancedTurns && b.reqStatRange) {
                const last = historySnapshot.slice(-b.reqBalancedTurns);
                if (last.length >= b.reqBalancedTurns && last.every(s => s.economy >= b.reqStatRange.min && s.economy <= b.reqStatRange.max && s.society >= b.reqStatRange.min && s.society <= b.reqStatRange.max && s.environment >= b.reqStatRange.min && s.environment <= b.reqStatRange.max)) {
                    newly.push(b.id);
                }
                return;
            }

            // reqIncrease
            if (b.reqIncrease) {
                const window = historySnapshot.slice(-b.reqIncrease.withinTurns - 1);
                if (window.length >= 2) {
                    const start = window[0][b.reqIncrease.stat];
                    const end = window[window.length - 1][b.reqIncrease.stat];
                    if ((end - start) >= b.reqIncrease.amount) newly.push(b.id);
                }
                return;
            }

            // reqConsecutiveStat
            if (b.reqConsecutiveStat) {
                const last = historySnapshot.slice(-b.reqConsecutiveStat.turns);
                if (last.length >= b.reqConsecutiveStat.turns && last.every(s => s[b.reqConsecutiveStat.stat] >= b.reqConsecutiveStat.min)) {
                    newly.push(b.id);
                }
                return;
            }

            // reqComeback
            if (b.reqComeback) {
                const everBelow = historySnapshot.some(s => s.economy != null && (s.economy < b.reqComeback.fromBelow || s.society < b.reqComeback.fromBelow || s.environment < b.reqComeback.fromBelow || s.politicalCapital < b.reqComeback.fromBelow));
                const laterAtLeast = historySnapshot.some(s => s.economy != null && (s.economy >= b.reqComeback.toAtLeast || s.society >= b.reqComeback.toAtLeast || s.environment >= b.reqComeback.toAtLeast || s.politicalCapital >= b.reqComeback.toAtLeast));
                if (everBelow && laterAtLeast) newly.push(b.id);
                return;
            }

            // reqNoAlerts
            if (b.reqNoAlerts) {
                const last = historySnapshot.slice(-b.reqNoAlerts);
                if (last.length >= b.reqNoAlerts && last.every(s => !computeAlertForStats(s))) newly.push(b.id);
                return;
            }

            // reqPerfectRun
            if (b.reqPerfectRun) {
                const last = historySnapshot.slice(-b.reqPerfectRun);
                if (last.length >= b.reqPerfectRun && last.every(s => Object.values({ economy: s.economy, society: s.society, environment: s.environment }).every(v => v > 10 && v < 90))) newly.push(b.id);
                return;
            }

            // reqFirstFinish
            if (b.reqFirstFinish) {
                if (isGameOver) newly.push(b.id);
                return;
            }
        });

        return [...new Set(newly)];
    };

    const handleChoice = (option) => {
        // Aplicar efeitos ativos (multiplicadores, desconto de capital)
        const { modifiedImpact, capitalCostMultiplier } = applyActiveEffectsToImpact(option.impact, activeEffects);

        const nextStats = updateStats(stats, modifiedImpact);
        const capitalCost = Math.round(8 * capitalCostMultiplier);
        nextStats.politicalCapital = Math.max(0, stats.politicalCapital - capitalCost);

        // Aplicar escudos
        const shieldedStats = applyShieldsToStats(nextStats, activeEffects);
        Object.assign(nextStats, shieldedStats);

        // Criar partículas de impacto visual
        const particles = [];
        Object.keys(modifiedImpact).forEach((key) => {
            const value = modifiedImpact[key];
            if (value !== 0) {
                particles.push({
                    id: Math.random(),
                    stat: key,
                    value,
                    color: key === 'economy' ? 'blue' : key === 'society' ? 'rose' : 'emerald'
                });
            }
        });
        setImpactParticles(particles);
        setTimeout(() => setImpactParticles([]), 2000);

        const alert = checkAlerts(nextStats);
        setActiveAlert(alert);

        // Checar game over com possibilidade de carta Segunda Chance
        const isGameOver = checkGameOver(nextStats) || nextStats.politicalCapital <= 0;

        if (isGameOver) {
            const emergencyEffect = activeEffects.find(e => e.type === 'emergency');
            if (emergencyEffect) {
                // Usar Segunda Chance automaticamente
                nextStats.economy = Math.max(emergencyEffect.resetValue, nextStats.economy);
                nextStats.society = Math.max(emergencyEffect.resetValue, nextStats.society);
                nextStats.environment = Math.max(emergencyEffect.resetValue, nextStats.environment);
                nextStats.politicalCapital = Math.max(20, nextStats.politicalCapital);
                setActiveEffects(prev => prev.filter(e => e.id !== emergencyEffect.id));
                setCardAnimation({ card: POWER_CARDS.find(c => c.id === 'second_chance'), type: 'auto-use' });
                setTimeout(() => setCardAnimation(null), 2500);
            }
        }

        const isStillGameOver = checkGameOver(nextStats) || nextStats.politicalCapital <= 0;

        setStats(nextStats);
        setLastChoice({ ...option, appliedImpact: modifiedImpact, capitalCost });
        setHistory(prev => [{ title: currentScenario.title, region: currentScenario.region, choice: option.text }, ...prev].slice(0, 5));

        // Timeline: record decision
        addTimelineEvent(turn, { type: 'decision', title: option.text, detail: `Cap: ${capitalCost}` });

        if (isStillGameOver) {
            setGameState('gameover');
        } else {
            setGameState('feedback');
        }
    };

    const nextTurn = () => {
        // finalize current stats into history
        setStatsHistory(prev => {
            const next = [...prev, { ...stats }];
            // evaluate badges based on next history
            const newBadges = evaluateTerritoryBadges(next, turn + 1, false);
            if (newBadges.length) {
                setEarnedBadges(e => {
                    const merged = Array.from(new Set([...e, ...newBadges]));
                    // show first new badge toast
                    const first = TERRITORY_BADGES.find(b => merged.includes(b.id) && !e.includes(b.id));
                    if (first) setToastBadge(first);
                    return merged;
                });
                if (updateProgress) updateProgress(100, null);
            }
            return next;
        });

        // Aplicar efeitos passivos antes de finalizar o turno (ex: +econ por turno)
        let statsAfterPassives = { ...stats };
        activeEffects.forEach(e => {
            if (e.passivePerTurn) {
                Object.entries(e.passivePerTurn).forEach(([k, v]) => {
                    statsAfterPassives[k] = Math.max(STATS_LIMITS.MIN + 1, Math.min(STATS_LIMITS.MAX - 1, (statsAfterPassives[k] || 0) + v));
                });
            }
        });
        if (JSON.stringify(statsAfterPassives) !== JSON.stringify(stats)) {
            setStats(statsAfterPassives);
        }

        // Decrementar efeitos ativos
        setActiveEffects(prev => tickActiveEffects(prev));

        // Renovar loja a cada turno
        setShopCards(getShopCards(turn + 1));

        setCurrentScenario(getRandomScenario());
        setTurn(prev => prev + 1);
        setActiveAlert(null);
        setGameState('playing');

        // carry timeline forward (no-op by default) - keeps previous events accessible
        // (could snapshot per-turn summary here if desired) 
        if (turn % 5 === 0 && updateProgress) updateProgress(50, null);
    };

    // Comprar carta da loja
    const handleBuyCard = (card) => {
        console.debug && console.debug('[Shop] buy attempt', card.id, { cost: card.cost, specialCost: card.specialCost });

        // affordability checks (political capital)
        if (card.cost > 0 && stats.politicalCapital < card.cost) {
            setActiveAlert({ type: 'warning', msg: 'Capital insuficiente para comprar esta carta.' });
            setTimeout(() => setActiveAlert(null), 1400);
            return;
        }

        // specialCost checks (e.g., spends economy/society)
        if (card.specialCost) {
            const ok = Object.entries(card.specialCost).every(([k, v]) => (stats[k] || 0) - v >= STATS_LIMITS.MIN + 1);
            if (!ok) {
                setActiveAlert({ type: 'warning', msg: 'Não há estatísticas suficientes para pagar o custo desta carta.' });
                setTimeout(() => setActiveAlert(null), 1600);
                return;
            }
        }

        const immediateTypes = ['boost', 'capitalRestore', 'balance', 'rebalance', 'wildcard'];
        const inventoryTypes = ['shield', 'multiplier', 'capitalDiscount', 'emergency', 'passive'];

        // Apply purchase effects
        if (immediateTypes.includes(card.type)) {
            const { newStats, newEffects } = applyCardEffect(card, stats, activeEffects) || {};

            // apply political cost if present
            if (card.cost && card.cost > 0) newStats.politicalCapital = Math.max(0, (newStats.politicalCapital ?? stats.politicalCapital) - card.cost);
            if (card.specialCost) Object.entries(card.specialCost).forEach(([k, v]) => { if (typeof newStats[k] === 'number') newStats[k] = Math.max(STATS_LIMITS.MIN, (newStats[k] || 0) - v); });

            setStats(newStats);
            if (newEffects && newEffects.length) setActiveEffects(newEffects);

            // wildcard feedback
            if (card.type === 'wildcard') {
                const econDiff = newStats.economy - stats.economy;
                const socDiff = newStats.society - stats.society;
                const envDiff = newStats.environment - stats.environment;
                const total = econDiff + socDiff + envDiff;
                setWildcardResult(total > 0 ? 'lucky' : total < 0 ? 'unlucky' : 'neutral');
                setTimeout(() => setWildcardResult(null), 3000);
            }

            // Cartas imediatas vão direto para "Usadas" após compra
            setUsedCards(u => [{ ...card, usedAt: Date.now() }, ...u].slice(0, 20));
        } else if (inventoryTypes.includes(card.type) || card.storeForLater) {
            // Cards that are stored in inventory — NÃO ativar efeito agora, só ao usar

            // Deduct political cost (if any) and special costs
            const statsAfter = { ...stats };
            if (card.cost && card.cost > 0) statsAfter.politicalCapital = Math.max(0, stats.politicalCapital - card.cost);
            if (card.specialCost) Object.entries(card.specialCost).forEach(([k, v]) => { if (typeof statsAfter[k] === 'number') statsAfter[k] = Math.max(STATS_LIMITS.MIN, (statsAfter[k] || 0) - v); });

            setStats(statsAfter);

            // add to inventory (prevent duplicates) — efeito só ativa via handleUseCard
            setOwnedCards(prev => {
                if (prev.some(c => c.id === card.id)) return prev;
                return [{ ...card }, ...prev];
            });
        } else {
            // Fallback: treat as immediate
            const { newStats, newEffects } = applyCardEffect(card, stats, activeEffects) || {};
            setStats(newStats || stats);
            if (newEffects && newEffects.length) setActiveEffects(newEffects);

            // Fallback também vai para "Usadas"
            setUsedCards(u => [{ ...card, usedAt: Date.now() }, ...u].slice(0, 20));
        }

        // Animation + feedback
        setCardAnimation({ card, type: 'buy' });
        setTimeout(() => setCardAnimation(null), 1400);
        setActiveAlert({ type: 'success', msg: `${card.name} adquirida` });
        setTimeout(() => setActiveAlert(null), 1200);

        // Remove from shop
        setShopCards(prev => prev.filter(c => c.id !== card.id));
    };

    // Usar carta do inventário (suporta todos os tipos; mostra feedback visual)
    const handleUseCard = (card) => {
        console.debug && console.debug('[Inventory] use attempt', card && card.id);
        // Defensive: ensure card exists in inventory
        const exists = ownedCards.some(c => c.id === card.id);
        if (!exists) {
            console.warn && console.warn('[Inventory] tried to use a card not in inventory', card && card.id);
            setActiveAlert({ type: 'warning', msg: 'Carta não encontrada no inventário.' });
            setTimeout(() => setActiveAlert(null), 1500);
            return;
        }

        // Apply effect (applyCardEffect is the single source of truth for card logic)
        const { newStats = { ...stats }, newEffects = [] } = applyCardEffect(card, stats, activeEffects) || {};

        // If card has an explicit cost (specialCost or political cost) apply it here when used from inventory
        if (card.cost && card.cost > 0) {
            newStats.politicalCapital = Math.max(0, (newStats.politicalCapital ?? stats.politicalCapital) - card.cost);
        }
        if (card.specialCost) {
            Object.entries(card.specialCost).forEach(([k, v]) => {
                if (typeof newStats[k] === 'number') newStats[k] = Math.max(STATS_LIMITS.MIN, (newStats[k] || 0) - v);
            });
        }

        // Merge active effects returned by the card (shields, multipliers, discounts...)
        if (newEffects && newEffects.length) {
            setActiveEffects(prev => {
                // prefer replacing effects with same id, else append
                const merged = [...prev];
                newEffects.forEach(ne => {
                    const idx = merged.findIndex(e => e.id === ne.id);
                    if (idx !== -1) merged[idx] = { ...merged[idx], ...ne };
                    else merged.push(ne);
                });
                return merged;
            });
        }

        // Persist stat update + visual particles for immediate changes
        const particles = [];
        ['economy', 'society', 'environment'].forEach((k) => {
            const before = stats[k] || 0;
            const after = newStats[k] || 0;
            const diff = after - before;
            if (diff !== 0) particles.push({ id: Math.random(), stat: k, value: diff, color: k === 'economy' ? 'blue' : k === 'society' ? 'rose' : 'emerald' });
        });
        if (particles.length) {
            setImpactParticles(particles);
            setTimeout(() => setImpactParticles([]), 2000);
        }

        setStats(newStats);

        // Wildcard feedback (if applicable)
        if (card.type === 'wildcard') {
            const econDiff = newStats.economy - stats.economy;
            const socDiff = newStats.society - stats.society;
            const envDiff = newStats.environment - stats.environment;
            const total = econDiff + socDiff + envDiff;
            setWildcardResult(total > 0 ? 'lucky' : total < 0 ? 'unlucky' : 'neutral');
            setTimeout(() => setWildcardResult(null), 3000);
        }

        // Remove from inventory (only if it existed) and push to recent used stack for UI
        if (exists) {
            setOwnedCards(prev => {
                const idx = prev.findIndex(c => c.id === card.id);
                if (idx !== -1) {
                    const next = [...prev];
                    const [removed] = next.splice(idx, 1);

                    // push to usedCards so user sees it in 'Usadas'
                    setUsedCards(u => [{ ...removed, usedAt: Date.now() }, ...u].slice(0, 20));

                    // Timeline: record use
                    addTimelineEvent(turn, { type: 'use', title: removed.name, detail: 'Usada do inventário', icon: removed.icon });

                    return next;
                }
                return prev;
            });
        }

        // Visual feedback: card animation + toast/alert when appropriate
        setCardAnimation({ card, type: 'use' });
        setTimeout(() => setCardAnimation(null), 1500);

        // Small alert for mobile visibility (non-blocking)
        setActiveAlert({ type: 'info', msg: `${card.name} ativada` });
        setTimeout(() => setActiveAlert(null), 1800);
    };

    const handleRestart = () => {
        setStats({ ...INITIAL_STATS, politicalCapital: 100 });
        setStatsHistory([{ ...INITIAL_STATS, politicalCapital: 100 }]);
        setTurn(1);
        setHistory([]);
        setActiveAlert(null);
        setEarnedBadges([]);
        setToastBadge(null);
        setGameState('playing');
        setCurrentScenario(getRandomScenario());
        setShopCards(getShopCards(1));
        setOwnedCards([]);
        setUsedCards([]);
        setTimelineEvents({});
        setActiveEffects([]);
        setCardAnimation(null);
        setShowShop(false);
        setShowInventory(false);
    };

    // Partículas flutuantes no background
    const FloatingParticles = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </div>
    );

    // Mini gráfico de evolução
    const MiniChart = ({ data, color }) => {
        const max = Math.max(...data, 50);
        const min = Math.min(...data, 0);
        const range = max - min || 1;

        return (
            <svg className="w-full h-8" viewBox="0 0 100 30" preserveAspectRatio="none">
                <motion.polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    points={data.map((val, idx) =>
                        `${(idx / (data.length - 1 || 1)) * 100},${30 - ((val - min) / range) * 25}`
                    ).join(' ')}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            </svg>
        );
    };

    const StatIcon = ({ icon: Icon, value, color, label, prevValue }) => {
        const diff = prevValue !== undefined ? value - prevValue : 0;
        const isLow = value < 25;
        const isCritical = value < 15 || value > 85;

        return (
            <div className="flex flex-col items-center flex-1 relative">
                {/* Indicador de mudança */}
                <AnimatePresence>
                    {diff !== 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: -5 }}
                            exit={{ opacity: 0, y: -15 }}
                            className={`absolute -top-6 text-xs font-black flex items-center gap-0.5 ${diff > 0 ? 'text-emerald-400' : 'text-red-400'
                                }`}
                        >
                            {diff > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {Math.abs(diff).toFixed(0)}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-xl mb-1 ${isDark ? 'bg-slate-800' : 'bg-slate-100'
                        }`}
                    animate={isCritical ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5, repeat: isCritical ? Infinity : 0 }}
                >
                    <Icon size={18} className={isLow ? 'text-red-500 animate-pulse' : isDark ? 'text-slate-400' : 'text-slate-600'} />

                    {/* Círculo de progresso com efeito glow */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-700/10" />
                        <motion.circle
                            cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="138"
                            initial={{ strokeDashoffset: 138 }}
                            animate={{
                                strokeDashoffset: 138 - (138 * value) / 100,
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`${color} ${isCritical ? 'drop-shadow-[0_0_8px_currentColor]' : ''}`}
                            style={{
                                filter: isCritical ? 'drop-shadow(0 0 6px currentColor)' : 'none'
                            }}
                        />
                    </svg>

                    {/* Efeito de pulso quando crítico */}
                    {isCritical && (
                        <motion.div
                            className={`absolute inset-0 rounded-xl ${color} opacity-20`}
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    )}
                </motion.div>

                <span className={`text-xs font-black ${isLow ? 'text-red-500' : ''}`}>
                    {value}%
                </span>
            </div>
        );
    };

    if (!currentScenario) return null;

    const prevStats = statsHistory[statsHistory.length - 2] || statsHistory[0];

    // Slots visíveis da loja (para exibir no header)
    const shopSlots = (turn <= 2 ? 3 : turn <= 4 ? 4 : turn <= 8 ? 6 : 8);

    return (
        <div className={`min-h-[100dvh] flex flex-col relative overflow-hidden ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

            {/* Redesigned header: stronger hierarchy, sparklines, slots indicator, focus styles */}
            <header className="relative md:sticky md:top-4 z-40 px-4">
                <motion.div
                    className={`relative mx-auto max-w-3xl rounded-3xl p-3 sm:p-4 shadow-2xl border backdrop-blur-2xl transition-all ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}
                    style={{ paddingTop: compactHeader ? 'env(safe-area-inset-top, 12px)' : undefined }}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    {compactHeader && !showFullHeader && (
                        <div className="w-full flex items-center justify-between gap-3">
                            <button
                                onClick={() => setView && setView('dashboard')}
                                className="w-12 h-10 rounded-xl flex items-center justify-center bg-slate-800/20 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                aria-label="Semana"
                            >
                                <ChevronRight className="-rotate-180" size={16} />
                            </button>

                            <div className="flex-1 text-center">
                                <div className="text-sm font-extrabold">Semana {turn}</div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="text-sm font-black text-amber-500 mr-1">{stats.politicalCapital} Cap</div>

                                <button
                                    onClick={() => setShowFullHeader(true)}
                                    className="p-2 rounded-lg bg-slate-700/20"
                                    aria-label="Expandir cabeçalho"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {!(compactHeader && !showFullHeader) && (
                        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3">
                            {/* left: navigation + week (mobile-first) */}
                            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3">
                                <button
                                    onClick={() => setView && setView('dashboard')}
                                    className="mt-2 sm:w-auto flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-tr from-slate-700/20 to-transparent hover:scale-[0.98] active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-400 justify-center sm:justify-start"
                                >
                                    <ChevronRight className="-rotate-180 text-slate-300" size={16} />
                                    <div className="ml-0.5 text-sm font-extrabold tracking-tight text-slate-300">Semana {turn}</div>
                                </button>


                            </div>

                            {/* center: stats card */}
                            <div className="flex-1 w-full mt-3 sm:mt-0 mx-2 p-2 rounded-2xl bg-gradient-to-br from-white/30 to-transparent border border-transparent shadow-sm">
                                <div className="flex items-center justify-between gap-3">
                                    {/* stat pills (column mode on compact/mobile) */}
                                    {compactHeader ? (
                                        <div className="w-full grid grid-cols-1 gap-3">
                                            {[
                                                { icon: TrendingUp, value: stats.economy, color: 'bg-blue-50 text-blue-600', key: 'economy', data: statsHistory.map(s => s.economy) },
                                                { icon: Users, value: stats.society, color: 'bg-rose-50 text-rose-600', key: 'society', data: statsHistory.map(s => s.society) },
                                                { icon: Leaf, value: stats.environment, color: 'bg-emerald-50 text-emerald-600', key: 'environment', data: statsHistory.map(s => s.environment) },
                                                { icon: Zap, value: stats.politicalCapital, color: 'bg-amber-50 text-amber-600', key: 'politicalCapital', data: statsHistory.map(s => s.politicalCapital) }
                                            ].map((s, i) => (
                                                <motion.div
                                                    key={s.key}
                                                    initial={{ opacity: 0, x: -6 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="w-full"
                                                >
                                                    <button
                                                        className={`w-full p-3 rounded-2xl flex items-center justify-between gap-3 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-indigo-300`}
                                                        aria-label={`${s.key} status`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color} ring-1 ring-inset ring-slate-900/5`}>
                                                                <s.icon size={18} className="opacity-90" />
                                                            </div>

                                                            <div className="text-sm font-black truncate">
                                                                {s.key === 'politicalCapital' ? 'Capital Político' : s.key === 'economy' ? 'Economia' : s.key === 'society' ? 'Sociedade' : 'Ambiente'}
                                                            </div>
                                                        </div>

                                                        <div className="ml-3 flex-1 min-w-0">
                                                            <div className="text-xs font-extrabold text-right">{s.value}%</div>
                                                            <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    className={`h-full rounded-full ${s.key === 'economy' ? 'bg-blue-500' : s.key === 'society' ? 'bg-rose-500' : s.key === 'environment' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${Math.max(2, Math.min(98, s.value))}%` }}
                                                                    transition={{ duration: 0.6 }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex gap-3 w-full overflow-x-auto -mx-2 px-2 sm:overflow-x-visible sm:-mx-0 sm:px-0"
                                            style={{ flexWrap: "wrap", display: "flex" }}>
                                            {[
                                                { icon: TrendingUp, value: stats.economy, color: 'bg-blue-50 text-blue-600', key: 'economy', data: statsHistory.map(s => s.economy) },
                                                { icon: Users, value: stats.society, color: 'bg-rose-50 text-rose-600', key: 'society', data: statsHistory.map(s => s.society) },
                                                { icon: Leaf, value: stats.environment, color: 'bg-emerald-50 text-emerald-600', key: 'environment', data: statsHistory.map(s => s.environment) },
                                                { icon: Zap, value: stats.politicalCapital, color: 'bg-amber-50 text-amber-600', key: 'politicalCapital', data: statsHistory.map(s => s.politicalCapital) }
                                            ].map((s, i) => (
                                                <motion.div key={s.key} className="flex-1 min-w-[84px] sm:min-w-0 max-w-[30%] mx-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color} ring-1 ring-inset ring-slate-900/5`}>
                                                            <s.icon size={18} className="opacity-90" />
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <div className="text-xs font-extrabold leading-none text-slate-900 dark:text-slate-100">{s.value}%</div>
                                                                    <div className="text-[10px] mt-0.5 text-slate-400 truncate">{s.key === 'politicalCapital' ? 'Capital Político' : s.key === 'economy' ? 'Economia' : s.key === 'society' ? 'Sociedade' : 'Ambiente'}</div>
                                                                </div>
                                                                <div className="w-20 text-right hidden sm:block">
                                                                    {/* mini sparkline */}
                                                                    <MiniChart data={s.data.slice(-6)} color={s.key === 'economy' ? 'rgb(59,130,246)' : s.key === 'society' ? 'rgb(244,63,94)' : s.key === 'environment' ? 'rgb(16,185,129)' : 'rgb(245,158,11)'} />
                                                                </div>
                                                            </div>

                                                            {/* linear progress */}
                                                            <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    className={`h-full rounded-full ${s.key === 'economy' ? 'bg-blue-500' : s.key === 'society' ? 'bg-rose-500' : s.key === 'environment' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${Math.max(2, Math.min(98, s.value))}%` }}
                                                                    transition={{ duration: 0.8 }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}

                                    {/* right: actions compact (mobile-friendly) */}
                                    <div className="flex flex-col items-end gap-2 min-w-0">
                                        <div className="w-full flex items-center justify-end gap-2">
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => { setShowInventory(!showInventory); setShowShop(false); }}
                                                className="p-2 rounded-lg bg-slate-100/40 text-slate-700 hover:bg-slate-100/60 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                                                title="Efeitos ativos"
                                            >
                                                <Shield size={16} />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* subtle divider */}
                    <div className="mt-3 border-t border-dashed border-slate-200/10" />

                    {/* active effects row (reused) */}
                    <AnimatePresence>
                        {activeEffects.length > 0 && !showInventory && (
                            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex gap-2 overflow-x-auto py-2">
                                {activeEffects.map(eff => (
                                    <div key={eff.id} className="flex items-center gap-2 px-3 py-2 bg-slate-800/20 rounded-2xl border border-slate-700/30 text-[12px] text-slate-200">
                                        <span className="text-xl">{eff.icon}</span>
                                        <div className="text-[12px] font-bold leading-none">{eff.name}</div>
                                        {eff.turnsLeft < 999 && <div className="ml-2 text-[11px] text-slate-400">{eff.turnsLeft}T</div>}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </header>

            {/* Background animado */}
            <FloatingParticles />

            {/* Gradiente animado de fundo */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }}
                    style={{ backgroundSize: '400% 400%' }}
                />
            </div>

            <main className="flex-1 flex flex-col px-4 pb-28 pt-6 md:pt-24 justify-start md:justify-center max-w-lg mx-auto w-full">

                {/* Overlay de Animação de Carta */}
                <AnimatePresence>
                    {cardAnimation && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                            onClick={() => setCardAnimation(null)}
                        >
                            <motion.div
                                initial={{ scale: 0, rotateY: 180 }}
                                animate={{ scale: 1, rotateY: 0 }}
                                exit={{ scale: 0, y: -200, opacity: 0 }}
                                transition={{ type: "spring", damping: 15 }}
                                className={`p-8 rounded-3xl border-2 text-center max-w-xs relative overflow-hidden ${cardAnimation.type === 'auto-use'
                                        ? 'bg-gradient-to-br from-red-900/90 to-red-800/90 border-red-500/50'
                                        : `bg-gradient-to-br ${cardAnimation.card.rarity === 'legendary' ? 'from-amber-900/90 to-amber-800/90 border-amber-500/50' :
                                            cardAnimation.card.rarity === 'epic' ? 'from-purple-900/90 to-purple-800/90 border-purple-500/50' :
                                                cardAnimation.card.rarity === 'rare' ? 'from-blue-900/90 to-blue-800/90 border-blue-500/50' :
                                                    'from-slate-800/90 to-slate-700/90 border-slate-500/50'
                                        }`
                                    }`}
                            >
                                {/* Partículas de fundo */}
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={`absolute w-1 h-1 rounded-full ${cardAnimation.card.rarity === 'legendary' ? 'bg-amber-400' :
                                                cardAnimation.card.rarity === 'epic' ? 'bg-purple-400' :
                                                    'bg-blue-400'
                                            }`}
                                        initial={{ top: '50%', left: '50%', opacity: 0 }}
                                        animate={{
                                            top: `${Math.random() * 100}%`,
                                            left: `${Math.random() * 100}%`,
                                            opacity: [0, 1, 0],
                                        }}
                                        transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                                    />
                                ))}

                                <motion.div
                                    className="text-6xl mb-4"
                                    animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                                >
                                    {cardAnimation.card.icon}
                                </motion.div>

                                <h3 className="text-xl font-black text-white uppercase mb-2">
                                    {cardAnimation.type === 'auto-use' ? '🔮 Segunda Chance!' : cardAnimation.card.name}
                                </h3>

                                <p className="text-sm text-white/70 italic mb-4">
                                    {cardAnimation.type === 'auto-use'
                                        ? 'O povo lhe concedeu mais uma oportunidade!'
                                        : cardAnimation.card.flavor
                                    }
                                </p>

                                <div className={`text-xs font-black uppercase px-4 py-2 rounded-full ${cardAnimation.type === 'buy' ? 'bg-emerald-500/20 text-emerald-400' :
                                        cardAnimation.type === 'use' ? 'bg-violet-500/20 text-violet-400' :
                                            'bg-red-500/20 text-red-400'
                                    }`}>
                                    {cardAnimation.type === 'buy' ? 'Carta Adquirida!' :
                                        cardAnimation.type === 'use' ? 'Carta Utilizada!' :
                                            'Efeito Ativado Automaticamente!'}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Resultado Wildcard */}
                <AnimatePresence>
                    {wildcardResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className={`fixed bottom-32 left-1/2 -translate-x-1/2 z-[80] px-6 py-3 rounded-2xl font-black text-sm shadow-xl ${wildcardResult === 'lucky' ? 'bg-emerald-500 text-white' :
                                    wildcardResult === 'unlucky' ? 'bg-red-500 text-white' :
                                        'bg-amber-500 text-white'
                                }`}
                        >
                            {wildcardResult === 'lucky' ? '🍀 Sorte Grande! +20 em tudo!' :
                                wildcardResult === 'unlucky' ? '💀 Azar! -10 em tudo!' :
                                    '🎲 Resultado Neutro'}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* LOJA DE CARTAS */}
                <AnimatePresence>
                    {showShop && gameState === 'playing' && (
                        <motion.div
                            key="shop"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mb-4 relative z-50"
                        >
                            <div className={`rounded-3xl border shadow-2xl overflow-hidden ${isDark ? 'bg-slate-900/95 border-violet-500/30' : 'bg-white/95 border-violet-500/30'
                                }`}>
                                {/* Header da loja */}
                                <div className="relative bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-4 overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                    />
                                    <div className="relative flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <ShoppingBag size={18} className="text-white" />
                                            <span className="text-sm font-black uppercase tracking-widest text-white">
                                                Loja de Cartas
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold flex items-center gap-1">
                                                <Zap size={12} />
                                                {stats.politicalCapital} Cap
                                            </div>
                                            <button onClick={() => setShowShop(false)} className="p-1 rounded-lg bg-white/20 text-white">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Grid de cartas */}
                                <div className="p-4 space-y-3">
                                    {shopCards.length === 0 ? (
                                        <div className="text-center py-8 opacity-50">
                                            <Package size={32} className="mx-auto mb-2" />
                                            <p className="text-xs font-bold">Loja vazia! Novas cartas no próximo turno.</p>
                                        </div>
                                    ) : (
                                        shopCards.map((card, idx) => {
                                            const rarity = CARD_RARITIES[card.rarity];
                                            const canAfford = card.cost === 0 || stats.politicalCapital >= card.cost;

                                            return (
                                                <motion.div
                                                    key={card.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                >
                                                    <motion.button
                                                        onClick={() => canAfford && handleBuyCard(card)}
                                                        disabled={!canAfford}
                                                        className={`w-full p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${canAfford
                                                                ? isDark
                                                                    ? `bg-slate-800/60 border-${rarity.color}-500/30 hover:border-${rarity.color}-500 hover:bg-slate-800`
                                                                    : `bg-slate-50 border-${rarity.color}-500/30 hover:border-${rarity.color}-500 hover:bg-white`
                                                                : 'opacity-50 cursor-not-allowed bg-slate-800/20 border-slate-700/20'
                                                            } ${rarity.glow && canAfford ? `shadow-lg ${rarity.glow}` : ''}`}
                                                        whileHover={canAfford ? { scale: 1.02 } : {}}
                                                        whileTap={canAfford ? { scale: 0.98 } : {}}
                                                    >
                                                        {/* Brilho no hover */}
                                                        {canAfford && (
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                                                initial={{ x: '-100%' }}
                                                                whileHover={{ x: '100%' }}
                                                                transition={{ duration: 0.6 }}
                                                            />
                                                        )}

                                                        <div className="relative flex items-start gap-3">
                                                            {/* Ícone da carta */}
                                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${isDark ? 'bg-slate-700/50' : 'bg-slate-100'
                                                                } ${card.rarity === 'legendary' ? 'ring-2 ring-amber-500/50' :
                                                                    card.rarity === 'epic' ? 'ring-2 ring-purple-500/50' : ''}`}
                                                            >
                                                                {card.icon}
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-sm font-black truncate">{card.name}</span>
                                                                    <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${card.rarity === 'legendary' ? 'bg-amber-500/20 text-amber-500' :
                                                                            card.rarity === 'epic' ? 'bg-purple-500/20 text-purple-500' :
                                                                                card.rarity === 'rare' ? 'bg-blue-500/20 text-blue-500' :
                                                                                    'bg-slate-500/20 text-slate-500'
                                                                        }`}>
                                                                        {rarity.label}
                                                                    </span>
                                                                </div>
                                                                <p className="text-[11px] opacity-60 leading-tight mb-2">{card.description}</p>

                                                                <div className="flex items-center gap-2">
                                                                    {card.cost > 0 ? (
                                                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 ${canAfford ? 'bg-amber-500/20 text-amber-500' : 'bg-red-500/20 text-red-500'
                                                                            }`}>
                                                                            <Zap size={10} />
                                                                            {card.cost} Cap
                                                                        </span>
                                                                    ) : card.specialCost ? (
                                                                        <span className="text-[10px] font-black px-2 py-1 rounded-full bg-red-500/20 text-red-500 flex items-center gap-1">
                                                                            {card.specialCost.economy && <>Econ {card.specialCost.economy}</>}
                                                                            {card.specialCost.society && <>, Social {card.specialCost.society}</>}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-[10px] font-black px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-500">
                                                                            Grátis
                                                                        </span>
                                                                    )}

                                                                    {card.type === 'shield' && (
                                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 flex items-center gap-1">
                                                                            <Shield size={10} /> {card.effect.duration}T
                                                                        </span>
                                                                    )}
                                                                    {card.type === 'multiplier' && (
                                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 flex items-center gap-1">
                                                                            <Sparkles size={10} /> x{card.effect.multiplier} por {card.effect.duration}T
                                                                        </span>
                                                                    )}
                                                                    {card.type === 'capitalDiscount' && (
                                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 flex items-center gap-1">
                                                                            <Zap size={10} /> -50% custo {card.effect.duration}T
                                                                        </span>
                                                                    )}
                                                                    {card.type === 'emergency' && (
                                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 flex items-center gap-1">
                                                                            <Star size={10} /> Salva-vidas
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {canAfford && (
                                                                <div className="flex-shrink-0 self-center">
                                                                    <CreditCard size={18} className={`text-${rarity.color}-500 group-hover:scale-110 transition-transform`} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.button>
                                                </motion.div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* INVENTÁRIO DE EFEITOS ATIVOS */}
                <AnimatePresence>
                    {showInventory && activeEffects.length > 0 && (
                        <motion.div
                            key="inventory"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mb-4"
                        >
                            <div className={`rounded-3xl border shadow-2xl overflow-hidden ${isDark ? 'bg-slate-900/95 border-emerald-500/30' : 'bg-white/95 border-emerald-500/30'
                                }`}>
                                <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 overflow-hidden">
                                    <div className="relative flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Shield size={18} className="text-white" />
                                            <span className="text-sm font-black uppercase tracking-widest text-white">
                                                Efeitos Ativos
                                            </span>
                                        </div>
                                        <button onClick={() => setShowInventory(false)} className="p-1 rounded-lg bg-white/20 text-white">
                                            <X size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 space-y-2">
                                    {activeEffects.map((eff) => (
                                        <motion.div
                                            key={eff.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`p-3 rounded-xl border flex items-center gap-3 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                                                }`}
                                        >
                                            <span className="text-2xl">{eff.icon}</span>
                                            <div className="flex-1">
                                                <div className="text-xs font-black">{eff.name}</div>
                                                <div className="text-[10px] opacity-60">
                                                    {eff.type === 'shield' && `Protege ${eff.stat} (mín ${eff.minProtection}%)`}
                                                    {eff.type === 'multiplier' && `Ganhos x${eff.multiplier}`}
                                                    {eff.type === 'capitalDiscount' && `Custo capital -50%`}
                                                    {eff.type === 'emergency' && `Previne game over`}
                                                </div>
                                            </div>
                                            {eff.turnsLeft < 999 ? (
                                                <div className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${eff.turnsLeft <= 1 ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400'
                                                    }`}>
                                                    <Timer size={10} />
                                                    {eff.turnsLeft}T
                                                </div>
                                            ) : (
                                                <div className="px-2 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400">
                                                    ∞
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">

                    {showBriefing ? (
                        <motion.div
                            key="briefing"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className={`p-8 rounded-[3rem] border shadow-2xl text-center relative overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                                }`}
                        >
                            {/* Fundo gradiente animado */}
                            <motion.div
                                className="absolute inset-0 opacity-5"
                                animate={{
                                    background: [
                                        'radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)',
                                        'radial-gradient(circle at 100% 100%, #8b5cf6 0%, transparent 50%)',
                                        'radial-gradient(circle at 0% 100%, #10b981 0%, transparent 50%)',
                                        'radial-gradient(circle at 100% 0%, #f59e0b 0%, transparent 50%)',
                                        'radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)'
                                    ]
                                }}
                                transition={{ duration: 8, repeat: Infinity }}
                            />

                            <motion.div
                                className="flex justify-center mb-6"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                            >
                                {tutorialSteps[briefingStep].icon}
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-2xl font-black mb-4 uppercase tracking-tight bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent"
                            >
                                {tutorialSteps[briefingStep].title}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-sm opacity-70 leading-relaxed mb-10 min-h-[80px]"
                            >
                                {tutorialSteps[briefingStep].desc}
                            </motion.p>

                            {/* Indicadores de progresso */}
                            <div className="flex gap-2 mb-8 justify-center">
                                {tutorialSteps.map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={`h-2 rounded-full transition-all ${i === briefingStep
                                                ? 'w-8 bg-gradient-to-r from-indigo-500 to-violet-500'
                                                : i < briefingStep
                                                    ? 'w-2 bg-indigo-500/50'
                                                    : 'w-2 bg-slate-700'
                                            }`}
                                        animate={i === briefingStep ? {
                                            scale: [1, 1.2, 1]
                                        } : {}}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                ))}
                            </div>

                            <motion.button
                                onClick={() => briefingStep < tutorialSteps.length - 1 ? setBriefingStep(s => s + 1) : setShowBriefing(false)}
                                className="w-full py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-lg relative overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Efeito de brilho */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                />

                                <span className="relative z-10">
                                    {briefingStep === tutorialSteps.length - 1 ? "Assumir o Comando" : "Continuar"}
                                </span>
                                <ArrowRight size={18} className="relative z-10" />
                            </motion.button>
                        </motion.div>
                    ) : (
                        <>
                            {gameState === 'playing' && (
                                <motion.div key="scen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                    <motion.div
                                        className={`relative overflow-hidden rounded-[2.5rem] border shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                                        layout
                                    >
                                        {/* Header do cenário com efeito de brilho */}
                                        <div className="relative bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 overflow-hidden">
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                animate={{ x: ['-100%', '200%'] }}
                                                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                                            />
                                            <div className="relative flex items-center gap-2">
                                                <MapPin size={14} className="text-indigo-200" />
                                                <span className="text-xs font-black uppercase tracking-widest text-white">
                                                    {currentScenario.region}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 md:p-8">
                                            <div className="flex items-center gap-2 mb-3">
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-widest border border-indigo-500/30"
                                                >
                                                    {currentScenario.category}
                                                </motion.span>
                                            </div>

                                            <motion.h2
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-2xl font-black leading-tight mb-4 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent"
                                            >
                                                {currentScenario.title}
                                            </motion.h2>

                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="text-sm opacity-70 mb-8 font-medium leading-relaxed"
                                            >
                                                {currentScenario.description}
                                            </motion.p>

                                            <div className="space-y-3">
                                                {currentScenario.options.map((opt, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 * idx }}
                                                        className="relative"
                                                    >
                                                        <motion.button
                                                            onClick={() => handleChoice(opt)}
                                                            onFocus={() => setHoveredOption(opt)}
                                                            onBlur={() => setHoveredOption(null)}
                                                            onTouchStart={() => setHoveredOption(opt)}
                                                            onTouchEnd={() => setHoveredOption(null)}
                                                            onHoverStart={() => setHoveredOption(opt)}
                                                            onHoverEnd={() => setHoveredOption(null)}
                                                            className={`w-full group p-5 rounded-2xl border text-left transition-all active:scale-[0.96] flex items-start justify-between relative overflow-hidden ${isDark ? 'bg-slate-800/40 border-slate-700 hover:border-indigo-500 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:border-indigo-500 hover:bg-white'
                                                                }`}
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            {/* Efeito de brilho no hover */}
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent"
                                                                initial={{ x: '-100%' }}
                                                                whileHover={{ x: '100%' }}
                                                                transition={{ duration: 0.6 }}
                                                            />

                                                            <div className="flex-1 pr-4 relative z-10">
                                                                <span className="text-sm font-bold block mb-2">{opt.text}</span>

                                                                {/* Preview de impacto */}
                                                                {hoveredOption === opt && (
                                                                    <motion.div
                                                                        initial={{ opacity: 0, height: 0 }}
                                                                        animate={{ opacity: 1, height: 'auto' }}
                                                                        className="flex gap-2 mt-2 flex-wrap"
                                                                    >
                                                                        {(() => {
                                                                            const { modifiedImpact, capitalCostMultiplier } = applyActiveEffectsToImpact(opt.impact, activeEffects);
                                                                            const capCost = Math.round(8 * capitalCostMultiplier);
                                                                            return (
                                                                                <>
                                                                                    {modifiedImpact.economy !== 0 && (
                                                                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 ${modifiedImpact.economy > 0 ? 'bg-blue-500/20 text-blue-500' : 'bg-red-500/20 text-red-500'
                                                                                            }`}>
                                                                                            <TrendingUp size={10} />
                                                                                            Econ {modifiedImpact.economy > 0 ? '+' : ''}{modifiedImpact.economy}
                                                                                            {modifiedImpact.economy !== opt.impact.economy && <Sparkles size={8} className="ml-0.5 text-purple-400" />}
                                                                                        </span>
                                                                                    )}
                                                                                    {modifiedImpact.society !== 0 && (
                                                                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 ${modifiedImpact.society > 0 ? 'bg-rose-500/20 text-rose-500' : 'bg-red-500/20 text-red-500'
                                                                                            }`}>
                                                                                            <Users size={10} />
                                                                                            Social {modifiedImpact.society > 0 ? '+' : ''}{modifiedImpact.society}
                                                                                            {modifiedImpact.society !== opt.impact.society && <Sparkles size={8} className="ml-0.5 text-purple-400" />}
                                                                                        </span>
                                                                                    )}
                                                                                    {modifiedImpact.environment !== 0 && (
                                                                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 ${modifiedImpact.environment > 0 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'
                                                                                            }`}>
                                                                                            <Leaf size={10} />
                                                                                            Amb {modifiedImpact.environment > 0 ? '+' : ''}{modifiedImpact.environment}
                                                                                            {modifiedImpact.environment !== opt.impact.environment && <Sparkles size={8} className="ml-0.5 text-purple-400" />}
                                                                                        </span>
                                                                                    )}
                                                                                    <span className={`text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 ${capCost < 8 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                                                                                        }`}>
                                                                                        <Zap size={10} />
                                                                                        -{capCost} Cap
                                                                                        {capCost < 8 && <Sparkles size={8} className="ml-0.5 text-purple-400" />}
                                                                                    </span>
                                                                                </>
                                                                            );
                                                                        })()}
                                                                    </motion.div>
                                                                )}
                                                            </div>

                                                            <ChevronRight size={20} className="text-indigo-500 group-hover:translate-x-1 transition-transform relative z-10" />
                                                        </motion.button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Active cards (aparecem abaixo do questionário) */}
                                    <div className="tm-cards-wrap mt-4">
                                        <div className="tm-cards-scroll flex gap-3 overflow-x-auto py-2 px-1">
                                            {activeEffects.length === 0 ? (
                                                <div className="text-xs opacity-50 px-3">Nenhuma carta ativa</div>
                                            ) : (
                                                activeEffects.map((eff, i) => (
                                                    <motion.div
                                                        key={eff.id || `${eff.type}-${i}`}
                                                        className="tm-card tm-card--sm flex-shrink-0"
                                                        initial={{ opacity: 0, y: 6 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        whileHover={{ y: -8 }}
                                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                        onClick={() => setShowInventory(true)}
                                                        role="button"
                                                        tabIndex={0}
                                                        aria-label={`Efeito ativo: ${eff.name}`}
                                                    >
                                                        <div className="imgbox">
                                                            <div className="img" style={{ background: eff.bg || undefined }}>
                                                                <div className="tm-card-icon">{eff.icon}</div>
                                                            </div>
                                                        </div>

                                                        <div className="details">
                                                            <h3 className="title">{eff.name}</h3>
                                                            <span className="caption">{eff.turnsLeft && eff.turnsLeft < 999 ? `${eff.turnsLeft}T` : (eff.type || 'Passivo')}</span>
                                                        </div>
                                                    </motion.div>
                                                ))
                                            )}
                                        </div>

                                  

                                        {/* Recentemente usadas */}
                                        <div className="mt-3 text-xs font-black uppercase text-slate-400 px-2">Usadas</div>
                                        <div className="tm-cards-scroll flex gap-3 overflow-x-auto py-3 px-1">
                                            {usedCards.length === 0 ? (
                                                <div className="text-xs opacity-40 px-3">Sem cartas usadas recentemente</div>
                                            ) : (
                                                usedCards.map((card, i) => (
                                                    <motion.div key={`used-${card.id}-${i}`} className="tm-card tm-card--sm tm-card--recent flex-shrink-0" initial={{ opacity: 0.6, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                                                        <div className="imgbox">
                                                            <div className="img" style={{ background: card.bg || 'linear-gradient(45deg,#f97316,#fb7185)' }}>
                                                                <div className="tm-card-icon">{card.icon}</div>
                                                            </div>
                                                        </div>
                                                        <div className="details">
                                                            <h3 className="title">{card.name}</h3>
                                                            <span className="caption">Usada</span>
                                                        </div>
                                                    </motion.div>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Histórico de decisões recentes */}
                                    {history.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200'}`}
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <Activity size={14} className="text-slate-500" />
                                                <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                                                    Últimas Decisões
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                {history.slice(0, 3).map((h, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className={`text-xs p-2 rounded-lg ${isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'
                                                            }`}
                                                    >
                                                        <div className="font-bold opacity-80 mb-1">{h.region}</div>
                                                        <div className="text-[10px] opacity-60">{h.choice}</div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {gameState === 'feedback' && (
                                <motion.div key="feed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">

                                    {activeAlert && (
                                        <motion.div
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className={`p-5 rounded-2xl flex items-center gap-3 border-l-4 shadow-lg backdrop-blur-xl relative overflow-hidden ${activeAlert.type === 'danger'
                                                    ? 'bg-red-500/20 border-red-500 text-red-500'
                                                    : 'bg-amber-500/20 border-amber-500 text-amber-500'
                                                }`}
                                        >
                                            {/* Efeito de pulso de fundo */}
                                            <motion.div
                                                className="absolute inset-0 bg-current opacity-10"
                                                animate={{ scale: [1, 1.05, 1] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            />

                                            <motion.div
                                                animate={{
                                                    rotate: [0, 10, -10, 0],
                                                    scale: [1, 1.1, 1]
                                                }}
                                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                                            >
                                                <Bell size={24} />
                                            </motion.div>

                                            <p className="text-xs font-black uppercase tracking-tight leading-tight flex-1">
                                                {activeAlert.msg}
                                            </p>
                                        </motion.div>
                                    )}

                                    <motion.div
                                        className={`p-8 rounded-[3rem] border shadow-2xl text-center relative overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                                            }`}
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                    >
                                        {/* Confetes animados */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            {[...Array(8)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className={`absolute w-2 h-2 rounded-sm ${i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-emerald-500' : 'bg-amber-500'
                                                        }`}
                                                    initial={{
                                                        top: '50%',
                                                        left: '50%',
                                                        opacity: 1,
                                                        scale: 0
                                                    }}
                                                    animate={{
                                                        top: `${Math.random() * 100}%`,
                                                        left: `${Math.random() * 100}%`,
                                                        opacity: 0,
                                                        scale: 1,
                                                        rotate: Math.random() * 360
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        delay: i * 0.1
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        <motion.div
                                            className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                rotate: [0, 5, -5, 0]
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <CheckCircle2 size={48} className="text-white" />
                                        </motion.div>

                                        <motion.h3
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-2xl font-black uppercase mb-4 bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent"
                                        >
                                            Decisão Implementada
                                        </motion.h3>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className={`p-6 rounded-2xl mb-8 relative overflow-hidden ${isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'
                                                }`}
                                        >
                                            <Sparkles size={16} className="absolute top-2 right-2 text-amber-500" />
                                            <p className="text-sm italic opacity-90 leading-relaxed">
                                                "{lastChoice.feedback}"
                                            </p>
                                        </motion.div>

                                        {/* Mudanças nos stats */}
                                        {lastChoice && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="grid grid-cols-4 gap-2 mb-8"
                                            >
                                                {Object.entries(lastChoice.appliedImpact || lastChoice.impact).map(([key, value]) => {
                                                    if (value === 0) return null;
                                                    const colors = {
                                                        economy: 'blue',
                                                        society: 'rose',
                                                        environment: 'emerald'
                                                    };
                                                    const labels = {
                                                        economy: 'Econ',
                                                        society: 'Social',
                                                        environment: 'Amb'
                                                    };
                                                    return (
                                                        <div
                                                            key={key}
                                                            className={`p-3 rounded-xl ${value > 0
                                                                    ? `bg-${colors[key]}-500/10 border border-${colors[key]}-500/30`
                                                                    : 'bg-red-500/10 border border-red-500/30'
                                                                }`}
                                                        >
                                                            <div className={`text-xs font-bold mb-1 ${value > 0 ? `text-${colors[key]}-500` : 'text-red-500'
                                                                }`}>
                                                                {labels[key]}
                                                            </div>
                                                            <div className={`text-lg font-black flex items-center justify-center gap-1 ${value > 0 ? `text-${colors[key]}-500` : 'text-red-500'
                                                                }`}>
                                                                {value > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                                                {value > 0 ? '+' : ''}{value}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                                                    <div className="text-xs font-bold mb-1 text-amber-500">Cap</div>
                                                    <div className="text-lg font-black flex items-center justify-center gap-1 text-amber-500">
                                                        <Minus size={16} />
                                                        {lastChoice.capitalCost || 8}
                                                        {lastChoice.capitalCost && lastChoice.capitalCost < 8 && (
                                                            <span className="text-[8px] ml-1 text-emerald-400">⚡</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        <motion.button
                                            onClick={nextTurn}
                                            className="w-full py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-lg"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span>Próxima Semana</span>
                                            <ArrowRight size={18} />
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            )}

                            {gameState === 'gameover' && (
                                <motion.div
                                    key="go"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <motion.div
                                        className="p-8 rounded-[3rem] border-2 border-red-500/40 bg-red-500/5 backdrop-blur-md shadow-2xl relative overflow-hidden"
                                        animate={{
                                            boxShadow: [
                                                '0 0 20px rgba(239, 68, 68, 0.2)',
                                                '0 0 40px rgba(239, 68, 68, 0.4)',
                                                '0 0 20px rgba(239, 68, 68, 0.2)'
                                            ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {/* Efeito de rachadura */}
                                        <div className="absolute inset-0 opacity-10">
                                            <svg className="w-full h-full" viewBox="0 0 200 200">
                                                <motion.path
                                                    d="M100 0 L110 50 L100 100 L90 150 L100 200"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    fill="none"
                                                    className="text-red-500"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ duration: 1 }}
                                                />
                                                <motion.path
                                                    d="M0 100 L50 110 L100 100 L150 90 L200 100"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    fill="none"
                                                    className="text-red-500"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ duration: 1, delay: 0.3 }}
                                                />
                                            </svg>
                                        </div>

                                        <motion.div
                                            animate={{
                                                rotate: [0, -5, 5, -5, 0],
                                                scale: [1, 1.1, 1]
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <ShieldAlert size={64} className="text-red-500 mx-auto mb-6" />
                                        </motion.div>

                                        <motion.h2
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-3xl font-black text-red-500 uppercase mb-2"
                                        >
                                            Governo Colapsado
                                        </motion.h2>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className={`inline-block px-4 py-2 rounded-full mb-6 ${isDark ? 'bg-slate-800/50' : 'bg-white/50'
                                                }`}
                                        >
                                            <span className="text-sm font-black">
                                                Duração: {turn} {turn === 1 ? 'Semana' : 'Semanas'}
                                            </span>
                                        </motion.div>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-sm font-bold mb-8 px-4 leading-relaxed"
                                        >
                                            {getGameOverMessage(stats)}
                                        </motion.p>

                                        {/* Stats finais */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="grid grid-cols-4 gap-3 mb-8"
                                        >
                                            <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white/50'}`}>
                                                <TrendingUp size={16} className="mx-auto mb-1 text-blue-500" />
                                                <div className="text-xs font-bold text-blue-500 mb-1">Econ</div>
                                                <div className="text-lg font-black">{stats.economy}%</div>
                                            </div>
                                            <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white/50'}`}>
                                                <Users size={16} className="mx-auto mb-1 text-rose-500" />
                                                <div className="text-xs font-bold text-rose-500 mb-1">Social</div>
                                                <div className="text-lg font-black">{stats.society}%</div>
                                            </div>
                                            <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white/50'}`}>
                                                <Leaf size={16} className="mx-auto mb-1 text-emerald-500" />
                                                <div className="text-xs font-bold text-emerald-500 mb-1">Amb</div>
                                                <div className="text-lg font-black">{stats.environment}%</div>
                                            </div>
                                            <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white/50'}`}>
                                                <Zap size={16} className="mx-auto mb-1 text-amber-500" />
                                                <div className="text-xs font-bold text-amber-500 mb-1">Cap</div>
                                                <div className="text-lg font-black">{stats.politicalCapital}%</div>
                                            </div>
                                        </motion.div>

                                        {/* Badges conquistadas */}
                                        {earnedBadges.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className={`p-4 rounded-2xl mb-6 ${isDark ? 'bg-slate-800/50' : 'bg-white/50'}`}
                                            >
                                                <div className="flex items-center justify-center gap-2 mb-3">
                                                    <Award size={16} className="text-amber-500" />
                                                    <span className="text-xs font-black uppercase text-amber-500">
                                                        Conquistas Desbloqueadas
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 justify-center">
                                                    {earnedBadges.slice(0, 6).map((badgeId, i) => {
                                                        const badge = TERRITORY_BADGES.find(b => b.id === badgeId);
                                                        return (
                                                            <motion.div
                                                                key={badgeId}
                                                                initial={{ scale: 0, rotate: -180 }}
                                                                animate={{ scale: 1, rotate: 0 }}
                                                                transition={{ delay: 0.6 + i * 0.1 }}
                                                                className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xs font-bold shadow-lg"
                                                                title={badge?.name}
                                                            >
                                                                {badge?.icon || '🏆'}
                                                            </motion.div>
                                                        );
                                                    })}
                                                    {earnedBadges.length > 6 && (
                                                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                                                            +{earnedBadges.length - 6}
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}

                                        <motion.button
                                            onClick={handleRestart}
                                            className="w-full py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-black rounded-2xl uppercase text-xs shadow-lg flex items-center justify-center gap-2"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <RotateCcw size={18} />
                                            <span>Tentar Novamente</span>
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </main>

            {/* Floating shop FAB — fixed and guaranteed on top (high z-index) */}
            {/* Persistent map-road (bottom) */}
            <MapRoad totalTurns={MANDATE_TURNS} currentTurn={turn} timelineEvents={timelineEvents} statsHistory={statsHistory} isDark={isDark} />

            <motion.button
                onClick={() => { setShowShop(s => !s); setShowInventory(false); setShowFullHeader(false); }}
                aria-label="Abrir loja"
                aria-expanded={showShop}
                title="Loja de Cartas"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.96 }}
                style={{ right: '1rem', bottom: showShop ? 'calc(env(safe-area-inset-bottom, 12px) + 190px)' : 'calc(env(safe-area-inset-bottom, 12px) + 117px)', zIndex: 9999, pointerEvents: 'auto' }}
                className="fixed w-16 h-16 rounded-full bg-violet-600 text-white shadow-2xl flex items-center justify-center ring-1 ring-inset ring-black/10 focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-200"
            >
                <div className="relative pointer-events-none">
                    <ShoppingBag size={20} />
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-violet-600 border border-white/20 pointer-events-auto">{shopCards.length}/{shopSlots}</span>
                </div>
            </motion.button>

        </div>
    );
};