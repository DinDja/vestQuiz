import { motion } from 'framer-motion';
import { useState } from 'react';
import { BadgeModal } from '../profile/BadgeModal';

export const AchievementToast = ({ badge, onDismiss }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        onClick={handleClick}
        className="fixed top-20 left-4 right-4 z-[300] flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-2xl ring-1 ring-emerald-500/20 cursor-pointer hover:ring-2 hover:ring-emerald-500/40 transition-all"
      >
        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center text-2xl mr-4">
          {badge.icon}
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Conquista Desbloqueada</span>
          <span className="text-slate-800 dark:text-slate-100 text-sm font-bold">{badge.name}</span>
          <span className="text-slate-500 dark:text-slate-500 text-[10px] mt-0.5">{badge.desc}</span>
        </div>
        <div className="text-emerald-500 text-xs font-bold">CLIQUE PARA VER</div>
      </motion.div>

      <BadgeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        badge={badge}
        isUnlocked={true}
      />
    </>
  );
};