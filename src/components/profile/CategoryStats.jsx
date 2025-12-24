import { PieChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { getIconComponent } from '../../utils/iconMapper';

export const CategoryStats = ({ subjects, correctQuestions, isDark }) => {
  const categoryStats = () => {
    const stats = {};
    const correctList = correctQuestions || [];

    subjects.forEach(sub => {
      if (!stats[sub.category]) {
        stats[sub.category] = { 
          total: 0, 
          correct: 0, 
          iconName: sub.iconName 
        };
      }
      sub.questions.forEach(q => {
        stats[sub.category].total++;
        if (correctList.includes(q.id)) {
          stats[sub.category].correct++;
        }
      });
    });
    return Object.entries(stats).map(([name, data]) => ({ name, ...data }));
  };

  const stats = categoryStats();

  return (
    <section className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
      <h2 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4 flex items-center gap-2">
        <PieChart size={14} className="text-indigo-500" /> Força por Área
      </h2>
      <div className="space-y-5">
        {stats.map((cat) => {
          const Icon = getIconComponent(cat.iconName, 14);
          return (
            <div key={cat.name}>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`p-1 rounded-lg ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                    {Icon}
                  </span>
                  <span className={`text-[10px] font-black uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {cat.name}
                  </span>
                </div>
                <span className="text-[10px] font-black text-indigo-500">
                  {cat.correct} / {cat.total}
                </span>
              </div>
              <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(cat.correct / cat.total) * 100}%` }}
                  className="h-full bg-indigo-500"
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};