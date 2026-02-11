
export const INITIAL_STATS = {
  economy: 50,    
  society: 50,    
  environment: 50 
};

export const POWER_CARDS = [
  {
    id: 'stimulus_package',
    name: 'Pacote de Estímulo',
    description: 'Injeção emergencial de recursos nos cofres estaduais.',
    type: 'boost',
    rarity: 'common',
    cost: 12,
    icon: '💰',
    effect: { stat: 'economy', value: 15 },
    flavor: 'Medida emergencial aprovada em regime de urgência.'
  },
  {
    id: 'social_program',
    name: 'Programa Social',
    description: 'Mutirão de assistência social em todas as regiões.',
    type: 'boost',
    rarity: 'common',
    cost: 12,
    icon: '🤝',
    effect: { stat: 'society', value: 15 },
    flavor: 'A população volta a acreditar na gestão pública.'
  },
  {
    id: 'reforestation',
    name: 'Reflorestamento Express',
    description: 'Ação emergencial de recuperação de áreas degradadas.',
    type: 'boost',
    rarity: 'common',
    cost: 12,
    icon: '🌱',
    effect: { stat: 'environment', value: 15 },
    flavor: 'Milhares de mudas nativas plantadas em tempo recorde.'
  },
  {
    id: 'mega_investment',
    name: 'Mega Investimento',
    description: 'Pacto com investidores internacionais para atrair capital.',
    type: 'boost',
    rarity: 'rare',
    cost: 20,
    icon: '🏦',
    effect: { stat: 'economy', value: 25 },
    flavor: 'Multinacionais anunciam instalação de fábricas no estado.'
  },
  {
    id: 'universal_healthcare',
    name: 'Saúde Universal',
    description: 'Programa emergencial de saúde para todo o estado.',
    type: 'boost',
    rarity: 'rare',
    cost: 20,
    icon: '🏥',
    effect: { stat: 'society', value: 25 },
    flavor: 'Postos de saúde 24h abertos em todas as cidades.'
  },
  {
    id: 'green_revolution',
    name: 'Revolução Verde',
    description: 'Parceria com ONGs para restauração completa do bioma.',
    type: 'boost',
    rarity: 'rare',
    cost: 20,
    icon: '🌿',
    effect: { stat: 'environment', value: 25 },
    flavor: 'Mata Atlântica baiana em processo de regeneração total.'
  },

  // --- NOVAS CARTAS CRIATIVAS (trade-offs e passivas) ---
  {
    id: 'public_private_partnership',
    name: 'PPP Estratégica',
    description: 'Acelera desenvolvimento: +20 Economia, custa -8 Sociedade e -6 Capital.',
    type: 'boost',
    rarity: 'rare',
    cost: 6,
    icon: '🤝🏗️',
    effect: { stat: 'economy', value: 20 },
    specialCost: { society: -8 },
    flavor: 'Obras mais rápidas, porém com desaprovação popular em curto prazo.'
  },
  {
    id: 'cultural_festival',
    name: 'Festival Cultural',
    description: 'Ressalta identidade local: +18 Society, custa -10 Economy (patrocínio público).',
    type: 'boost',
    rarity: 'common',
    cost: 8,
    icon: '🎭',
    effect: { stat: 'society', value: 18 },
    specialCost: { economy: -10 },
    flavor: 'Turismo sobe, mas cofres sentem o gasto.'
  },
  {
    id: 'green_bonds',
    name: 'Green Bonds',
    description: 'Financiamento verde: +10 Environment + passivo +2 Env/turn por 3T; custa -12 Economy.',
    type: 'passive',
    rarity: 'epic',
    cost: 14,
    icon: '🌱💵',
    effect: { passivePerTurn: { environment: 2 }, duration: 3, stat: 'environment', value: 10 },
    specialCost: { economy: -12 },
    flavor: 'Mercado financeiro financia restauração ambiental com retorno social.'
  },
  {
    id: 'tax_reform',
    name: 'Reforma Tributária',
    description: 'Aumenta economia +6/turn por 4T, custa -10 Society e -10 Capital (descontentamento).',
    type: 'passive',
    rarity: 'epic',
    cost: 10,
    icon: '📊',
    effect: { passivePerTurn: { economy: 6 }, duration: 4 },
    specialCost: { society: -10, economy: 0 },
    flavor: 'Medida impopular a curto prazo, que impulsiona crescimento.'
  },
  {
    id: 'infrastructure_bond',
    name: 'Título de Infraestrutura',
    description: 'Grande obra: +30 Economy, -12 Environment, custa -15 Capital.',
    type: 'boost',
    rarity: 'rare',
    cost: 15,
    icon: '🛣️',
    effect: { stat: 'economy', value: 30 },
    specialCost: { environment: -12 },
    flavor: 'Conecta cidades, mas custa caro ao meio ambiente.'
  },
  {
    id: 'debt_consolidation',
    name: 'Consolidação da Dívida',
    description: 'Reduz volatilidade: +15 Capital, custa -10 Economy agora.',
    type: 'capitalRestore',
    rarity: 'common',
    cost: 6,
    icon: '📉',
    effect: { capitalRestore: 15 },
    specialCost: { economy: -10 },
    flavor: 'Trocar dívida cara por prazo maior — alívio político imediato.'
  },
  {
    id: 'research_grants',
    name: 'Editais de Pesquisa',
    description: 'Impulso tecnológico: +12 Economy over time (passivo +3/turn por 3T), custa -6 Capital.',
    type: 'passive',
    rarity: 'rare',
    cost: 8,
    icon: '🔬',
    effect: { passivePerTurn: { economy: 3 }, duration: 3, stat: 'economy', value: 12 },
    flavor: 'Inovação que rende frutos no médio prazo.'
  },
  {
    id: 'urban_clearance',
    name: 'Desapropriação Rápida',
    description: 'Libera terreno para indústria: +25 Economy, custa -15 Society e -10 Environment.',
    type: 'boost',
    rarity: 'epic',
    cost: 18,
    icon: '🏗️',
    effect: { stat: 'economy', value: 25 },
    specialCost: { society: -15, environment: -10 },
    flavor: 'Desenvolvimento à custa de comunidades e áreas verdes.'
  },
  {
    id: 'volunteer_corps',
    name: 'Corpo de Voluntários',
    description: 'Mobilização cidadã: +12 Environment, custa -6 Society (esforço comunitário).',
    type: 'boost',
    rarity: 'common',
    cost: 4,
    icon: '🫱🏻‍🫲🏽',
    effect: { stat: 'environment', value: 12 },
    specialCost: { society: -6 },
    flavor: 'Comunidades se unem para recuperar áreas públicas.'
  },

  // --- CARTAS DE ESCUDO (Proteção temporária) ---
  {
    id: 'economic_shield',
    name: 'Fundo de Reserva',
    description: 'Economia protegida de perdas severas por 3 turnos.',
    type: 'shield',
    rarity: 'rare',
    cost: 18,
    icon: '🛡️',
    effect: { stat: 'economy', duration: 3, minProtection: 15 },
    flavor: 'O fundo soberano absorve as flutuações do mercado.'
  },
  {
    id: 'social_shield',
    name: 'Pacto Social',
    description: 'Sociedade protegida de quedas severas por 3 turnos.',
    type: 'shield',
    rarity: 'rare',
    cost: 18,
    icon: '🏛️',
    effect: { stat: 'society', duration: 3, minProtection: 15 },
    flavor: 'Acordo com sindicatos e movimentos sociais garante estabilidade.'
  },
  {
    id: 'env_shield',
    name: 'Decreto Ambiental',
    description: 'Meio ambiente protegido de danos severos por 3 turnos.',
    type: 'shield',
    rarity: 'rare',
    cost: 18,
    icon: '🌳',
    effect: { stat: 'environment', duration: 3, minProtection: 15 },
    flavor: 'Área de proteção ambiental expandida por decreto.'
  },

  // --- CARTAS DE MULTIPLICADOR ---
  {
    id: 'golden_age',
    name: 'Era de Ouro',
    description: 'Todos os ganhos positivos são DOBRADOS por 2 turnos!',
    type: 'multiplier',
    rarity: 'epic',
    cost: 25,
    icon: '✨',
    effect: { duration: 2, multiplier: 2 },
    flavor: 'Um período de harmonia e prosperidade sem precedentes.'
  },
  {
    id: 'efficiency_boost',
    name: 'Gestão Eficiente',
    description: 'Custo de capital político REDUZIDO pela metade por 3 turnos.',
    type: 'capitalDiscount',
    rarity: 'epic',
    cost: 22,
    icon: '⚡',
    effect: { duration: 3, capitalCostMultiplier: 0.5 },
    flavor: 'Otimização administrativa reduz gastos políticos.'
  },

  // --- CARTAS EMERGENCIAIS ---
  {
    id: 'second_chance',
    name: 'Segunda Chance',
    description: 'Previne um game over, restaurando todos os stats para 30%.',
    type: 'emergency',
    rarity: 'legendary',
    cost: 30,
    icon: '🔮',
    effect: { resetValue: 30 },
    flavor: 'O povo concede mais uma oportunidade ao governador.'
  },
  {
    id: 'political_rally',
    name: 'Comício Popular',
    description: 'Restaura 25 de Capital Político imediatamente.',
    type: 'capitalRestore',
    rarity: 'common',
    cost: 0, // Custa 0 capital pois restaura capital
    icon: '📢',
    effect: { capitalRestore: 25 },
    specialCost: { economy: -8, society: -5 }, // Custa de outros stats
    flavor: 'Discurso inflamado na praça reacende a fé do povo.'
  },

  // --- CARTAS DE EQUILÍBRIO ---
  {
    id: 'balance_act',
    name: 'Lei de Equilíbrio',
    description: 'Equaliza todos os três pilares para a média entre eles.',
    type: 'balance',
    rarity: 'epic',
    cost: 20,
    icon: '⚖️',
    effect: {},
    flavor: 'Um pacto histórico redistribui os recursos igualmente.'
  },
  {
    id: 'minor_balance',
    name: 'Ajuste Fino',
    description: 'Move o pilar mais baixo +10 e o mais alto -10.',
    type: 'rebalance',
    rarity: 'common',
    cost: 10,
    icon: '🔧',
    effect: { transferAmount: 10 },
    flavor: 'Redistribuição moderada de prioridades.'
  },

  // --- CARTA ALEATÓRIA ---
  {
    id: 'wild_card',
    name: 'Carta Coringa',
    description: 'Efeito ALEATÓRIO! Pode ser muito bom... ou muito ruim.',
    type: 'wildcard',
    rarity: 'epic',
    cost: 8,
    icon: '🃏',
    effect: {},
    flavor: 'Se a sorte estiver do seu lado...'
  }
];

