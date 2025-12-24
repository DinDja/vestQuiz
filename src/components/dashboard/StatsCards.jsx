import { CheckCircle2, Award } from 'lucide-react';

export const StatsCards = ({ userData, isDark }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className={`border p-4 rounded-xl transition-colors ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-2 text-slate-400">
        <CheckCircle2 size={18} className="text-emerald-500" />
        <span className="text-xs font-bold uppercase">Módulos</span>
      </div>
      <div className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
        {userData.completed?.length || 0}
      </div>
    </div>
    <div className={`border p-4 rounded-xl transition-colors ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-2 text-slate-400">
        <Award size={18} className="text-amber-500" />
        <span className="text-xs font-bold uppercase">Conquistas</span>
      </div>
      <div className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
        {userData.badges?.length || 0}
      </div>
    </div>
  </div>
);