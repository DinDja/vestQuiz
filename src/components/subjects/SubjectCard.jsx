import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { getIconComponent } from '../../utils/iconMapper';

export const SubjectCard = ({ 
  subject, 
  isCompleted, 
  isDark, 
  onClick 
}) => {
  const Icon = getIconComponent(subject.iconName, 24);
  
  return (
    <button
      className={`group w-full text-left relative overflow-hidden p-5 rounded-xl border transition-all ${isCompleted
        ? isDark ? 'bg-slate-900 border-emerald-500/30' : 'bg-white border-emerald-500/50 shadow-sm'
        : isDark ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-md'
        }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg transition-colors ${isCompleted
            ? 'bg-emerald-500/10 text-emerald-500'
            : isDark ? 'bg-slate-800 text-slate-400 group-hover:text-indigo-400' : 'bg-slate-100 text-slate-500 group-hover:text-indigo-600'
            }`}>
            {Icon}
          </div>
          <div>
            <h3 className={`text-sm font-bold ${isCompleted
              ? 'text-emerald-500'
              : isDark ? 'text-slate-200' : 'text-slate-800'
              }`}>
              {subject.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                {subject.category}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {subject.xp} XP
              </span>
            </div>
          </div>
        </div>
        {isCompleted ? (
          <CheckCircle2 size={20} className="text-emerald-500" />
        ) : (
          <ChevronRight size={18} className={`transition-colors ${isDark ? 'text-slate-600 group-hover:text-indigo-400' : 'text-slate-300 group-hover:text-indigo-600'}`} />
        )}
      </div>
    </button>
  );
};