export const CARD_RARITIES = {
  common: { label: 'Comum', color: 'slate', glow: '' },
  rare: { label: 'Rara', color: 'blue', glow: 'shadow-blue-500/30' },
  epic: { label: 'Épica', color: 'purple', glow: 'shadow-purple-500/30' },
  legendary: { label: 'Lendária', color: 'amber', glow: 'shadow-amber-500/40' }
};

export const getShopCards = (turn) => {
  const pool = [...POWER_CARDS];
  // Cartas raras/épicas aparecem mais tarde
  const available = pool.filter(c => {
    if (c.rarity === 'legendary' && turn < 5) return false;
    if (c.rarity === 'epic' && turn < 3) return false;
    return true;
  });

  const shuffled = available.sort(() => Math.random() - 0.5);
  // Dinâmica por turno: 1-2 => 3 cartas, 3-4 => 4 cartas, 5-8 => 6 cartas, 9+ => 8 cartas
  let count;
  if (turn <= 2) count = 3;
  else if (turn <= 4) count = 4;
  else if (turn <= 8) count = 6;
  else count = 8;

  // Nunca retornar mais cartas do que as disponíveis
  count = Math.min(count, available.length);
  return shuffled.slice(0, count);
};

export const applyCardEffect = (card, currentStats, activeEffects) => {
  const newStats = { ...currentStats };
  let newEffects = [...activeEffects];

  // Aplicar custos especiais (consome outros status além do capital)
  if (card.specialCost) {
    if (card.specialCost.economy) newStats.economy = Math.max(STATS_LIMITS.MIN + 1, Math.min(STATS_LIMITS.MAX - 1, newStats.economy + card.specialCost.economy));
    if (card.specialCost.society) newStats.society = Math.max(STATS_LIMITS.MIN + 1, Math.min(STATS_LIMITS.MAX - 1, newStats.society + card.specialCost.society));
    if (card.specialCost.environment) newStats.environment = Math.max(STATS_LIMITS.MIN + 1, Math.min(STATS_LIMITS.MAX - 1, newStats.environment + card.specialCost.environment));
  }

  switch (card.type) {
    case 'boost':
      newStats[card.effect.stat] = Math.min(STATS_LIMITS.MAX - 1, Math.max(STATS_LIMITS.MIN + 1, newStats[card.effect.stat] + card.effect.value));
      break;

    case 'shield':
      newEffects.push({
        id: card.id + '_' + Date.now(),
        cardId: card.id,
        type: 'shield',
        stat: card.effect.stat,
        turnsLeft: card.effect.duration,
        minProtection: card.effect.minProtection,
        icon: card.icon,
        name: card.name,
        bg: card.bg
      });
      break;

    case 'multiplier':
      newEffects.push({
        id: card.id + '_' + Date.now(),
        cardId: card.id,
        type: 'multiplier',
        turnsLeft: card.effect.duration,
        multiplier: card.effect.multiplier,
        icon: card.icon,
        name: card.name,
        bg: card.bg
      });
      break;

    case 'capitalDiscount':
      newEffects.push({
        id: card.id + '_' + Date.now(),
        cardId: card.id,
        type: 'capitalDiscount',
        turnsLeft: card.effect.duration,
        capitalCostMultiplier: card.effect.capitalCostMultiplier,
        icon: card.icon,
        name: card.name,
        bg: card.bg
      });
      break;

    case 'emergency':
      newEffects.push({
        id: card.id + '_' + Date.now(),
        cardId: card.id,
        type: 'emergency',
        turnsLeft: 999, // dura pra sempre até ser usado
        resetValue: card.effect.resetValue,
        icon: card.icon,
        name: card.name,
        bg: card.bg
      });
      break;

    case 'capitalRestore':
      newStats.politicalCapital = Math.min(100, newStats.politicalCapital + card.effect.capitalRestore);
      break;

    case 'balance': {
      const avg = Math.round((newStats.economy + newStats.society + newStats.environment) / 3);
      newStats.economy = avg;
      newStats.society = avg;
      newStats.environment = avg;
      break;
    }

    case 'rebalance': {
      const vals = { economy: newStats.economy, society: newStats.society, environment: newStats.environment };
      const low = Object.entries(vals).reduce((a, b) => a[1] < b[1] ? a : b);
      const high = Object.entries(vals).reduce((a, b) => a[1] > b[1] ? a : b);
      newStats[low[0]] = Math.min(STATS_LIMITS.MAX - 1, newStats[low[0]] + card.effect.transferAmount);
      newStats[high[0]] = Math.max(STATS_LIMITS.MIN + 1, newStats[high[0]] - card.effect.transferAmount);
      break;
    }

    case 'passive':
      // cria efeito passivo que aplica um delta por turno
      newStats[card.effect.stat] = card.effect.value ? Math.min(STATS_LIMITS.MAX - 1, Math.max(STATS_LIMITS.MIN + 1, newStats[card.effect.stat] + (card.effect.value || 0))) : newStats[card.effect.stat];
      newEffects.push({
        id: card.id + '_' + Date.now(),
        cardId: card.id,
        type: 'passive',
        turnsLeft: card.effect.duration,
        passivePerTurn: card.effect.passivePerTurn,
        icon: card.icon,
        name: card.name,
        bg: card.bg
      });
      break;

    case 'wildcard': {
      const luck = Math.random();
      if (luck > 0.6) {
        // Boa sorte: +20 em tudo
        newStats.economy = Math.min(STATS_LIMITS.MAX - 1, newStats.economy + 20);
        newStats.society = Math.min(STATS_LIMITS.MAX - 1, newStats.society + 20);
        newStats.environment = Math.min(STATS_LIMITS.MAX - 1, newStats.environment + 20);
      } else if (luck > 0.3) {
        // Sorte média: +15 em stat aleatório
        const stats = ['economy', 'society', 'environment'];
        const randomStat = stats[Math.floor(Math.random() * 3)];
        newStats[randomStat] = Math.min(STATS_LIMITS.MAX - 1, newStats[randomStat] + 15);
      } else {
        // Azar: -10 em tudo
        newStats.economy = Math.max(STATS_LIMITS.MIN + 1, newStats.economy - 10);
        newStats.society = Math.max(STATS_LIMITS.MIN + 1, newStats.society - 10);
        newStats.environment = Math.max(STATS_LIMITS.MIN + 1, newStats.environment - 10);
      }
      break;
    }

    default:
      break;
  }

  return { newStats, newEffects };
};

