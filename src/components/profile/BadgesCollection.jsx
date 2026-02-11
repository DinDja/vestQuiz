import { useState, useMemo } from 'react';
import { Award, ChevronLeft, ChevronRight, Filter, CheckCircle2, Lock, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeModal } from './BadgeModal';
import { getBadgeClasses } from '../../utils/badgeStyles';

// ─── Mapeamento de categorias ────────────────────────────────────────────────
const BADGE_CATEGORIES = [
  { key: 'all', label: 'Todas', icon: '🏅' },
  { key: 'disciplinas', label: 'Disciplinas', icon: '📚' },
  { key: 'tematicas', label: 'Temáticas', icon: '🌎' },
  { key: 'habilidades', label: 'Habilidades', icon: '🧠' },
  { key: 'regioes', label: 'Regiões', icon: '🗺️' },
  { key: 'progressao', label: 'Progressão', icon: '📈' },
  { key: 'milestones', label: 'Milestones', icon: '🏆' },
  { key: 'eventos', label: 'Eventos', icon: '🎉' },
  { key: 'comunidade', label: 'Comunidade', icon: '🤝' },
  { key: 'geo-command', label: 'Geo-Command', icon: '🌍' },
  { key: 'territorio', label: 'Território', icon: '🏛️' },
];

const STATUS_FILTERS = [
  { key: 'all', label: 'Todas' },
  { key: 'unlocked', label: 'Desbloqueadas' },
  { key: 'locked', label: 'Bloqueadas' },
];

const ITEMS_PER_PAGE = 12;

/**
 * Classifica automaticamente cada badge em sua categoria
 */
function categorizeBadge(badge) {
  const id = badge.id;
  // Disciplinas
  if (/^badge-(matematica|geografia|historia|biologia|linguagens|sociologia|filosofia)/.test(id)) return 'disciplinas';
  // Temáticas transversais
  if (['badge-cultura-afro', 'badge-meio-ambiente', 'badge-questao-social', 'badge-economia-regional'].includes(id)) return 'tematicas';
  // Habilidades cognitivas
  if (['badge-analista', 'badge-aplicador', 'badge-avaliador', 'badge-criador'].includes(id)) return 'habilidades';
  // Regiões
  if (['badge-salvador', 'badge-sertao', 'badge-chapada', 'badge-litoral'].includes(id)) return 'regioes';
  // Progressão
  if (['badge-iniciante-total', 'badge-intermediario-total', 'badge-avancado-total', 'badge-perfeccionista', 'badge-multidisciplinar', 'badge-rapido', 'badge-consistente', 'badge-explorador'].includes(id)) return 'progressao';
  // Milestones
  if (/^badge-(primeiros|xp-)/.test(id)) return 'milestones';
  // Eventos
  if (['badge-independencia', 'badge-sao-joao', 'badge-carnaval'].includes(id) || badge.event) return 'eventos';
  // Comunidade
  if (['badge-colaborador', 'badge-desafio-semanal', 'badge-mentor', 'badge-pergunta-boa', 'badge-feedback'].includes(id)) return 'comunidade';
  // Geo-Command
  if (id.startsWith('geo-')) return 'geo-command';
  // Território
  if (id.startsWith('territory-')) return 'territorio';

  return 'progressao'; // fallback
}

