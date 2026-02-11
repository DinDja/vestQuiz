import { motion } from 'framer-motion';
import { X, Award, Star, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { BADGES, GEO_BADGES, TERRITORY_BADGES } from '../../constants/badges';
import { getBadgeClasses } from '../../utils/badgeStyles';

const ALL_BADGES = [...BADGES, ...GEO_BADGES, ...TERRITORY_BADGES];

export const UserBadgesModal = ({ isOpen, onClose, user, isDark }) => {
  if (!isOpen || !user) return null;

  const userBadges = user.badges || [];
  const unlockedBadges = ALL_BADGES.filter(badge => userBadges.includes(badge.id));
  const totalBadges = ALL_BADGES.length;

  // Calcular estatísticas
  const stats = [
    { label: 'XP Total', value: user.xp?.toLocaleString() || '0', icon: <Star size={14} />, color: 'text-amber-500' },
    { label: 'Módulos', value: user.completed?.length || '0', icon: <Target size={14} />, color: 'text-emerald-500' },
    { label: 'Conquistas', value: `${userBadges.length}/${totalBadges}`, icon: <Award size={14} />, color: 'text-indigo-500' },
    { label: 'Questões', value: user.correctQuestions?.length || '0', icon: <TrendingUp size={14} />, color: 'text-rose-500' }
  ];

  // Determinar o fundo baseado nos dados do usuário
  const hasImage = !!user.coverImage;
  const hasGradient = !!user.profileGradient && !hasImage;
  const hasSolidColor = !hasImage && !hasGradient;

  // Cores baseadas no tema
  const bgColor = isDark ? 'bg-slate-900' : 'bg-white';
  const borderColor = isDark ? 'border-slate-700' : 'border-slate-200';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-600';
  const cardBg = isDark ? 'bg-slate-800/50' : 'bg-slate-50';
  const modalBg = isDark ? 'from-slate-900 to-slate-800' : 'from-white to-slate-100';
  const shadow = isDark ? 'shadow-2xl' : 'shadow-xl';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 dark:bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className={`relative w-full max-w-md bg-gradient-to-br ${modalBg} border ${borderColor} rounded-2xl ${shadow} overflow-hidden max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com fundo personalizado do usuário */}
        <div className="h-32 relative flex-shrink-0">
          {/* Container de fundo */}
          <div className="absolute inset-0">
            {/* 1. Imagem de fundo (maior prioridade) */}
            {hasImage && (
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${user.coverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            )}
            
            {/* 2. Gradiente */}
            {hasGradient && (
              <div className={`absolute inset-0 ${user.profileGradient}`} />
            )}
            
            {/* 3. Cor sólida */}
            {hasSolidColor && (
              <div 
                className="absolute inset-0"
                style={{ backgroundColor: user.coverColor || '#4f46e5' }}
              />
            )}
            
            {/* Overlay escuro para contraste */}
            <div className={`absolute inset-0 ${isDark ? 'bg-black/40' : 'bg-black/20'}`} />
          </div>
          
          {/* Botão de fechar */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 ${isDark ? 'bg-black/40 hover:bg-black/60' : 'bg-white/40 hover:bg-white/60'} text-white dark:text-white rounded-xl backdrop-blur-sm transition-colors z-10`}
          >
            <X size={20} />
          </button>

          {/* Avatar do usuário */}
          <div className="absolute -bottom-12 left-6 z-10">
            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden ${shadow} ring-4 ${isDark ? 'ring-slate-900' : 'ring-white'} relative`}>
              {/* Background do avatar - mesma lógica do header */}
              <div className="absolute inset-0">
                {hasImage && (
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${user.coverImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                )}
                {hasGradient && (
                  <div className={`absolute inset-0 ${user.profileGradient}`} />
                )}
                {hasSolidColor && (
                  <div 
                    className="absolute inset-0"
                    style={{ backgroundColor: user.coverColor || '#4f46e5' }}
                  />
                )}
              </div>
              
              {/* Foto do usuário ou inicial */}
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  className="w-full h-full object-cover relative z-10" 
                  alt={user.displayName}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center relative z-10">
                        <span class="text-2xl font-black text-white uppercase">
                          ${user.displayName?.charAt(0) || 'U'}
                        </span>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center relative z-10">
                  <span className="text-2xl font-black text-white uppercase">
                    {user.displayName?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conteúdo com scroll */}
        <div className="pt-16 px-4 sm:px-6 pb-6 flex-1 overflow-y-auto">
          {/* Informações do usuário */}
          <div className="mb-6">
            <h2 className={`text-xl font-bold mb-2 truncate ${textColor}`}>
              {user.displayName || 'Estudante'}
            </h2>
            <p className={`text-sm italic line-clamp-2 ${textMuted}`}>
              "{user.bio || 'Em busca do conhecimento 📚'}"
            </p>
            
            {/* Estatísticas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {stats.map((stat, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl border ${cardBg} ${borderColor}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={stat.color}>
                      {stat.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider truncate">
                      {stat.label}
                    </span>
                  </div>
                  <div className={`text-base font-black truncate ${textColor}`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coleção de Conquistas */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2 truncate">
                <Award className="text-indigo-500 flex-shrink-0" size={20} />
                <span className={textColor}>
                  Conquistas ({unlockedBadges.length}/{totalBadges})
                </span>
              </h3>
              <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20 px-2 py-1 rounded-full flex-shrink-0">
                {Math.round((unlockedBadges.length / totalBadges) * 100)}% Completo
              </span>
            </div>

            {unlockedBadges.length === 0 ? (
              <div className={`p-6 text-center rounded-xl border ${cardBg} ${borderColor}`}>
                <Award className="w-10 h-10 mx-auto text-slate-400 dark:text-slate-500 mb-3" />
                <p className={`text-sm ${textMuted}`}>
                  {user.displayName || 'Este usuário'} ainda não desbloqueou conquistas.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2">
                {unlockedBadges.map((badge) => {
                  const rarityStyles = getBadgeClasses(badge.rarity || 'common', { isDark, variant: 'card' });
                  return (
                    <motion.div
                      key={badge.id}
                      whileHover={{ scale: 1.02 }}
                      className={`${rarityStyles.container} p-3 rounded-xl border flex flex-col items-center justify-center gap-2 text-center min-h-[100px]`}
                    >
                      <div className={`${rarityStyles.icon} text-2xl`}>{badge.icon}</div>
                      <div className="flex-1 min-w-0 w-full">
                      <h4 className={`text-xs font-bold mb-1 truncate ${rarityStyles.accent}`}>
                        {badge.name}
                      </h4>
                      <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-600'} line-clamp-2 break-words`}>
                        {badge.desc}
                      </p>
                    </div>
                  </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Badges bloqueadas */}
          {unlockedBadges.length < totalBadges && (
            <div>
              <h4 className={`text-sm font-bold mb-3 truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Conquistas Restantes
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {BADGES.filter(badge => !userBadges.includes(badge.id)).slice(0, 8).map((badge) => (
                  <div
                    key={badge.id}
                    className={`aspect-square rounded-lg border flex flex-col items-center justify-center p-1 opacity-40 ${
                      isDark 
                        ? 'bg-slate-800/50 border-slate-700 text-slate-600' 
                        : 'bg-slate-100 border-slate-200 text-slate-400'
                    }`}
                    title={badge.name}
                  >
                    <span className="text-lg flex-shrink-0">{badge.icon}</span>
                    <span className="text-[6px] font-bold uppercase mt-1">🔒</span>
                  </div>
                ))}
                {BADGES.filter(badge => !userBadges.includes(badge.id)).length > 8 && (
                  <div className={`aspect-square rounded-lg border flex items-center justify-center ${
                    isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      +{BADGES.filter(badge => !userBadges.includes(badge.id)).length - 8}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer fixo */}
        <div className={`border-t ${borderColor} p-4 flex-shrink-0`}>
          <button
            onClick={onClose}
            className={`w-full py-3 ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'} ${isDark ? 'text-white' : 'text-slate-800'} rounded-xl font-medium transition-colors`}
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};