export const applyActiveEffectsToImpact = (impact, activeEffects) => {
  let modifiedImpact = { ...impact };
  let capitalCostMultiplier = 1;

  activeEffects.forEach(eff => {
    // Multiplicador de ganhos positivos
    if (eff.type === 'multiplier') {
      Object.keys(modifiedImpact).forEach(key => {
        if (modifiedImpact[key] > 0) {
          modifiedImpact[key] = Math.round(modifiedImpact[key] * eff.multiplier);
        }
      });
    }

    // Desconto de capital
    if (eff.type === 'capitalDiscount') {
      capitalCostMultiplier = Math.min(capitalCostMultiplier, eff.capitalCostMultiplier);
    }
  });

  return { modifiedImpact, capitalCostMultiplier };
};

export const applyShieldsToStats = (newStats, activeEffects) => {
  const shielded = { ...newStats };

  activeEffects.forEach(eff => {
    if (eff.type === 'shield' && shielded[eff.stat] < eff.minProtection) {
      shielded[eff.stat] = eff.minProtection;
    }
  });

  return shielded;
};

export const tickActiveEffects = (activeEffects) => {
  return activeEffects
    .map(eff => ({ ...eff, turnsLeft: eff.turnsLeft - 1 }))
    .filter(eff => eff.turnsLeft > 0);
};