export const BadgesCollection = ({ badges, userBadges, isDark }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Categoriza todos os badges
  const categorizedBadges = useMemo(() => {
    const map = {};
    badges.forEach(badge => {
      const cat = categorizeBadge(badge);
      if (!map[cat]) map[cat] = [];
      map[cat].push(badge);
    });
    return map;
  }, [badges]);

  // Contagem por categoria (todas x desbloqueadas)
  const categoryCounts = useMemo(() => {
    const counts = { all: { total: badges.length, unlocked: 0 } };
    badges.forEach(badge => {
      const cat = categorizeBadge(badge);
      if (!counts[cat]) counts[cat] = { total: 0, unlocked: 0 };
      counts[cat].total++;
      counts.all.total; // já setado
      if (userBadges?.includes(badge.id)) {
        counts[cat].unlocked++;
        counts.all.unlocked++;
      }
    });
    return counts;
  }, [badges, userBadges]);

  // Badge filtrado final
  const filteredBadges = useMemo(() => {
    let result = activeCategory === 'all' ? [...badges] : (categorizedBadges[activeCategory] || []);

    // Filtro de status
    if (statusFilter === 'unlocked') {
      result = result.filter(b => userBadges?.includes(b.id));
    } else if (statusFilter === 'locked') {
      result = result.filter(b => !userBadges?.includes(b.id));
    }

    // Filtro de busca
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(b =>
        b.name.toLowerCase().includes(term) ||
        b.desc.toLowerCase().includes(term)
      );
    }

    return result;
  }, [activeCategory, statusFilter, searchTerm, badges, userBadges, categorizedBadges]);

  // Paginação
  const totalPages = Math.max(1, Math.ceil(filteredBadges.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedBadges = filteredBadges.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  // Reset da página ao trocar filtro
  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setCurrentPage(1);
  };

  const handleStatusChange = (key) => {
    setStatusFilter(key);
    setCurrentPage(1);
  };

  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBadge(null), 300);
  };

  const activeCatObj = BADGE_CATEGORIES.find(c => c.key === activeCategory);
  const catCount = categoryCounts[activeCategory] || { total: 0, unlocked: 0 };

  return (
    <>
      <section className={`rounded-3xl border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="p-5 pb-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
              <Award size={14} className="text-indigo-500" /> Medalhas Coletadas
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                {userBadges?.length || 0} / {badges.length}
              </span>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-1.5 rounded-lg transition-colors ${
                  showFilters
                    ? 'bg-indigo-500 text-white'
                    : isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                <Filter size={13} />
              </button>
            </div>
          </div>

          {/* ── Barra de busca + filtro de status (colapsável) ────── */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {/* Search */}
                <div className={`flex items-center gap-2 rounded-xl px-3 py-2 mb-3 border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <Search size={14} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                  <input
                    type="text"
                    placeholder="Buscar medalha..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className={`flex-1 bg-transparent text-xs outline-none placeholder:text-slate-500 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}
                  />
                  {searchTerm && (
                    <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }}>
                      <X size={14} className={isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} />
                    </button>
                  )}
                </div>

                {/* Status filter pills */}
                <div className="flex gap-2 mb-3">
                  {STATUS_FILTERS.map(f => (
                    <button
                      key={f.key}
                      onClick={() => handleStatusChange(f.key)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                        statusFilter === f.key
                          ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                          : isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {f.key === 'unlocked' && <CheckCircle2 size={10} className="inline mr-1 -mt-0.5" />}
                      {f.key === 'locked' && <Lock size={10} className="inline mr-1 -mt-0.5" />}
                      {f.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Filtro por Categoria (scroll horizontal) ──────────── */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-3 -mx-1 px-1">
            {BADGE_CATEGORIES.map(cat => {
              const count = categoryCounts[cat.key] || { total: 0, unlocked: 0 };
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                      : isDark
                        ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700/50'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`ml-0.5 text-[9px] ${isActive ? 'text-white/70' : isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                    {count.unlocked}/{count.total}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Subtítulo da Categoria Ativa ────────────────────────── */}
        <div className={`px-5 py-2 border-t ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
          <div className="flex items-center justify-between">
            <p className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span className="mr-1">{activeCatObj?.icon}</span>
              {activeCatObj?.label} — {catCount.unlocked} de {catCount.total} desbloqueadas
            </p>
            {filteredBadges.length !== catCount.total && (
              <span className={`text-[9px] font-bold ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                {filteredBadges.length} resultado{filteredBadges.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* ── Grid de Badges ─────────────────────────────────────── */}
        <div className="p-5 pt-4">
          {paginatedBadges.length === 0 ? (
            <div className={`text-center py-8 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
              <Lock size={28} className="mx-auto mb-2 opacity-50" />
              <p className="text-xs font-bold">Nenhuma medalha encontrada</p>
              <p className="text-[10px] mt-1">Altere os filtros para ver mais resultados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              <AnimatePresence mode="popLayout">
                {paginatedBadges.map((badge) => {
                  const isUnlocked = userBadges?.includes(badge.id);
                  return (
                    <motion.div
                      key={badge.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBadgeClick(badge)}
                      className={`relative aspect-square rounded-2xl border flex flex-col items-center justify-center gap-1 p-1.5 text-center transition-all cursor-pointer ${
                        isUnlocked
                          ? getBadgeClasses(badge.rarity || 'common', { isDark, variant: 'card' }).container
                          : isDark
                            ? 'bg-slate-950 border-slate-800 text-slate-700 opacity-40 hover:opacity-60'
                            : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      <span className={`text-xl ${!isUnlocked ? 'grayscale' : ''}`}>{badge.icon}</span>
                      <span className="text-[7px] font-black uppercase leading-tight line-clamp-2">{badge.name}</span>
                      {!isUnlocked && (
                        <div className="absolute top-1 right-1">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                            <Lock size={8} className={isDark ? 'text-slate-600' : 'text-slate-400'} />
                          </div>
                        </div>
                      )}
                      {isUnlocked && (
                        <div className="absolute top-1 right-1">
                          <div className={getBadgeClasses(badge.rarity || 'common', { isDark, variant: 'card' }).icon.replace('mb-1 flex-shrink-0','w-4 h-4 rounded-full flex items-center justify-center') + ' bg-none'}>
                            <CheckCircle2 size={8} className="text-white" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* ── Paginação ──────────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-5">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className={`p-1.5 rounded-lg transition-colors ${
                  safePage <= 1
                    ? isDark ? 'text-slate-700 cursor-not-allowed' : 'text-slate-300 cursor-not-allowed'
                    : isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-[11px] font-black transition-all ${
                    page === safePage
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                      : isDark
                        ? 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                        : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className={`p-1.5 rounded-lg transition-colors ${
                  safePage >= totalPages
                    ? isDark ? 'text-slate-700 cursor-not-allowed' : 'text-slate-300 cursor-not-allowed'
                    : isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          <p className={`text-[9px] text-center mt-4 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            Clique em uma medalha para ver os detalhes
          </p>
        </div>
      </section>

      <BadgeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        badge={selectedBadge}
        isUnlocked={selectedBadge ? userBadges?.includes(selectedBadge.id) : false}
        isDark={isDark}
      />
    </>
  );
};