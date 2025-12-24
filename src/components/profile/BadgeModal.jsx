import { motion } from 'framer-motion';
import { X, Award, Lock, CheckCircle } from 'lucide-react';

export const BadgeModal = ({ isOpen, onClose, badge, isUnlocked }) => {
  if (!isOpen) return null;

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
        className="relative w-full max-w-sm bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          <div className="mb-6">
            <div className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-5xl mb-4 ${
              isUnlocked 
                ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30' 
                : 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
            }`}>
              {badge.icon}
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-2">
              {isUnlocked ? (
                <>
                  <CheckCircle className="text-emerald-500" size={18} />
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Conquista Desbloqueada</span>
                </>
              ) : (
                <>
                  <Lock className="text-slate-500" size={18} />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conquista Bloqueada</span>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className={`text-xl font-bold ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
              {badge.name}
            </h3>
            
            <div className="bg-slate-800/50 p-4 rounded-xl">
              <p className="text-slate-300 text-sm leading-relaxed">
                {badge.desc}
              </p>
            </div>

            {/* Requirements */}
            <div className="bg-slate-800/30 p-4 rounded-xl">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Award size={12} /> Requisitos
              </h4>
              <ul className="space-y-1">
                {badge.reqQuestions?.map((req, index) => (
                  <li key={index} className="text-xs text-slate-400 flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isUnlocked ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                    Questão: {req}
                  </li>
                )) || (
                  <li className="text-xs text-slate-400">Concluir atividades específicas</li>
                )}
              </ul>
            </div>

            {/* Status */}
            <div className={`p-3 rounded-xl text-center ${isUnlocked ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-slate-800/30 border border-slate-700'}`}>
              <span className={`text-sm font-medium ${isUnlocked ? 'text-emerald-400' : 'text-slate-400'}`}>
                {isUnlocked 
                  ? '🎉 Você conquistou esta medalha!' 
                  : '🔒 Continue estudando para desbloquear'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 p-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};