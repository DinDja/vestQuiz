// src/components/dashboard/Dashboard.tsx
import { motion } from 'framer-motion';
import { Brain, Zap } from 'lucide-react'; // Removi Layout, CheckCircle2, Award pois não eram usados no snippet direto, mas mantenha se precisar
import { ThemeToggle } from '../common/ThemeToggle';
import { StatsCards } from './StatsCards';
import { AchievementCollection } from './AchievementCollection';
import { GeoChallengeCard } from './GeoChallengeCard'; // Importação nova

export const Dashboard = ({ 
  userData, 
  isDark, 
  toggleTheme, 
  setView,
  badges 
}) => (
  <motion.div
    key="dash"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-8"
  >
    {/* HEADER */}
    <header className="flex justify-between items-center">
      <div>
        <h1 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Olá, {userData.displayName?.split(' ')[0]}
        </h1>
        <p className="text-slate-500 text-sm font-medium">Vamos focar nos estudos hoje.</p>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle isDark={isDark} toggle={toggleTheme} />
        <div
          onClick={() => setView('profile')}
          className="w-10 h-10 bg-indigo-500 rounded-full overflow-hidden shadow-lg cursor-pointer hover:ring-2 hover:ring-indigo-400 transition-all"
        >
          {userData.photoURL ? (
            <img src={userData.photoURL} className="w-full h-full object-cover" alt="Profile" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-bold">
              {userData.displayName?.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </header>

    {/* XP CARD MAIN */}
    <div className="bg-gradient-to-br from-indigo-600 to-slate-800 dark:from-indigo-600 dark:to-slate-900 rounded-2xl p-6 text-white shadow-xl ring-1 ring-white/10 relative overflow-hidden transition-all">
      <Brain className="absolute -right-4 -bottom-4 opacity-10 w-32 h-32 rotate-12" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-indigo-200 text-xs font-semibold uppercase tracking-wider">Pontuação Geral</span>
            <div className="text-3xl font-bold mt-1">{(userData.xp || 0).toLocaleString()} XP</div>
          </div>
          <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Zap size={12} className="text-yellow-400" />
            {userData.streak} Dias
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-indigo-200">
            <span>Próximo Nível</span>
            <span>{Math.min(Math.round(((userData.xp || 0) / 10000) * 100), 100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(((userData.xp || 0) / 10000) * 100, 100)}%` }}
              className="h-full bg-indigo-300"
            />
          </div>
        </div>
      </div>
    </div>

    <StatsCards userData={userData} isDark={isDark} />

    {/* SEÇÃO NOVA: JOGO GEOGRÁFICO */}
    <GeoChallengeCard 
      isDark={isDark} 
      onClick={() => setView('geo-game')} // Isso dispara a mudança de tela
    />

    <AchievementCollection 
      badges={badges}
      userBadges={userData.badges}
      isDark={isDark}
      setView={setView}
    />
  </motion.div>
);