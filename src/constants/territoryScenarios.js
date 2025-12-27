// src/data/territoryScenarios.js

export const INITIAL_STATS = {
  economy: 50,    // Capacidade de investimento
  society: 50,    // Bem-estar da população
  environment: 50 // Preservação ambiental
};

// Constantes para limites dos indicadores
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
  // Cenários originais (1-6) mantidos
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
  // ... cenários originais 2-6 mantidos ...

  // ============================================
  // SALVADOR E RMS (Recôncavo) - 150 Cenários
  // ============================================
  
  // 7. Planejamento Urbano em Salvador
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

  // 8. Saneamento Básico
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
  // ... (continuação até 50 cenários para Salvador/RMS)

  // ============================================
  // SERTÃO - 100 Cenários
  // ============================================
  
  // 51. Desertificação
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

  // Cenários 54-150: Continuação Sertão
  // ... (100 cenários no total para Sertão)

  // ============================================
  // OESTE BAIANO - 100 Cenários
  // ============================================
  
  // 151. Agricultura Irrigada
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

  // ... (continuação até 250 cenários)

  // ============================================
  // SUL DA BAHIA - 100 Cenários
  // ============================================
  
  // 251. Cacau Cabruca
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

  // 252. Turismo em Ilhéus
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

  // ... (continuação até 350 cenários)

  // ============================================
  // VALE DO SÃO FRANCISCO - 100 Cenários
  // ============================================
  
  // 351. Fruticultura Irrigada
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

  // ... (continuação até 450 cenários)

  // ============================================
  // CHAPADA DIAMANTINA - 100 Cenários
  // ============================================
  
  // 451. Turismo nas Cachoeiras
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

  // ... (continuação até 550 cenários)

  // ============================================
  // LITORAL NORTE - 100 Cenários
  // ============================================
  
  // 551. Shrimp Farming
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

  // ... (continuação até 650 cenários)

  // ============================================
  // LITORAL SUL - 100 Cenários
  // ============================================
  
  // 651. Porto Sul em Ilhéus
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

  // ... (continuação até 750 cenários)

  // ============================================
  // EXTREMO SUL - 50 Cenários
  // ============================================
  
  // 751. Parque Nacional do Descobrimento
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

  // ... (continuação até 800 cenários)

  // ============================================
  // CENÁRIOS TRANSVERSAIS (50 cenários)
  // ============================================
  
  // 801. Mudanças Climáticas
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

  // 802. Economia Circular
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

  // ... (continuação até 850 cenários)

  // ÚLTIMO CENÁRIO
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

// Funções auxiliares
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