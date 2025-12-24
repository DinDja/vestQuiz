import { motion } from 'framer-motion';

export const ProgressBar = ({ current, total, color = "emerald" }) => (
  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${Math.min((current / total) * 100, 100)}%` }}
      className={`h-full ${color === 'emerald' ? 'bg-emerald-500' : 'bg-indigo-500'}`}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
    />
  </div>
);