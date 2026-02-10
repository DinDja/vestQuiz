import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, Award, BarChart,
    Play, Pause, ChevronLeft, ChevronRight,
    CheckCircle2, XCircle, Timer, AlertTriangle, Save
} from 'lucide-react';
import { SUBJECTS } from '../../constants/subjects';
import { db, auth } from '../../firebase'; // Verifique se o caminho da lib está certo
// ADICIONADO: doc, updateDoc, increment
import { collection, addDoc, query, where, getDocs, orderBy, limit, doc, updateDoc, increment } from 'firebase/firestore';

const SIMULATED_CONFIGS = [
    // ... suas configs (mantidas iguais)
    {
        id: 'mini-simulado',
        name: 'Mini Simulado',
        description: '10 questões rápidas',
        duration: 20,
        questionsCount: 10,
        subjects: ['Exatas', 'Humanas'],
        xpReward: 500
    },
    // ... restante das configs
    {
        id: 'simulado-medio',
        name: 'Simulado Médio',
        description: '45 questões (Dia 1)',
        duration: 90,
        questionsCount: 45,
        subjects: ['Exatas', 'Humanas', 'Linguagens'],
        xpReward: 1500
    },
    {
        id: 'simulado-completo',
        name: 'Simulado Completo',
        description: '90 questões (Full)',
        duration: 180,
        questionsCount: 90,
        subjects: ['Exatas', 'Humanas', 'Linguagens', 'Biológicas'],
        xpReward: 3000
    },
    {
        id: 'focado-matematica',
        name: 'Matemática Pura',
        description: '20 questões de Exatas',
        duration: 40,
        questionsCount: 20,
        subjects: ['Exatas'],
        xpReward: 800
    }
];

