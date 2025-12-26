// src/constants/levels.js
export const LEVEL_CONFIG = {
  XP_PER_LEVEL: 2000,
  MAX_LEVEL: 20,
  TITLES: [
    "Iniciante", "Aprendiz", "Praticante", "Estudioso", "Pesquisador",
    "Analista", "Especialista", "Monitor", "Tutor", "Mentor",
    "Mestre de Estudos", "Estrategista", "Consultor Acadêmico", "Gestor de Saberes", "Doutor Honoris",
    "Arquiteto de Ideias", "Grão-Mestre", "Visionário", "Eminência", "Referência Nacional"
  ]
};

export const getLevelData = (xp = 0) => {
  const level = Math.min(Math.floor(xp / LEVEL_CONFIG.XP_PER_LEVEL) + 1, LEVEL_CONFIG.MAX_LEVEL);
  const title = LEVEL_CONFIG.TITLES[level - 1];
  const currentLevelXp = xp % LEVEL_CONFIG.XP_PER_LEVEL;
  const progress = (currentLevelXp / LEVEL_CONFIG.XP_PER_LEVEL) * 100;
  
  // Design por Estágio de Aprendizado
  let cardStyle = "";
  if (level <= 5) cardStyle = "from-emerald-600 to-teal-800 border-emerald-400/30"; // Base
  else if (level <= 10) cardStyle = "from-blue-600 to-indigo-800 border-blue-400/30"; // Intermediário
  else if (level <= 15) cardStyle = "from-violet-600 to-purple-900 border-purple-400/30"; // Avançado
  else cardStyle = "from-slate-900 via-slate-800 to-slate-900 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)]"; // Mestre

  return { level, title, progress, cardStyle, currentLevelXp };
};