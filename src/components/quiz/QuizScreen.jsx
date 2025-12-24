import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react'; // Importei ArrowRight
import { ThemeToggle } from '../common/ThemeToggle';
import { ProgressBar } from '../common/ProgressBar';
import { QuestionCard } from './QuestionCard';
import { SubjectDetails } from '../subjects/SubjectDetails'; // Importando o componente rico

export const QuizScreen = ({
    activeSubject,
    quizStep,
    isDark,
    toggleTheme,
    setView,
    answerFeedback,
    handleAnswer,
    handleNext // <--- NOVA PROP: O Capitão decide quando avançar
}) => {
    const [showStudyMaterial, setShowStudyMaterial] = useState(false);

    useEffect(() => {
        setShowStudyMaterial(false);
    }, [quizStep]);

    const currentQuestion = activeSubject.questions[quizStep];
    const isWrong = answerFeedback?.status === 'error' || answerFeedback?.status === 'wrong';

    if (showStudyMaterial) {
        return (
            <div className="h-full flex flex-col">
                <button
                    onClick={() => setShowStudyMaterial(false)}
                    className={`mb-4 flex items-center gap-2 font-bold hover:underline ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}
                >
                    <ArrowLeft size={20} />
                    Voltar para o Quiz
                </button>
                <SubjectDetails
                    subject={activeSubject}
                    isDark={isDark}
                    onClose={() => setShowStudyMaterial(false)}
                />
            </div>
        );
    }

    return (
        <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 h-full pb-8">
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={() => setView('subjects')}
                    className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    <ChevronRight className="rotate-180" size={14} /> Desistir
                </button>
                <div className="flex items-center gap-3">
                    <ThemeToggle isDark={isDark} toggle={toggleTheme} />
                    <span className="text-indigo-500 text-xs font-bold bg-indigo-500/10 px-3 py-1 rounded-full">
                        {activeSubject.category}
                    </span>
                </div>
            </div>

            <div className={`p-1 rounded-full mb-6 ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
                <ProgressBar current={quizStep + 1} total={activeSubject.questions.length} color="indigo" />
            </div>

            <div className="min-h-[120px] flex items-center justify-center text-center">
                <AnimatePresence mode="wait">
                    <motion.h2
                        key={quizStep}
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                        className={`text-xl md:text-2xl font-medium leading-relaxed ${isDark ? 'text-slate-100' : 'text-slate-800'}`}
                    >
                        {currentQuestion.q}
                    </motion.h2>
                </AnimatePresence>
            </div>

            <div className="space-y-3 mt-4">
                {currentQuestion.a.map((option, idx) => (
                    <QuestionCard
                        key={`${quizStep}-${idx}`}
                        option={option}
                        idx={idx}
                        isDark={isDark}
                        status={answerFeedback?.index === idx ? answerFeedback.status : null}
                        onClick={() => handleAnswer(idx)}
                        isDisabled={!!answerFeedback}
                    />
                ))}
            </div>

            {/* Controles pós-erro */}
            <AnimatePresence>
                {isWrong && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6"
                    >
                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 mb-4 text-center">
                            <p className="text-rose-500 font-bold mb-1">
                                Resposta Incorreta
                            </p>
                            <p className="text-sm text-rose-400">
                                A opção selecionada não está correta. Como deseja prosseguir?
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => setShowStudyMaterial(true)}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
                            >
                                <BookOpen size={20} />
                                Consultar Material
                            </button>

                            <button
                                onClick={handleNext}
                                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-3 border transition-all active:scale-[0.98] ${isDark
                                        ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                                        : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                                    }`}
                            >
                                <span className="uppercase text-xs tracking-widest">Pular e Seguir</span>
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};