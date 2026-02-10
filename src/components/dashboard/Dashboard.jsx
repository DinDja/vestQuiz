// src/components/dashboard/Dashboard.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  GraduationCap,
  Trophy,
  Star,
  ChevronRight,
  Flame,
  Target,
  Info,
  X,
  Map,
  Lightbulb,
  Users,
  BrainCircuit,
  Building2 // Novo ícone para o Gestor
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { StatsCards } from './StatsCards';
import { AchievementCollection } from './AchievementCollection';
import { GeoChallengeCard } from './GeoChallengeCard';
import { getLevelData, LEVEL_CONFIG } from '../../constants/levels';
import { PartyPopper } from 'lucide-react';

export const Dashboard = ({
  userData,
  isDark,
  toggleTheme,
  setView,
  badges
}) => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('geo_intro_seen');
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const closeIntro = () => {
    localStorage.setItem('geo_intro_seen', 'true');
    setShowIntro(false);
  };

  const levelInfo = useMemo(() => getLevelData(userData.xp || 0), [userData.xp]);
  const { level, title, progress, cardStyle } = levelInfo;

  const RankIcon = useMemo(() => {
    if (level >= 16) return Star;
    if (level >= 11) return GraduationCap;
    if (level >= 6) return BookOpen;
    return Target;
  }, [level]);

  return (
    <motion.div
      key="dash"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="relative space-y-6 pb-6"
    >
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            style={{zIndex: 99999}}
          >
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               transition={{ type: 'spring', damping: 25, stiffness: 300 }}
               className={`max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} p-6 md:p-8`}
             >
                {/* Header */}
                <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
                        <GraduationCap size={20} className="text-white" />
                      </div>
                      <div>
                        <h2 className={`text-lg font-black uppercase tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>Bem-vindo ao VestQuiz</h2>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mt-0.5">Sua jornada começa agora</p>
                      </div>
                    </div>
                    <button onClick={closeIntro} className={`p-1.5 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
                      <X size={18} className={isDark ? 'text-slate-400' : 'text-slate-500'} />
                    </button>
                </div>

                {/* Introdução */}
                <div className={`rounded-2xl p-4 mb-5 ${isDark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-slate-50 border border-slate-200'}`}>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    O <strong className={isDark ? 'text-white' : 'text-slate-900'}>VestQuiz</strong> é uma plataforma de estudos gamificada, pensada especialmente para estudantes que se preparam para o <strong className={isDark ? 'text-white' : 'text-slate-900'}>vestibular e o ENEM</strong>. Todo o conteúdo é contextualizado na <strong className={isDark ? 'text-indigo-400' : 'text-indigo-600'}>realidade baiana</strong> — das ruas de Salvador à Chapada Diamantina, do semiárido ao Recôncavo.
                  </p>
                </div>

                {/* O que você vai encontrar */}
                <h3 className={`text-xs font-black uppercase tracking-widest mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <Lightbulb size={12} className="inline mr-1.5 -mt-0.5" />
                  O que você vai encontrar
                </h3>

                <div className="space-y-2.5 mb-5">
                  {/* Quiz por Matérias */}
                  <div className={`flex gap-3 items-start rounded-2xl p-3.5 ${isDark ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-violet-50 border border-violet-200'}`}>
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow">
                      <BrainCircuit size={16} className="text-white" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Quiz por Matérias</p>
                      <p className={`text-xs leading-relaxed mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        7 disciplinas — Matemática, Geografia, História, Biologia, Linguagens, Sociologia e Filosofia — com centenas de questões organizadas por dificuldade e habilidade da BNCC.
                      </p>
                    </div>
                  </div>

                  {/* Gestor do Território */}
                  <div className={`flex gap-3 items-start rounded-2xl p-3.5 ${isDark ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'}`}>
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow">
                      <Building2 size={16} className="text-white" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Gestor do Território</p>
                      <p className={`text-xs leading-relaxed mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Assuma o cargo de governador da Bahia e tome decisões estratégicas que impactam Economia, Sociedade e Meio Ambiente. Aprenda sobre gestão pública e sustentabilidade de forma prática.
                      </p>
                    </div>
                  </div>

                  {/* GeoCommand */}
                  <div className={`flex gap-3 items-start rounded-2xl p-3.5 ${isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow">
                      <Map size={16} className="text-white" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Geo-Command</p>
                      <p className={`text-xs leading-relaxed mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Localize capitais mundiais, pontos geográficos e cidades baianas em um mapa interativo. São mais de 270 alvos para testar sua precisão geográfica.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Gamificação */}
                <h3 className={`text-xs font-black uppercase tracking-widest mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <Trophy size={12} className="inline mr-1.5 -mt-0.5" />
                  Sistema de Evolução
                </h3>

                <div className={`rounded-2xl p-4 mb-5 ${isDark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-slate-50 border border-slate-200'}`}>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Star size={14} className="text-yellow-500 flex-shrink-0" />
                      <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}><strong>20 níveis</strong> de evolução</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target size={14} className="text-indigo-500 flex-shrink-0" />
                      <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}><strong>XP</strong> por acerto e conquista</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy size={14} className="text-emerald-500 flex-shrink-0" />
                      <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}><strong>Medalhas</strong> temáticas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-violet-500 flex-shrink-0" />
                      <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}><strong>Ranking</strong> global</span>
                    </div>
                  </div>
                </div>

                {/* Proposta Pedagógica */}
                <h3 className={`text-xs font-black uppercase tracking-widest mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <BookOpen size={12} className="inline mr-1.5 -mt-0.5" />
                  Proposta Pedagógica
                </h3>

                <div className={`rounded-2xl p-4 mb-6 ${isDark ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-indigo-50 border border-indigo-200'}`}>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Nosso conteúdo segue as competências e habilidades da <strong className={isDark ? 'text-indigo-400' : 'text-indigo-700'}>BNCC</strong> e é organizado pela <strong className={isDark ? 'text-indigo-400' : 'text-indigo-700'}>Taxonomia de Bloom</strong> — do "Lembrar" ao "Criar". Cada questão traz explicação detalhada e está conectada à realidade do território baiano, tornando o aprendizado significativo e contextualizado. A gamificação estimula a constância nos estudos através de recompensas progressivas, enquanto os modos de jogo desenvolvem habilidades diferentes: pensamento crítico, localização espacial, tomada de decisão e análise interdisciplinar.
                  </p>
                </div>

                {/* Botão de fechar */}
                <button 
                  onClick={closeIntro}
                  className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                >
                  Começar Jornada
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex justify-between items-center px-1">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-0.5">
            Evolução Acadêmica
          </p>
          <h1 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {userData.displayName?.split(' ')[0]}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowIntro(true)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400' : 'bg-slate-200 hover:bg-slate-300 text-indigo-600'}`}
            title="Sobre o VestQuiz"
          >
            <Info size={16} />
          </button>
          <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          <button
            onClick={() => setView('profile')}
            className="relative group"
          >
            <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 overflow-hidden transition-transform active:scale-90">
              {userData.photoURL ? (
                <img src={userData.photoURL} className="w-full h-full object-cover" alt="Perfil" />
              ) : (
                <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                  {userData.displayName?.charAt(0)}
                </div>
              )}
            </div>
            {userData.streak > 5 && (
              <div className="absolute -top-1 -right-1 bg-orange-500 w-4 h-4 rounded-full border-2 border-slate-950 flex items-center justify-center">
                <Flame size={8} className="text-white fill-current" />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* CARD DE NÍVEL */}
      <section
        className={`relative overflow-hidden rounded-3xl p-6 text-white shadow-2xl transition-all duration-700 bg-gradient-to-br ${cardStyle} border-b-4 border-black/20`}
      >
        <RankIcon className="absolute -right-6 -bottom-6 w-40 h-40 opacity-10 rotate-12" />
        <div className="relative z-10 space-y-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  Nível {level}
                </span>
                {level >= 15 && <Trophy size={14} className="text-yellow-300" />}
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight leading-none">
                {title}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                Jornada
              </p>
              <p className="text-xl font-black leading-none">
                {Number(userData.streak) || 1} {userData.streak <= 1 ? 'Dia' : 'Dias'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-white/80">
              <span>Experiência: {userData.xp?.toLocaleString()}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-3 w-full bg-black/30 rounded-full p-0.5 border border-white/10 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-white/80 to-white rounded-full relative shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              />
            </div>
            <p className="text-[9px] text-center font-bold text-white/50 uppercase tracking-tighter italic">
              Próximo objetivo em {LEVEL_CONFIG.XP_PER_LEVEL - (userData.xp % LEVEL_CONFIG.XP_PER_LEVEL)} XP
            </p>
          </div>
        </div>
      </section>

      {/* Eventos limitados — aparecem primeiro */}
      {(() => {
        const now = new Date();
        const carnivalStart = new Date('2026-02-01');
        const carnivalEnd = new Date('2026-03-01');
        const isActive = now >= carnivalStart && now <= carnivalEnd;
        const alreadyUnlocked = userData.badges?.includes('badge-carnaval');
        if (!isActive && !alreadyUnlocked) return null;
        return (
          <div
            onClick={() => setView('carnival-challenge')}
            className={`group relative overflow-hidden rounded-3xl p-6 cursor-pointer transition-all duration-300 transform active:scale-95 border-b-4 border-black/20 ${
              isDark
                ? 'bg-gradient-to-br from-pink-600 via-purple-700 to-yellow-600 shadow-pink-900/30'
                : 'bg-gradient-to-br from-pink-500 via-purple-600 to-yellow-500 shadow-pink-300'
            } shadow-xl`}
          >
            {/* Confetes decorativos */}
            <div className="absolute top-2 left-4 text-2xl opacity-20 rotate-12">🎊</div>
            <div className="absolute bottom-2 right-12 text-xl opacity-20 -rotate-12">🎵</div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-white/80">
                  <PartyPopper size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {alreadyUnlocked ? '✅ Conquista Desbloqueada' : '⏳ Evento Limitado'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">
                    Desafio de Carnaval
                  </h3>
                  <p className="text-xs text-white/70 font-medium mt-1">
                    {alreadyUnlocked ? 'Jogue novamente por diversão!' : 'Acerte 7+ questões e ganhe a medalha 🎭'}
                  </p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors border border-white/10">
                <ChevronRight className="text-white" size={24} />
              </div>
            </div>
            <Flame className="absolute -right-2 -bottom-4 text-white/10 w-32 h-32 rotate-12 transition-transform duration-500 group-hover:rotate-0" />
          </div>
        );
      })()}

      <StatsCards userData={userData} isDark={isDark} />

      {/* CARD 1: QUIZ DE MATÉRIAS */}
      <div 
        onClick={() => setView('subjects')}
        className={`group relative overflow-hidden rounded-3xl p-6 cursor-pointer transition-all duration-300 transform active:scale-95 border-b-4 border-black/20 ${
          isDark 
            ? 'bg-gradient-to-br from-violet-600 to-indigo-700 shadow-violet-900/20' 
            : 'bg-gradient-to-br from-violet-500 to-indigo-600 shadow-violet-200'
        } shadow-xl`}
      >
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-white/80">
              <BookOpen size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Base de Conhecimento
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">
                Quiz por Matérias
              </h3>
              <p className="text-xs text-white/70 font-medium mt-1">
                Domine os conteúdos específicos.
              </p>
            </div>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors border border-white/10">
               <ChevronRight className="text-white" size={24} />
          </div>
        </div>
        <BrainCircuit className="absolute -right-2 -bottom-4 text-white/10 w-32 h-32 rotate-12 transition-transform duration-500 group-hover:rotate-0" />
      </div>

      {/* --- NOVO CARD: GESTOR DO TERRITÓRIO (OPÇÃO 1) --- */}
      <div 
        onClick={() => setView('territory-manager')}
        className={`group relative overflow-hidden rounded-3xl p-6 cursor-pointer transition-all duration-300 transform active:scale-95 border-b-4 border-black/20 ${
          isDark 
            ? 'bg-gradient-to-br from-amber-600 to-orange-700 shadow-orange-900/20' 
            : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-orange-200'
        } shadow-xl`}
      >
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-white/80">
              <Building2 size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Simulação
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">
                Gestor do Território
              </h3>
              <p className="text-xs text-white/70 font-medium mt-1">
                Tome decisões de impacto social.
              </p>
            </div>
          </div>
          
          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors border border-white/10">
               <ChevronRight className="text-white" size={24} />
          </div>
        </div>

        {/* Decoration */}
        <Users className="absolute -right-2 -bottom-4 text-white/10 w-32 h-32 rotate-12 transition-transform duration-500 group-hover:rotate-0" />
      </div>

      {/* CARD 3: GEOGAME */}
      <div className="group relative" onClick={() => setView('geo-game')}>
        <GeoChallengeCard isDark={isDark} />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 group-active:translate-x-1 transition-transform">
          <ChevronRight size={20} />
        </div>
      </div>

      {/* evento limitado (Carnaval) movido para cima */}
      <div className="space-y-3">
        <AchievementCollection
          badges={badges}
          userBadges={userData.badges}
          isDark={isDark}
          setView={setView}
        />
      </div>
    </motion.div>
  );
};