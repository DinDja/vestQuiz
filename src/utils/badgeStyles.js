
export const RARITY_STYLES = {
  common: {
    accent: 'text-slate-600',
    cardLight: 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50',
    cardDark: 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700',
    iconBg: 'bg-slate-100 text-slate-700',
    circle: 'bg-gradient-to-br from-slate-300 to-slate-400 text-white',
    modal: 'bg-gradient-to-br from-slate-100 to-slate-200 border-slate-200',
    toastRing: 'ring-slate-300/20'
  },
  uncommon: {
    accent: 'text-emerald-500',
    cardLight: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100',
    cardDark: 'bg-slate-800 border-emerald-500/30 text-emerald-400 hover:bg-slate-700',
    iconBg: 'bg-emerald-100 text-emerald-600',
    circle: 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white',
    modal: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200',
    toastRing: 'ring-emerald-400/20'
  },
  rare: {
    accent: 'text-indigo-500',
    cardLight: 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100',
    cardDark: 'bg-slate-800 border-indigo-500/30 text-indigo-400 hover:bg-slate-700',
    iconBg: 'bg-indigo-100 text-indigo-600',
    circle: 'bg-gradient-to-br from-indigo-400 to-indigo-600 text-white',
    modal: 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200',
    toastRing: 'ring-indigo-400/20'
  },
  epic: {
    accent: 'text-violet-500',
    cardLight: 'bg-violet-50 border-violet-200 text-violet-600 hover:bg-violet-100',
    cardDark: 'bg-slate-800 border-violet-500/30 text-violet-400 hover:bg-slate-700',
    iconBg: 'bg-violet-100 text-violet-600',
    circle: 'bg-gradient-to-br from-violet-400 to-violet-600 text-white',
    modal: 'bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200',
    toastRing: 'ring-violet-400/20'
  },
  legendary: {
    accent: 'text-amber-500',
    cardLight: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100',
    cardDark: 'bg-slate-800 border-amber-400/30 text-amber-400 hover:bg-slate-700',
    iconBg: 'bg-amber-400 text-white',
    circle: 'bg-gradient-to-br from-amber-400 to-amber-600 text-white',
    modal: 'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-300',
    toastRing: 'ring-amber-400/25'
  }
};

export function getBadgeClasses(rarity = 'common', { isDark = false, variant = 'card' } = {}) {
  const r = RARITY_STYLES[rarity] || RARITY_STYLES.common;

  if (variant === 'circle') {
    return {
      container: `w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ${r.circle}`
    };
  }

  if (variant === 'toast') {
    return {
      ring: r.toastRing,
      iconBg: `w-10 h-10 rounded-full flex items-center justify-center text-2xl mr-4 ${r.iconBg}`,
      accent: r.accent
    };
  }

  if (variant === 'modal') {
    return {
      container: `w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-5xl mb-4 ${r.modal}`,
      accent: r.accent
    };
  }

  // default: card
  return {
    container: isDark ? r.cardDark : r.cardLight,
    icon: `mb-1 flex-shrink-0 ${r.iconBg}`,
    title: r.accent,
    accent: r.accent
  };
}
