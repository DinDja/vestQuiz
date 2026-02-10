import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../common/ThemeToggle';
import { UserBadgesModal } from './UserBadgesModal';

// Função para obter iniciais do nome
const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Função para gerar cor baseada no nome
const getNameColor = (name) => {
  const colors = [
    'bg-indigo-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500',
    'bg-purple-500', 'bg-blue-500', 'bg-cyan-500', 'bg-pink-500',
    'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'
  ];
  
  if (!name) return colors[0];
  
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

export const RankingScreen = ({ 
  globalLeaderboard, 
  userData, 
  isDark, 
  toggleTheme 
}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('global'); // 'global' | 'weekly'

  const openUserBadges = (user) => {
    setSelectedUser(user);
    setIsBadgesModalOpen(true);
  };

  const closeUserBadges = () => {
    setIsBadgesModalOpen(false);
    setTimeout(() => setSelectedUser(null), 300);
  };

  // Filtrar usuários sem nome ou com nome genérico
  const filteredLeaderboard = globalLeaderboard.filter(student => 
    student.displayName && 
    student.displayName !== 'Pirata Sem Nome' &&
    student.displayName !== 'Estudante Anônimo' &&
    !student.displayName.includes('Anonymous')
  );

  // Ranking global por XP total
  const sortedLeaderboard = [...filteredLeaderboard].sort((a, b) => 
    (b.xp || 0) - (a.xp || 0)
  );

  // Ranking semanal por weeklyXp
  const weeklyLeaderboard = [...filteredLeaderboard]
    .filter(student => (student.weeklyXp || 0) > 0)
    .sort((a, b) => (b.weeklyXp || 0) - (a.weeklyXp || 0));

  const currentLeaderboard = activeTab === 'global' ? sortedLeaderboard : weeklyLeaderboard;

  // Função para determinar o fundo do avatar
  const getAvatarBackgroundStyle = (student) => {
    if (student.coverImage) {
      return {
        backgroundImage: `url(${student.coverImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    } else if (student.profileGradient) {
      return {};
    } else if (student.coverColor) {
      return {
        backgroundColor: student.coverColor
      };
    }
    return {};
  };

  return (
    <>
      <motion.div key="rank" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Classificação</h1>
            <p className="text-slate-500 text-sm">Top estudantes da plataforma</p>
          </div>
          <ThemeToggle isDark={isDark} toggle={toggleTheme} />
        </header>

        {/* Abas Global / Semanal */}
        <div className={`flex rounded-2xl p-1 ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-slate-100 border border-slate-200'}`}>
          <button
            onClick={() => setActiveTab('global')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'global'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Global
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'weekly'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Semanal
          </button>
        </div>

        {currentLeaderboard.length === 0 ? (
          <div className={`rounded-xl border p-8 text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <p className="text-slate-500">
              {activeTab === 'weekly'
                ? 'Nenhum XP semanal registrado ainda. Estude para aparecer aqui!'
                : 'Nenhum estudante no ranking ainda. Seja o primeiro!'}
            </p>
          </div>
        ) : (
          <div className={`rounded-xl border divide-y overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800 divide-slate-800' : 'bg-white border-slate-200 divide-slate-100 shadow-sm'}`}>
            {currentLeaderboard.map((student, idx) => {
              const isCurrentUser = student.uid === userData.uid;
              const initials = getInitials(student.displayName);
              const avatarColor = getNameColor(student.displayName);
              
              return (
                <motion.div
                  key={student.uid}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/10 dark:hover:bg-slate-800/30 transition-colors ${
                    isCurrentUser ? (isDark ? 'bg-indigo-500/10 border-l-4 border-indigo-500' : 'bg-indigo-50 border-l-4 border-indigo-400') : ''
                  }`}
                  onClick={() => openUserBadges(student)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-center flex flex-col items-center">
                      <span className={`text-xs font-black ${idx === 0 ? 'text-yellow-400 text-lg' :
                        idx === 1 ? 'text-slate-400 text-base' :
                          idx === 2 ? 'text-amber-600 text-base' : 'text-slate-500'
                        }`}>
                        {idx + 1}
                      </span>
                      {idx < 3 && <div className={`w-1 h-1 rounded-full ${idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-slate-400' : 'bg-amber-600'}`} />}
                    </div>
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-10 h-10 rounded-full overflow-hidden border-2 flex items-center justify-center relative ${
                          isCurrentUser ? 'border-indigo-500' : isDark ? 'border-slate-800' : 'border-slate-200'
                        }`}
                        style={getAvatarBackgroundStyle(student)}
                      >
                        {/* Gradiente se existir */}
                        {student.profileGradient && (
                          <div className={`absolute inset-0 ${student.profileGradient}`} />
                        )}
                        
                        {student.photoURL ? (
                          <img 
                            src={student.photoURL} 
                            className="w-full h-full object-cover relative z-10" 
                            alt={student.displayName}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = `
                                <div class="w-full h-full ${avatarColor} flex items-center justify-center text-white font-bold text-sm relative z-10">
                                  ${initials}
                                </div>
                              `;
                            }}
                          />
                        ) : (
                          <div className={`w-full h-full ${avatarColor} flex items-center justify-center text-white font-bold text-sm relative z-10`}>
                            {initials}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className={`text-sm font-bold flex items-center gap-1 ${isCurrentUser ? 'text-indigo-500' : isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          {student.displayName || 'Estudante'}
                          {isCurrentUser && <span className="text-[8px] bg-indigo-500 text-white px-1 rounded uppercase">Você</span>}
                        </div>
                        <div className="text-[9px] text-slate-500 font-medium uppercase tracking-tighter max-w-[120px] truncate">
                          {student.bio || 'Em busca do conhecimento 📚'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-black ${idx === 0 ? 'text-yellow-500' : isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      {(activeTab === 'weekly' ? (student.weeklyXp || 0) : (student.xp || 0)).toLocaleString()}
                      <span className="text-[8px] ml-1 text-slate-500 font-bold">XP</span>
                    </div>
                    <div className="text-[9px] text-slate-500 mt-1 flex items-center gap-1 justify-end">
                      <span className="text-indigo-500">🏆 {student.badges?.length || 0}</span>
                      • {student.completed?.length || 0} módulos
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Estatísticas do ranking */}
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-slate-500 mb-1">
                {activeTab === 'weekly' ? 'Participantes' : 'Total de Estudantes'}
              </div>
              <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {currentLeaderboard.length}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Sua Posição</div>
              <div className={`text-lg font-bold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                {(() => {
                  const pos = currentLeaderboard.findIndex(u => u.uid === userData.uid) + 1;
                  return pos > 0 ? `#${pos}` : '--';
                })()}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">
                {activeTab === 'weekly' ? 'XP Semanal' : 'XP Total'}
              </div>
              <div className={`text-lg font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {currentLeaderboard.reduce((sum, student) => sum + (activeTab === 'weekly' ? (student.weeklyXp || 0) : (student.xp || 0)), 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal de Badges */}
      <UserBadgesModal
        isOpen={isBadgesModalOpen}
        onClose={closeUserBadges}
        user={selectedUser}
        isDark={isDark}
      />
    </>
  );
};