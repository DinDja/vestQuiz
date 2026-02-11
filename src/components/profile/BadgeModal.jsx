import { motion } from 'framer-motion';
import { X, Award, Lock, CheckCircle } from 'lucide-react';
import { getBadgeClasses } from '../../utils/badgeStyles';

export const BadgeModal = ({ isOpen, onClose, badge, isUnlocked, isDark }) => {
  if (!isOpen || !badge) return null;

  const rarityStyles = getBadgeClasses(badge?.rarity || 'common', { isDark, variant: 'modal' });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className={`relative w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border ${
          isDark
            ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700'
            : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 text-center">
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <X size={20} />
          </button>

          <div className="mb-6">
            <div className={`${isUnlocked ? rarityStyles.container : (isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700' : 'bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300')} w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-5xl mb-4`}>
              <span className={!isUnlocked ? 'grayscale opacity-50' : ''}>{badge.icon}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
              {isUnlocked ? (
                <>
                  <CheckCircle className={rarityStyles?.accent || 'text-emerald-500'} size={18} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${rarityStyles?.accent || 'text-emerald-500'}`}>Conquista Desbloqueada</span>
                </>
              ) : (
                <>
                  <Lock className={isDark ? 'text-slate-500' : 'text-slate-400'} size={18} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Conquista Bloqueada</span>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 p-2">
            <h3 className={`text-xl font-bold ${
              isUnlocked
                ? isDark ? 'text-white' : 'text-slate-900'
                : isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {badge.name}
            </h3>
            
            <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {badge.desc}
              </p>
            </div>

            {/* Requirements */}
            <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/30' : 'bg-slate-50 border border-slate-200'}`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Award size={12} /> Requisitos
              </h4>
              <ul className="space-y-1">
                {badge.reqQuestions && badge.reqQuestions.length > 0 ? (
                  badge.reqQuestions.map((req, index) => (
                    <li key={index} className={`text-xs flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${isUnlocked ? rarityStyles.accent.replace('text-','bg-') : isDark ? 'bg-slate-600' : 'bg-slate-300'}`} />
                      Questão: {req}
                    </li>
                  ))
                ) : (
                  <li className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Concluir atividades específicas</li>
                )}
              </ul>
            </div>

            {/* Status */}
            {(() => {
              const accent = rarityStyles?.accent || 'text-emerald-500';
              const colorKey = accent.replace('text-',''); // e.g. emerald-500
              const colorBase = colorKey.split('-').slice(0, -1).join('-'); // e.g. emerald
              const lightBg = `bg-${colorBase}-50 border border-${colorBase}-200`;
              const darkBg = `bg-${colorBase}-500/10 border border-${colorBase}-500/20`;
              const lightText = `text-${colorBase}-400`;

              return (
                <div className={`p-3 rounded-xl text-center ${
                  isUnlocked
                    ? (isDark ? darkBg : lightBg)
                    : (isDark ? 'bg-slate-800/30 border border-slate-700' : 'bg-slate-100 border border-slate-200')
                }`}>
                  <span className={`text-sm font-medium ${isUnlocked ? lightText : (isDark ? 'text-slate-400' : 'text-slate-500')}`}>
                    {isUnlocked 
                      ? '🎉 Você conquistou esta medalha!' 
                      : '🔒 Continue estudando para desbloquear'}
                  </span>
                </div>
              );
            })()}
          </div>

        {/* Footer */}
        <div className={`border-t p-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <button
            onClick={onClose}
            className={`w-full py-3 rounded-xl font-medium transition-colors ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};