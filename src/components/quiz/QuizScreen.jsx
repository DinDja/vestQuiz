import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  BookOpen, 
  ArrowLeft, 
  ArrowRight, 
  Target, 
  RefreshCw, 
  Home, 
  Award,
  AlertCircle
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { ProgressBar } from '../common/ProgressBar';
import { QuestionCard } from './QuestionCard';
import { SubjectDetails } from '../subjects/SubjectDetails';

export const QuizScreen = ({
    activeSubject,
    quizStep,
    isDark,
    toggleTheme,
    setView,
    answerFeedback,
    handleAnswer,
    quizFinished,
    handleResetQuiz
}) => {
    const [showStudyMaterial, setShowStudyMaterial] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        setShowStudyMaterial(false);
    }, [quizStep]);

    if (!activeSubject || !activeSubject.questions || activeSubject.questions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <AlertCircle className="text-rose-500 mb-4" size={48} />
                <p className="text-rose-500 font-bold text-lg">Rota sem coordenadas!</p>
                <p className="text-slate-500 text-sm mb-6">Nenhuma questão atende aos filtros selecionados.</p>
                <button 
                  onClick={() => setView('subjects')} 
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold"
                >
                  Voltar para Matérias
                </button>
            </div>
        );
    }

    if (quizFinished) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-6 py-12"
            >
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Target size={40} className="text-white" />
                </div>
                <div>
                    <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Maestria Alcançada!
                    </h2>
                    <p className="text-slate-500 mt-2 font-medium">Você concluiu este percurso com sucesso.</p>
                </div>
                <div className="flex flex-col w-full gap-3 pt-6">
                    <button
                        onClick={handleResetQuiz}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-indigo-500/20"
                    >
                        <RefreshCw size={20} />
                        Refazer Missão
                    </button>
                    <button
                        onClick={() => setView('dashboard')}
                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 border transition-all ${
                            isDark ? 'border-slate-800 text-slate-300 bg-slate-900' : 'border-slate-200 text-slate-600 bg-white shadow-sm'
                        }`}
                    >
                        <Home size={20} />
                        Painel de Controle
                    </button>
                </div>
            </motion.div>
        );
    }

    if (!isStarted) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`}
            >
                <div className="flex items-center gap-3 mb-6 text-indigo-500">
                    <div className="p-3 bg-indigo-500/10 rounded-2xl">
                      <Target size={32} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Objetivo de Aprendizagem</h2>
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">DCRB</span>
                    </div>
                </div>
                
                <p className={`text-lg mb-8 leading-relaxed font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    {activeSubject.learningObjective || activeSubject.description}
                </p>

                <div className="space-y-4 mb-8">
                  <div className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'} border border-slate-200/10`}>
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Resumo da Missão</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {activeSubject.questions.length} Desafios Estratégicos
                      </li>
                      <li className="flex items-center gap-2 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Foco em Competências Territoriais
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                    onClick={() => setIsStarted(true)}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg transition-transform active:scale-95 shadow-lg shadow-indigo-500/25"
                >
                    Iniciar Navegação
                </button>
            </motion.div>
        );
    }

    const currentQuestion = activeSubject.questions[quizStep];
    if (!currentQuestion) return null;

    const isWrong = answerFeedback?.status === 'error' || answerFeedback?.status === 'wrong';

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 h-full pb-8">
            {/* Header da Missão */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setView('subjects')}
                    className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-slate-500 hover:text-indigo-500 transition-colors"
                >
                    <ArrowLeft size={16} /> Abandonar
                </button>
                <div className="flex items-center gap-3">
                  <ThemeToggle isDark={isDark} toggle={toggleTheme} />
                  <div className="px-3 py-1 bg-indigo-500/10 rounded-full">
                    <span className="text-indigo-500 text-[10px] font-black uppercase">{activeSubject.category}</span>
                  </div>
                </div>
            </div>

            {/* Progresso & Metadata */}
            <div className="space-y-4">
              <ProgressBar current={quizStep + 1} total={activeSubject.questions.length} color="indigo" />
              
              <div className="flex flex-wrap gap-2">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${isDark ? 'border-slate-800 bg-slate-900 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
                   Dificuldade: <span className="text-indigo-500 uppercase">{currentQuestion.difficulty}</span>
                </span>
                {currentQuestion.skillCode && (
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${isDark ? 'border-slate-800 bg-slate-900 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
                    Skill: <span className="text-emerald-500">{currentQuestion.skillCode}</span>
                  </span>
                )}
                {currentQuestion.bloomLevel && (
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${isDark ? 'border-slate-800 bg-slate-900 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
                    Bloom: <span className="text-amber-500 uppercase">{currentQuestion.bloomLevel}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Pergunta Central */}
            <div className="min-h-[140px] flex items-center justify-center text-center px-2">
              <AnimatePresence mode="wait">
                <motion.h2 
                  key={quizStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`text-xl md:text-2xl font-semibold leading-relaxed ${isDark ? 'text-slate-100' : 'text-slate-800'}`}
                >
                    {currentQuestion.q}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Alternativas */}
            <div className="space-y-3">
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

            {/* Scaffolding (ZDP - Feedback de Apoio) */}
            <AnimatePresence>
              {isWrong && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-6 mt-6 border-t border-slate-200/10 flex flex-col gap-4"
                  >
                      <div className={`p-4 rounded-2xl text-center ${isDark ? 'bg-rose-500/5' : 'bg-rose-50'} border border-rose-500/20`}>
                        <p className="text-rose-500 font-bold text-sm">Ajuste os Instrumentos!</p>
                        <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          O erro faz parte da navegação. Consulte o material para recalibrar seu conhecimento.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setShowStudyMaterial(true)}
                            className="py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 text-sm shadow-lg shadow-indigo-500/20"
                        >
                            <BookOpen size={16} /> Consultar Bússola
                        </button>
                        <button
                            onClick={() => handleResetQuiz()}
                            className={`py-3 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm border ${
                              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
                            }`}
                        >
                            <RefreshCw size={16} /> Reiniciar Trajeto
                        </button>
                      </div>
                  </motion.div>
              )}
            </AnimatePresence>

            {/* Overlay de Material de Estudo */}
            {showStudyMaterial && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[100] p-6 bg-slate-950/95 backdrop-blur-md overflow-y-auto no-scrollbar"
              >
                  <button 
                    onClick={() => setShowStudyMaterial(false)} 
                    className="mb-6 p-3 bg-white/10 rounded-2xl text-white flex items-center gap-2 font-bold"
                  >
                    <ArrowLeft size={20} /> Voltar para a Missão
                  </button>
                  <SubjectDetails subject={activeSubject} isDark={true} onClose={() => setShowStudyMaterial(false)} />
              </motion.div>
            )}
        </motion.div>
    );
};