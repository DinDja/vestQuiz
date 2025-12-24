import { useState } from 'react';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { BadgeModal } from './BadgeModal';

export const BadgesCollection = ({ badges, userBadges, isDark }) => {
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
      <section className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
            <Award size={14} className="text-indigo-500" /> Medalhas Coletadas
          </h2>
          <span className="text-[10px] font-black text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">
            {userBadges?.length || 0} / {badges.length}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {badges.map((badge) => {
            const isUnlocked = userBadges?.includes(badge.id);
            return (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBadgeClick(badge)}
                className={`aspect-square rounded-2xl border flex flex-col items-center justify-center gap-1 p-1 text-center transition-all cursor-pointer ${
                  isUnlocked
                    ? isDark 
                      ? 'bg-slate-800 border-indigo-500/40 text-indigo-400 hover:bg-slate-700' 
                      : 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100'
                    : isDark 
                      ? 'bg-slate-950 border-slate-800 text-slate-700 opacity-40 hover:opacity-60' 
                      : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
                }`}
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="text-[7px] font-black uppercase leading-tight line-clamp-2">{badge.name}</span>
                {!isUnlocked && (
                  <div className="absolute">
                    <div className="w-4 h-4 bg-slate-700 rounded-full flex items-center justify-center">
                      <span className="text-[6px] text-slate-400">🔒</span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        <p className="text-[9px] text-slate-500 text-center mt-4">
          Clique em uma medalha para ver os detalhes
        </p>
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