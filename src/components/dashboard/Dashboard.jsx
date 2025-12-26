// src/components/dashboard/Dashboard.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  GraduationCap,
  Zap,
  Trophy,
  Star,
  ChevronRight,
  Flame,
  Target,
  Info,
  X,
  Map,
  Lightbulb,
  Users
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { StatsCards } from './StatsCards';
import { AchievementCollection } from './AchievementCollection';
import { GeoChallengeCard } from './GeoChallengeCard';
import { getLevelData, LEVEL_CONFIG } from '../../constants/levels';

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
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className={`max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl border ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              } p-6 md:p-8`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500 rounded-lg">
                    <Info className="text-white" size={24} />
                  </div>
                  <h2 className={`text-xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Proposta Pedagógica
                  </h2>
                </div>
                <button 
                  onClick={closeIntro}
                  className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className={`space-y-6 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <section className="space-y-3">
                  <p className="font-bold text-indigo-400">Transformando o Ensino Médio</p>
                  <p>
                    Este app foi pensado para transformar o estudo do Ensino Médio em algo mais envolvente e prático, 
                    usando quizzes, jogos geográficos e desafios interativos como base da aprendizagem. 
                    Os objetivos funcionam como o guia central, deixando claro o desenvolvimento necessário em cada etapa.
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2 mb-2 text-indigo-500">
                      <Lightbulb size={18} />
                      <span className="font-black text-xs uppercase">Estratégia Bloom</span>
                    </div>
                    <p className="text-xs">
                      Baseado na Taxonomia de Bloom, estimulamos não apenas a memória, mas a interpretação de mapas, 
                      análise de territórios e tomada de decisões complexas.
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2 mb-2 text-emerald-500">
                      <Map size={18} />
                      <span className="font-black text-xs uppercase">Foco no DCRB</span>
                    </div>
                    <p className="text-xs">
                      Alinhado ao Documento Curricular Referencial da Bahia, valorizamos o protagonismo do estudante 
                      e a leitura crítica da realidade social e territorial.
                    </p>
                  </div>
                </div>

                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-orange-500">
                    <Users size={18} />
                    <span className="font-black text-xs uppercase tracking-widest">Fundamentação Teórica</span>
                  </div>
                  <p>
                    A lógica de Ralph Tyler guia nossa intencionalidade. Conectamos as ideias de Piaget, 
                    no protagonismo da construção do conhecimento, e Vygotsky, através da 
                    <strong> Zona de Desenvolvimento Proximal</strong>, garantindo que cada desafio 
                    seja um degrau exato para sua evolução acadêmica.
                  </p>
                </section>

                <button
                  onClick={closeIntro}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
                >
                  Iniciar Jornada
                </button>
              </div>
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

      <StatsCards userData={userData} isDark={isDark} />

      <div className="group relative" onClick={() => setView('geo-game')}>
        <GeoChallengeCard isDark={isDark} />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 group-active:translate-x-1 transition-transform">
          <ChevronRight size={20} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className={`text-xs font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Distintivos Obtidos
          </h3>
          <span className="text-[10px] font-bold text-indigo-500">
            {userData.badges?.length || 0} de {badges?.length || 0}
          </span>
        </div>
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