export const STATS_LIMITS = {
  MIN: 0,
  MAX: 100
};

export const REGIONS = {
  SALVADOR: "Salvador",
  RMS: "RMS (Recôncavo)",
  SERRAO: "Sertão",
  OESTE: "Oeste Baiano",
  SUL: "Sul da Bahia",
  VALE: "Vale do São Francisco",
  CHAPADA: "Chapada Diamantina",
  LITORAL_NORTE: "Litoral Norte",
  LITORAL_SUL: "Litoral Sul",
  EXTREMO_SUL: "Extremo Sul",
  NORDESTE: "Nordeste Baiano",
  AGUAIAS: "Região dos Lagos"
};

export const CATEGORIES = {
  URBAN_PLANNING: "Planejamento Urbano",
  ENVIRONMENT: "Meio Ambiente",
  WATER_MANAGEMENT: "Gestão Hídrica",
  AGRICULTURE: "Agricultura",
  INDUSTRY: "Indústria",
  TOURISM: "Turismo",
  TRANSPORT: "Transporte",
  ENERGY: "Energia",
  SOCIAL: "Social",
  CULTURE: "Cultura",
  HEALTH: "Saúde",
  EDUCATION: "Educação",
  HOUSING: "Habitação",
  SECURITY: "Segurança",
  FISHING: "Pesca"
};