export const SimulatedScreen = ({
    userData,
    isDark,
    setView,
    updateProgress
}) => {
    // ... estados (mantidos iguais)
    const [viewState, setViewState] = useState('list');
    const [selectedSimulated, setSelectedSimulated] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(0);

    const [stats, setStats] = useState({
        totalSimulations: 0,
        highestScore: 0,
        averageAccuracy: 0,
        totalTime: 0
    });

    useEffect(() => {
        fetchSimulationStats();
    }, []);

    const fetchSimulationStats = async () => {
        if (!auth.currentUser) return;

        try {
            const q = query(
                collection(db, 'users', auth.currentUser.uid, 'simulations'),
                orderBy('date', 'desc')
            );

            const querySnapshot = await getDocs(q);
            const simulations = querySnapshot.docs.map(doc => doc.data());

            if (simulations.length > 0) {
                const total = simulations.length;
                const maxScore = Math.max(...simulations.map(s => s.score));
                const avgAcc = simulations.reduce((acc, curr) => acc + (curr.correctAnswers / curr.totalQuestions), 0) / total;

                setStats({
                    totalSimulations: total,
                    highestScore: Math.round(maxScore),
                    averageAccuracy: Math.round(avgAcc * 100),
                    totalTime: 0
                });
            }
        } catch (error) {
            console.error("Erro ao carregar estatísticas:", error);
        }
    };

    const generateQuestions = (config) => {
        let allQuestions = [];
        const filteredSubjects = SUBJECTS.filter(subject => config.subjects.includes(subject.category));

        filteredSubjects.forEach(subject => {
            subject.questions.forEach(q => {
                allQuestions.push({ ...q, subjectName: subject.title, category: subject.category });
            });
        });

        // Embaralha ordem das questões e alternativas de cada uma
        return [...allQuestions].sort(() => Math.random() - 0.5).slice(0, config.questionsCount).map(q => {
            const answers = q.a.map((text, originalIdx) => ({ text, originalIdx }));
            for (let i = answers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answers[i], answers[j]] = [answers[j], answers[i]];
            }
            const newCorrectIdx = answers.findIndex(a => a.originalIdx === q.correct);
            return { ...q, a: answers.map(a => a.text), correct: newCorrectIdx };
        });
    };

    const startSimulated = (config) => {
        const generated = generateQuestions(config);
        if (generated.length === 0) {
            alert("Sem questões suficientes no banco de dados para este simulado.");
            return;
        }
        setQuestions(generated);
        setSelectedSimulated(config);
        setTimeLeft(config.duration * 60);
        setCurrentQuestion(0);
        setAnswers(new Array(generated.length).fill(null));
        setViewState('active');
        setIsPaused(false);
    };

    // --- AQUI ESTÁ A MUDANÇA PRINCIPAL ---
    const handleFinish = async () => {
        setIsSaving(true);

        // Cálculos
        const correctCount = answers.filter((ans, idx) => ans === questions[idx]?.correct).length;
        const score = (correctCount / questions.length) * 1000;
        const timeSpent = (selectedSimulated.duration * 60) - timeLeft;

        const resultData = {
            simulatedId: selectedSimulated.id,
            simulatedName: selectedSimulated.name,
            date: new Date().toISOString(),
            score: Math.round(score),
            correctAnswers: correctCount,
            totalQuestions: questions.length,
            timeSpent,
        };

        if (auth.currentUser) {
            try {
                // 1. Salvar o resultado na subcoleção 'simulations'
                await addDoc(collection(db, 'users', auth.currentUser.uid, 'simulations'), resultData);

                // 2. Atualizar o XP na raiz do usuário (/users/{userId})
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                    xp: increment(selectedSimulated.xpReward) // Soma atomicamente
                });

                // 3. Atualizar estado local (Visual)
                updateProgress(selectedSimulated.xpReward);
                
            } catch (error) {
                console.error("Erro ao salvar simulado e atualizar XP:", error);
                alert("Erro ao salvar resultado. Verifique sua conexão.");
            }
        }

        setIsSaving(false);
        setViewState('result');
        fetchSimulationStats();
    };

    // ... Resto do código (Timer, Renderizadores, JSX) mantido igual ...
    // Timer
    useEffect(() => {
        if (viewState !== 'active' || isPaused) return;
        if (timeLeft <= 0) {
            handleFinish();
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, viewState, isPaused]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (viewState === 'result') {
         const correctCount = answers.filter((ans, idx) => ans === questions[idx]?.correct).length;
         const percentage = Math.round((correctCount / questions.length) * 100);
 
         return (
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full items-center justify-center p-6 text-center">
                 <div className={`p-8 rounded-3xl border w-full max-w-md ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`}>
                     <div className="mb-6 inline-flex p-4 rounded-full bg-indigo-500/10 text-indigo-500">
                         <Award size={48} />
                     </div>
 
                     <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Simulado Concluído!</h2>
                     <p className="text-slate-500 mb-8">Você finalizou o {selectedSimulated.name}</p>
 
                     <div className="grid grid-cols-2 gap-4 mb-8">
                         <div className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                             <div className="text-3xl font-black text-emerald-500">{correctCount}</div>
                             <div className="text-xs font-bold uppercase text-slate-500">Acertos</div>
                         </div>
                         <div className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                             <div className="text-3xl font-black text-indigo-500">{percentage}%</div>
                             <div className="text-xs font-bold uppercase text-slate-500">Precisão</div>
                         </div>
                     </div>
 
                     <button
                         onClick={() => setViewState('list')}
                         className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/20"
                     >
                         Voltar ao Menu
                     </button>
                 </div>
             </motion.div>
         );
     }

    if (viewState === 'active') {
        const progress = ((currentQuestion + 1) / questions.length) * 100;

        return (
            <div className={`fixed inset-0 z-50 flex flex-col ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
                {/* Top Bar Mobile */}
                <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsPaused(!isPaused)} className={`p-2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                            {isPaused ? <Play size={20} className="text-emerald-500" /> : <Pause size={20} className="text-slate-500" />}
                        </button>
                        <div className={`flex items-center gap-2 font-mono font-bold text-xl ${timeLeft < 300 ? 'text-rose-500 animate-pulse' : isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                            <Timer size={20} />
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                    <button
                        onClick={handleFinish}
                        disabled={isSaving}
                        className="text-xs font-bold text-rose-500 px-3 py-1.5 rounded-lg border border-rose-500/30 hover:bg-rose-500/10"
                    >
                        {isSaving ? 'Salvando...' : 'Finalizar'}
                    </button>
                </div>

                {/* Barra de Progresso */}
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800">
                    <motion.div
                        className="h-full bg-indigo-500"
                        animate={{ width: `${progress}%` }}
                    />
                </div>

                {/* Área de Questão (Scrollável) */}
                <div className="flex-1 overflow-y-auto p-5 pb-32">
                    {isPaused ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-50">
                            <Pause size={64} className="mb-4 text-slate-500" />
                            <p>Simulado Pausado</p>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-bold px-2 py-1 rounded bg-indigo-500/10 text-indigo-500">
                                    Questão {currentQuestion + 1}
                                </span>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>
                                    {questions[currentQuestion]?.category}
                                </span>
                            </div>

                            <h3 className={`text-lg md:text-xl font-medium leading-relaxed mb-8 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                                {questions[currentQuestion]?.q}
                            </h3>

                            <div className="space-y-3">
                                {questions[currentQuestion]?.a.map((option, idx) => {
                                    const isSelected = answers[currentQuestion] === idx;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                const newAnswers = [...answers];
                                                newAnswers[currentQuestion] = idx;
                                                setAnswers(newAnswers);
                                            }}
                                            className={`w-full text-left p-5 rounded-xl border-2 transition-all active:scale-[0.98] ${isSelected
                                                ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                                                : isDark
                                                    ? 'border-slate-800 bg-slate-900 text-slate-400'
                                                    : 'border-slate-200 bg-white text-slate-600 shadow-sm'
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${isSelected ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-400'
                                                    }`}>
                                                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                                </div>
                                                <span className={`text-sm md:text-base font-medium ${isSelected ? (isDark ? 'text-white' : 'text-indigo-900') : ''}`}>
                                                    {option}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Rodapé de Navegação (Sticky Footer) */}
                {!isPaused && (
                    <div className={`fixed bottom-0 inset-x-0 p-4 border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
                            <button
                                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                                disabled={currentQuestion === 0}
                                className={`p-4 rounded-xl flex-1 flex items-center justify-center gap-2 font-bold ${currentQuestion === 0 ? 'opacity-30' : isDark ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'
                                    }`}
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <button
                                onClick={() => {
                                    if (currentQuestion < questions.length - 1) {
                                        setCurrentQuestion(prev => prev + 1);
                                    } else {
                                        handleFinish();
                                    }
                                }}
                                className={`p-4 rounded-xl flex-[3] flex items-center justify-center gap-2 font-bold text-white shadow-lg transition-transform active:scale-95 ${currentQuestion === questions.length - 1 ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-indigo-600 shadow-indigo-500/20'
                                    }`}
                            >
                                {currentQuestion === questions.length - 1 ? 'Finalizar Prova' : 'Próxima Questão'}
                                {currentQuestion < questions.length - 1 && <ChevronRight size={20} />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // 3. TELA DE LISTA (Menu Principal)
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-20">
            <header>
                <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Simulados
                </h1>
                <p className="text-slate-500 text-sm">
                    Escolha um modo de prova e prepare-se para o dia oficial.
                </p>
            </header>

            {/* Stats Cards (Grid Responsivo) */}
            <div className="grid grid-cols-2 gap-3">
                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-slate-500 text-xs font-bold uppercase mb-1">Realizados</div>
                    <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {stats.totalSimulations}
                    </div>
                </div>
                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-slate-500 text-xs font-bold uppercase mb-1">Precisão Média</div>
                    <div className="text-2xl font-black text-emerald-500">
                        {stats.averageAccuracy}%
                    </div>
                </div>
            </div>

            {/* Lista de Simulados */}
            <div className="space-y-3">
                <h3 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Modos de Prova
                </h3>
                {SIMULATED_CONFIGS.map((simulated) => (
                    <button
                        key={simulated.id}
                        onClick={() => startSimulated(simulated)}
                        className={`w-full text-left p-5 rounded-2xl border transition-all active:scale-[0.98] ${isDark
                            ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50'
                            : 'bg-white border-slate-200 shadow-sm hover:border-indigo-300'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {simulated.name}
                                </h3>
                                <p className="text-sm text-slate-500">{simulated.description}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-amber-500/10 text-amber-500' : 'bg-amber-100 text-amber-700'}`}>
                                +{simulated.xpReward} XP
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                            <div className="flex items-center gap-1.5">
                                <Clock size={14} />
                                {simulated.duration} min
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-500" />
                            <div>{simulated.questionsCount} questões</div>
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    );
};