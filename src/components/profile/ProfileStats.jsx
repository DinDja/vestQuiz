import { Target, CheckCircle2, Award } from 'lucide-react';

export const ProfileStats = ({ userData, globalLeaderboard, subjects, isDark }) => {
  const totalQuestions = subjects.reduce((acc, s) => acc + s.questions.length, 0);
  const masteryPercentage = Math.round(((userData.correctQuestions?.length || 0) / totalQuestions) * 100) || 0;
  const rankIndex = globalLeaderboard.findIndex(u => u.uid === userData.uid);
  const rank = rankIndex !== -1 ? rankIndex + 1 : '--';

  const stats = [
    { label: 'Domínio', val: `${masteryPercentage}%`, icon: <Target size={16} /> },
    { label: 'Questões', val: userData.correctQuestions?.length || 0, icon: <CheckCircle2 size={16} /> },
    { label: 'Ranking', val: `#${rank}`, icon: <Award size={16} /> }
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, i) => (
        <div key={i} className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-1 shadow-sm ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-indigo-500 mb-1">{stat.icon}</div>
          <div className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.val}</div>
          <div className="text-[9px] text-slate-500 font-black uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};