export const TERRITORY_SCENARIOS = [
  {
    id: 1,
    title: "Crise Hídrica no Sertão",
    description: "Uma seca severa atinge o município de Irecê. Agricultores familiares estão perdendo a safra e falta água na zona urbana. Como você vai agir?",
    region: REGIONS.SERRAO,
    category: CATEGORIES.WATER_MANAGEMENT,
    options: [
      {
        text: "Caminhões-pipa emergenciais",
        feedback: "Resolveu o problema imediato, mas custou caro aos cofres e não criou infraestrutura duradoura.",
        impact: { economy: -15, society: +10, environment: 0 }
      },
      {
        text: "Construção de cisternas e adutoras",
        feedback: "A obra demorou, generando protestos iniciais, mas garantiu segurança hídrica sustentável a longo prazo.",
        impact: { economy: -10, society: +20, environment: +5 }
      }
    ]
  },
  {
    id: 7,
    title: "Favelização em Encostas",
    description: "Comunidades em encostas de Salvador sofrem com deslizamentos na chuva. Moradores resistem à realocação.",
    region: REGIONS.SALVADOR,
    category: CATEGORIES.URBAN_PLANNING,
    options: [
      {
        text: "Remover famílias para conjuntos habitacionais",
        feedback: "Segurança aumentou, mas comunidades tradicionais foram fragmentadas e deslocadas para periferias.",
        impact: { economy: -20, society: -10, environment: +15 }
      },
      {
        text: "Obras de contenção e urbanização in situ",
        feedback: "Custo alto, mas manteve tecido social e preveniu tragédias sem deslocamentos massivos.",
        impact: { economy: -25, society: +15, environment: +10 }
      }
    ]
  },

  {
    id: 8,
    title: "Esgoto no Rio Vermelho",
    description: "Bairro boêmio tem rede de esgoto antiquada, poluindo praias e causando problemas de saúde.",
    region: REGIONS.SALVADOR,
    category: CATEGORIES.ENVIRONMENT,
    options: [
      {
        text: "Intervenção rápida com tubulações convencionais",
        feedback: "Problema resolvido em 6 meses, mas obra superficial causou transtorno ao comércio local.",
        impact: { economy: -10, society: -5, environment: +20 }
      },
      {
        text: "Sistema sustentável com jardins filtrantes",
        feedback: "Obra demorada e cara, mas virou referência nacional em saneamento ecológico.",
        impact: { economy: -25, society: +10, environment: +30 }
      }
    ]
  },

  // 9. Mobilidade Urbana
  {
    id: 9,
    title: "Ciclovias versus Estacionamento",
    description: "Proposta de ciclovia na Avenida Sete exigirá remoção de vagas de estacionamento rotativo.",
    region: REGIONS.SALVADOR,
    category: CATEGORIES.TRANSPORT,
    options: [
      {
        text: "Priorizar estacionamento para comércio",
        feedback: "Comerciantes agradecem, mas cidade perde oportunidade de mobilidade ativa sustentável.",
        impact: { economy: +10, society: -10, environment: -15 }
      },
      {
        text: "Implementar ciclovia com bicicletário",
        feedback: "Protesto inicial de lojistas, mas aumento de movimento de ciclistas revitalizou comércio.",
        impact: { economy: +5, society: +15, environment: +20 }
      }
    ]
  },

  // 10. Patrimônio Histórico
  {
    id: 10,
    title: "Palácio em Ruínas",
    description: "Prédio histórico do século XIX no Centro precisa de restauro urgente. Sem verba pública suficiente.",
    region: REGIONS.SALVADOR,
    category: CATEGORIES.CULTURE,
    options: [
      {
        text: "Concessão para hotel de luxo financiar obra",
        feedback: "Prédio restaurado, mas uso público limitado. Arquitetura original parcialmente alterada.",
        impact: { economy: +15, society: -5, environment: 0 }
      },
      {
        text: "Campanha de financiamento coletivo + verba pública",
        feedback: "Processo lento, mas comunidade se apropriou do patrimônio. Uso será cultural público.",
        impact: { economy: -20, society: +25, environment: +5 }
      }
    ]
  },

  // 11. Desenvolvimento Portuário
  {
    id: 11,
    title: "Expansão do Porto de Salvador",
    description: "Projeto duplicaria capacidade portuária, mas exigiria aterro sobre área de manguezal.",
    region: REGIONS.SALVADOR,
    category: CATEGORIES.INDUSTRY,
    options: [
      {
        text: "Aprovar aterro para competitividade",
        feedback: "Porto vira hub regional, mas manguezal perde 20% de área. Comunidade pesqueira afetada.",
        impact: { economy: +30, society: -15, environment: -25 }
      },
      {
        text: "Exigir projeto alternativo sem aterro",
        feedback: "Custo 40% maior e atraso de 2 anos, mas ecossistema preservado e pescadores mantidos.",
        impact: { economy: -10, society: +10, environment: +20 }
      }
    ]
  },

  // Cenários 12-50: Continuação Salvador/RMS
  {
    id: 12,
    title: "Iluminação Pública Inteligente",
    description: "Proposta de trocar todas as lâmpadas por LED com sensores. Custo inicial alto, economia a longo prazo.",
    region: REGIONS.SALVADOR,
    category: CATEGORIES.ENERGY,
    options: [
      {
        text: "Implementar em toda cidade via PPP",
        feedback: "Controvérsia sobre contrato com empresa privada, mas redução de 60% na conta de energia.",
        impact: { economy: +20, society: +5, environment: +15 }
      },
      {
        text: "Troca gradual com verba municipal",
        feedback: "Processo lento (10 anos), sem polêmica, economia menor no curto prazo.",
        impact: { economy: +5, society: +10, environment: +10 }
      }
    ]
  },

  {
    id: 51,
    title: "Avanço do Deserto",
    description: "Processo de desertificação atinge município de Jeremoabo. Solo se torna infértil, populações migram.",
    region: REGIONS.SERRAO,
    category: CATEGORIES.ENVIRONMENT,
    options: [
      {
        text: "Investir em irrigação massiva",
        feedback: "Recuperou áreas produtivas, mas consumo hídrico triplicou, esgotando aquíferos.",
        impact: { economy: +15, society: +10, environment: -25 }
      },
      {
        text: "Programa de manejo sustentável do solo",
        feedback: "Resultados lentos (5 anos), mas ecossistema se recupera e agricultura se adapta.",
        impact: { economy: -10, society: +5, environment: +30 }
      }
    ]
  },

  // 52. Agricultura de Sequeiro
  {
    id: 52,
    title: "Culturas Resistentes à Seca",
    description: "Pesquisadores propõem substituir milho tradicional por variedades geneticamente adaptadas à seca.",
    region: REGIONS.SERRAO,
    category: CATEGORIES.AGRICULTURE,
    options: [
      {
        text: "Subsídio total para sementes adaptadas",
        feedback: "Produtividade aumentou 40%, mas diversidade genética diminuiu e agricultores endividados.",
        impact: { economy: +20, society: +10, environment: -10 }
      },
      {
        text: "Mistura de sementes tradicionais e adaptadas",
        feedback: "Produtividade moderada (15%), mas resiliência maior e preservação de sementes crioulas.",
        impact: { economy: +5, society: +15, environment: +10 }
      }
    ]
  },

  // 53. Comunidades Quilombolas
  {
    id: 53,
    title: "Regularização Fundiária Quilombola",
    description: "Comunidade quilombola reivindica título de terra há 15 anos. Área cobiçada por fazendeiros.",
    region: REGIONS.SERRAO,
    category: CATEGORIES.SOCIAL,
    options: [
      {
        text: "Titular imediatamente toda área reivindicada",
        feedback: "Justiça histórica feita, mas conflito com produtores rurais gera violência na região.",
        impact: { economy: -15, society: +25, environment: +10 }
      },
      {
        text: "Mediação e demarcação parcial",
        feedback: "Processo lento, mas acordo evita conflitos. Parte da terra permanece em disputa.",
        impact: { economy: -5, society: +10, environment: +5 }
      }
    ]
  },


  {
    id: 151,
    title: "Uso do Rio Grande",
    description: "Produtores querem bombear água do Rio Grande para irrigação em grande escala. Rio já tem vazão reduzida.",
    region: REGIONS.OESTE,
    category: CATEGORIES.WATER_MANAGEMENT,
    options: [
      {
        text: "Autorizar bombas com limites",
        feedback: "Agronegócio expande, mas rio tem trechos que secam completamente no período de estiagem.",
        impact: { economy: +30, society: +5, environment: -35 }
      },
      {
        text: "Permitir apenas irrigação por gotejamento",
        feedback: "Produtores reclamam do custo, mas eficiência hídrica aumenta 70% e rio mantém fluxo.",
        impact: { economy: +10, society: 0, environment: +20 }
      }
    ]
  },

  // 152. Pesticidas versus Saúde
  {
    id: 152,
    title: "Pulverização Aérea",
    description: "Fazendas usam aviões para pulverizar pesticidas. Comunidades próximas relatam doenças respiratórias.",
    region: REGIONS.OESTE,
    category: CATEGORIES.HEALTH,
    options: [
      {
        text: "Banir pulverização aérea",
        feedback: "Saúde pública melhorou, mas custo de produção agrícola aumentou 25%.",
        impact: { economy: -20, society: +25, environment: +15 }
      },
      {
        text: "Restringir horários e distâncias",
        feedback: "Equilíbrio razoável, mas monitoramento deficiente permite violações frequentes.",
        impact: { economy: 0, society: +5, environment: +5 }
      }
    ]
  },

  {
    id: 251,
    title: "Cacau sob Mata Atlântica",
    description: "Sistema tradicional de cultivo de cacau sob floresta nativa está ameaçado por doenças e baixa produtividade.",
    region: REGIONS.SUL,
    category: CATEGORIES.AGRICULTURE,
    options: [
      {
        text: "Incentivar cacau clonal a pleno sol",
        feedback: "Produtividade triplica, mas mata atlântica é derrubada e biodiversidade desaparece.",
        impact: { economy: +35, society: -10, environment: -40 }
      },
      {
        text: "Investir em pesquisa para cabruca resistente",
        feedback: "Produtividade aumenta modestamente (30%), mas sistema agroflorestal é preservado.",
        impact: { economy: +10, society: +15, environment: +30 }
      }
    ]
  },

  {
    id: 252,
    title: "Resort em Praia Deserta",
    description: "Grupo hoteleiro quer construir resort 5 estrelas em praia isolada com ecossistema preservado.",
    region: REGIONS.SUL,
    category: CATEGORIES.TOURISM,
    options: [
      {
        text: "Aprovar com EIA limitado",
        feedback: "300 empregos diretos criados, mas praia perde acesso público e tartarugas marinhas afetadas.",
        impact: { economy: +25, society: +5, environment: -20 }
      },
      {
        text: "Exigir compensação ambiental rigorosa",
        feedback: "Resort menor e mais caro, mas área preservada em dobro e empregos sustentáveis.",
        impact: { economy: +10, society: +15, environment: +15 }
      }
    ]
  },

  {
    id: 351,
    title: "Expansão da Uva no Vale",
    description: "Produtores querem triplicar área de vinhedos. Água vem do Rio São Francisco, já com conflitos de uso.",
    region: REGIONS.VALE,
    category: CATEGORIES.AGRICULTURE,
    options: [
      {
        text: "Ampliar outorgas de água",
        feedback: "Vale se torna maior exportador de uva do NE, mas rio atinge níveis críticos em trecho baiano.",
        impact: { economy: +40, society: +10, environment: -30 }
      },
      {
        text: "Limitar expansão e incentivar eficiência",
        feedback: "Crescimento controlado, tecnologia de irrigação avança, conflitos por água diminuem.",
        impact: { economy: +15, society: +5, environment: +20 }
      }
    ]
  },

  {
    id: 451,
    title: "Sobrecarga na Fumaça",
    description: "Cachoeira da Fumaça em Lençóis recebe 3x sua capacidade sustentável. Trilhas degradadas, lixo acumulado.",
    region: REGIONS.CHAPADA,
    category: CATEGORIES.TOURISM,
    options: [
      {
        text: "Limitar visitantes com agendamento",
        feedback: "Experiência turística melhorou, mas comércio local reclama da redução de movimento.",
        impact: { economy: -10, society: +5, environment: +25 }
      },
      {
        text: "Cobrar taxa alta de visitação",
        feedback: "Arrecadação financia manutenção, mas turismo fica elitizado e comunidade excluída.",
        impact: { economy: +15, society: -15, environment: +20 }
      }
    ]
  },

  {
    id: 551,
    title: "Carcinicultura em Manguezais",
    description: "Fazendas de camarão querem se expandir sobre manguezais. Geração de emprego versus ecossistema crítico.",
    region: REGIONS.LITORAL_NORTE,
    category: CATEGORIES.FISHING,
    options: [
      {
        text: "Permitir em áreas já degradadas",
        feedback: "Empregos gerados, mas recuperação natural dos mangues é impedida indefinidamente.",
        impact: { economy: +20, society: +10, environment: -25 }
      },
      {
        text: "Exigir tanques em terra, longe do mangue",
        feedback: "Custo de produção maior, mas manguezais se recuperam e serviços ecossistêmicos mantidos.",
        impact: { economy: +5, society: +5, environment: +30 }
      }
    ]
  },

  {
    id: 651,
    title: "Megaprojeto Portuário",
    description: "Porto Sul previsto para escoar minério do interior. Impacto em recifes de coral e comunidades pesqueiras.",
    region: REGIONS.LITORAL_SUL,
    category: CATEGORIES.INDUSTRY,
    options: [
      {
        text: "Acelerar licenciamento",
        feedback: "Investimentos bilionários chegam, mas pesca artesanal desaparece e corais são soterrados.",
        impact: { economy: +50, society: -20, environment: -40 }
      },
      {
        text: "Revisar estudo de impacto com participação social",
        feedback: "Projeto atrasa 3 anos, mas compensações ambientais robustas e reassentamento digno.",
        impact: { economy: +10, society: +15, environment: +5 }
      }
    ]
  },

  {
    id: 751,
    title: "Turismo em Unidade de Conservação",
    description: "Parque Nacional tem baixa visitação. ICMBio propõe concessão para iniciativa privada explorar turismo.",
    region: REGIONS.EXTREMO_SUL,
    category: CATEGORIES.TOURISM,
    options: [
      {
        text: "Concessão por 30 anos",
        feedback: "Infraestrutura turística de qualidade, mas preços altos excluem população local.",
        impact: { economy: +20, society: -10, environment: +15 }
      },
      {
        text: "Gestão compartilhada com comunidade",
        feedback: "Crescimento lento, mas turismo de base comunitária gera renda local direta.",
        impact: { economy: +5, society: +25, environment: +20 }
      }
    ]
  },

  {
    id: 801,
    title: "Plano de Adaptação Climática",
    description: "Cidade precisa se preparar para extremos climáticos: enchentes e secas mais intensas. Recursos limitados.",
    region: "Transversal",
    category: CATEGORIES.ENVIRONMENT,
    options: [
      {
        text: "Foco em obras de drenagem",
        feedback: "Protege áreas centrais, mas periferias continuam vulneráveis. Solução parcial.",
        impact: { economy: -25, society: +10, environment: +5 }
      },
      {
        text: "Combinação: infraestrutura + políticas sociais",
        feedback: "Abordagem integrada, mais cara, mas reduz vulnerabilidade de forma mais equitativa.",
        impact: { economy: -35, society: +25, environment: +15 }
      }
    ]
  },

  {
    id: 802,
    title: "Gestão de Resíduos Sólidos",
    description: "Aterro sanitário atingirá capacidade em 2 anos. Decisão sobre futuro do lixo da cidade.",
    region: "Transversal",
    category: CATEGORIES.ENVIRONMENT,
    options: [
      {
        text: "Construir novo aterro em área rural",
        feedback: "Solução rápida, mas transportar lixo custa caro e gera conflito com comunidade receptora.",
        impact: { economy: -20, society: -10, environment: -15 }
      },
      {
        text: "Investir em coleta seletiva e reciclagem",
        feedback: "Cria empregos verdes, reduz volume do aterro em 60%, mas exige educação ambiental massiva.",
        impact: { economy: -10, society: +20, environment: +30 }
      }
    ]
  },
  {
    id: 850,
    title: "Legado da Gestão",
    description: "Final do mandato. Como você quer ser lembrado? Qual investimento fará com recursos remanescentes?",
    region: "Bahia",
    category: CATEGORIES.SOCIAL,
    options: [
      {
        text: "Grande obra icônica (estádio/museu)",
        feedback: "Nome na placa inaugurativa, mas recurso não resolve problemas estruturais da população.",
        impact: { economy: -30, society: +5, environment: 0 }
      },
      {
        text: "Investir em todas as escolas municipais",
        feedback: "Melhora silenciosa, resultados aparecem em 10 anos, mas transforma gerações futuras.",
        impact: { economy: -25, society: +40, environment: +5 }
      },
      {
        text: "Fundo emergencial para calamidades",
        feedback: "Gestão responsável, cidade mais resiliente, mas população não vê obra palpável.",
        impact: { economy: -15, society: +20, environment: +10 }
      }
    ]
  }
];

