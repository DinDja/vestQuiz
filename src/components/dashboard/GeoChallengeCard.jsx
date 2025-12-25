import { motion } from 'framer-motion';
import { Globe2, Map, Crosshair, ArrowRight } from 'lucide-react';

export const GeoChallengeCard = ({ onClick, isDark }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="relative overflow-hidden rounded-2xl cursor-pointer group h-full min-h-[160px]"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-800 dark:from-emerald-700 dark:to-teal-900" />
    
    <Globe2 className="absolute -right-6 -bottom-6 text-white/10 w-32 h-32 rotate-12 transition-transform group-hover:rotate-45 duration-700" />
    <div className="absolute top-0 right-0 p-4 opacity-20">
      <Map size={48} className="text-white" />
    </div>

    <div className="relative z-10 p-6 flex flex-col justify-between h-full">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-500/20 text-emerald-100 text-xs font-bold px-2 py-1 rounded border border-emerald-400/30">
            NOVA MISSÃO
          </span>
          <span className="flex items-center gap-1 text-emerald-100 text-xs font-medium">
            <Crosshair size={12} /> Operação Global
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white">
          Geo-Command: Atlas
        </h3>
        
        <p className="text-emerald-100 text-sm max-w-[250px]">
          Localize alvos ao redor do globo. Teste sua precisão geográfica.
        </p>
      </div>

      <div className="flex justify-end mt-4">
        <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-colors">
          <ArrowRight className="text-white w-5 h-5" />
        </div>
      </div>
    </div>
  </motion.div>
);