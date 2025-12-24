import { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeModal } from '../profile/BadgeModal';

export const AchievementCollection = ({ badges, userBadges, isDark, setView }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBadge(null), 300);
  };

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase text-slate-500 tracking-wider">Coleção de Conquistas</h2>
          <span className="text-xs font-bold text-indigo-500">
            {userBadges?.length || 0} / {badges.length}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {badges.slice(0, 3).map((badge) => {
            const isUnlocked = userBadges?.includes(badge.id);
            return (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBadgeClick(badge)}
                className={`aspect-square rounded-xl border flex flex-col items-center justify-center gap-2 p-2 text-center transition-all cursor-pointer ${
                  isUnlocked
                    ? isDark 
                      ? 'bg-slate-800 border-slate-700 text-indigo-400 hover:bg-slate-700' 
                      : 'bg-white border-slate-200 text-indigo-600 shadow-sm hover:shadow-md'
                    : isDark 
                      ? 'bg-slate-900/50 border-slate-800 text-slate-700 opacity-40 grayscale hover:opacity-60' 
                      : 'bg-slate-100 border-slate-200 text-slate-300 grayscale hover:bg-slate-200'
                }`}
              >
                <span className="text-2xl mb-1">{badge.icon}</span>
                <span className="text-[9px] font-bold uppercase leading-tight line-clamp-2">{badge.name}</span>
              </motion.div>
            );
          })}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => setView('profile')} 
            className={`aspect-square rounded-xl border border-dashed flex items-center justify-center p-2 text-center transition-all cursor-pointer ${
              isDark 
                ? 'border-slate-800 text-slate-600 hover:border-slate-600 hover:text-slate-400' 
                : 'border-slate-300 text-slate-400 hover:border-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="text-xs font-bold">+ {(badges.length - 3) > 0 ? badges.length - 3 : 0}</span>
          </motion.div>
        </div>
      </section>

      <BadgeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        badge={selectedBadge}
        isUnlocked={selectedBadge ? userBadges?.includes(selectedBadge.id) : false}
      />
    </>
  );
};