export const getRandomScenario = () => {
  const randomIndex = Math.floor(Math.random() * TERRITORY_SCENARIOS.length);
  return TERRITORY_SCENARIOS[randomIndex];
};

export const getScenariosByRegion = (region) => {
  return TERRITORY_SCENARIOS.filter(scenario => scenario.region === region);
};

export const getScenariosByCategory = (category) => {
  return TERRITORY_SCENARIOS.filter(scenario => scenario.category === category);
};

export const updateStats = (currentStats, impact) => {
  const newStats = {
    economy: Math.max(STATS_LIMITS.MIN, Math.min(STATS_LIMITS.MAX, currentStats.economy + impact.economy)),
    society: Math.max(STATS_LIMITS.MIN, Math.min(STATS_LIMITS.MAX, currentStats.society + impact.society)),
    environment: Math.max(STATS_LIMITS.MIN, Math.min(STATS_LIMITS.MAX, currentStats.environment + impact.environment))
  };
  
  return newStats;
};

export const checkGameOver = (stats) => {
  return stats.economy <= STATS_LIMITS.MIN || 
         stats.society <= STATS_LIMITS.MIN || 
         stats.environment <= STATS_LIMITS.MIN ||
         stats.economy >= STATS_LIMITS.MAX || 
         stats.society >= STATS_LIMITS.MAX || 
         stats.environment >= STATS_LIMITS.MAX;
};

