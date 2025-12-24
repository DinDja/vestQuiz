export const NavButton = ({ id, icon: Icon, label, view, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 flex-1 py-3 transition-colors ${view === id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
  >
    <Icon size={20} strokeWidth={view === id ? 2.5 : 2} />
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </button>
);