export const getGameOverMessage = (stats) => {
  if (stats.economy <= STATS_LIMITS.MIN) return "Falência municipal! Recursos esgotados.";
  if (stats.society <= STATS_LIMITS.MIN) return "Revolta popular! População se rebela contra gestão.";
  if (stats.environment <= STATS_LIMITS.MIN) return "Colapso ambiental! Desastres naturais inviabilizam cidade.";
  if (stats.economy >= STATS_LIMITS.MAX) return "Tecnocracia econômica! Cidade virou empresa, perdeu alma social.";
  if (stats.society >= STATS_LIMITS.MAX) return "Utopia social! Recursos não sustentam programas.";
  if (stats.environment >= STATS_LIMITS.MAX) return "Preservacionismo radical! Desenvolvimento estagnado.";
  return "Fim de mandato alcançado!";
};

export const DIFFICULTY_PRESETS = {
  easy: {
    label: 'Fácil',
    description: 'Mais capital inicial, impactos amenizados, loja mais acessível.',
    startingCapital: 140,
    impactMultiplier: 0.7,        // reduz magnitude dos impactos
    capitalCostMultiplier: 0.8,   // ações custam menos capital
    shopCostMultiplier: 0.85,
    randomEventChance: 0.6,       // menos eventos negativos
    mandateLengthMultiplier: 0.9  // mandato ligeiramente mais curto (menos risco por turno)
  },
  medium: {
    label: 'Médio',
    description: 'Experiência padrão — equilíbrio entre risco e recompensa.',
    startingCapital: 100,
    impactMultiplier: 1.0,
    capitalCostMultiplier: 1.0,
    shopCostMultiplier: 1.0,
    randomEventChance: 1.0,
    mandateLengthMultiplier: 1.0
  },
  hard: {
    label: 'Difícil',
    description: 'Menos capital inicial, impactos mais severos e loja mais cara.',
    startingCapital: 70,
    impactMultiplier: 1.25,
    capitalCostMultiplier: 1.25,
    shopCostMultiplier: 1.2,
    randomEventChance: 1.4,
    mandateLengthMultiplier: 1.2
  },
  expert: {
    label: 'Expert',
    description: 'Desafio máximo: recursos escassos, eventos agressivos — só para veteranos.',
    startingCapital: 50,
    impactMultiplier: 1.5,
    capitalCostMultiplier: 1.5,
    shopCostMultiplier: 1.4,
    randomEventChance: 1.8,
    mandateLengthMultiplier: 1.3
  }
};

export const getDifficultyModifiers = (difficulty = 'medium') => {
  return DIFFICULTY_PRESETS[difficulty] || DIFFICULTY_PRESETS.medium;
};

export const scaleImpactByDifficulty = (impact = {}, difficulty = 'medium') => {
  const m = getDifficultyModifiers(difficulty).impactMultiplier || 1;
  return {
    economy: Math.round((impact.economy || 0) * m),
    society: Math.round((impact.society || 0) * m),
    environment: Math.round((impact.environment || 0) * m)
  };
};

export const applyDifficultyToInitialStats = (baseStats = {}, difficulty = 'medium') => {
  const mods = getDifficultyModifiers(difficulty);
  return {
    ...baseStats,
    politicalCapital: typeof baseStats.politicalCapital === 'number' ? Math.max(0, Math.round(mods.startingCapital)) : mods.startingCapital
  };
};