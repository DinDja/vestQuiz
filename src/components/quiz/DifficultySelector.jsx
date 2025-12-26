import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Target, Play, ArrowLeft, Info } from 'lucide-react';

// DICIONÁRIO DE TRADUÇÃO DE HABILIDADES (BNCC / DCRB)
// Adicione aqui as descrições conforme a base de dados
export const SKILL_MAP = {
    'all': 'Todas as Habilidades',

    // ================================
    // DCRB BAHIA - HABILIDADES ESPECÍFICAS
    // ================================

    // GEOGRAFIA BAIANA
    'DCRB-GEO-01': 'Analisar a organização espacial da Bahia considerando os 27 Territórios de Identidade e suas dinâmicas socioeconômicas.',
    'DCRB-GEO-02': 'Identificar e analisar os biomas baianos (Caatinga, Cerrado, Mata Atlântica) e suas características ambientais.',
    'DCRB-GEO-03': 'Compreender os sistemas climáticos e hidrográficos do estado, com ênfase no semiárido e bacias hidrográficas.',
    'DCRB-GEO-04': 'Analisar a formação e expansão do Polo Petroquímico de Camaçari e seus impactos regionais.',
    'DCRB-GEO-05': 'Investigar os processos históricos de ocupação territorial e formação das cidades baianas.',
    'DCRB-GEO-06': 'Analisar as atividades econômicas regionais: agronegócio, turismo, indústria e economia criativa.',
    'DCRB-GEO-07': 'Compreender a dinâmica urbana das metrópoles baianas (Salvador, Feira, Vitória da Conquista) e seus desafios.',
    'DCRB-GEO-08': 'Analisar a infraestrutura de transportes e logística no desenvolvimento territorial baiano.',
    'DCRB-GEO-09': 'Investigar a gestão dos recursos hídricos, com foco no Rio São Francisco e conflitos pelo uso da água.',
    'DCRB-GEO-10': 'Avaliar os impactos ambientais das atividades humanas e políticas de conservação nos biomas baianos.',
    'DCRB-GEO-11': 'Analisar a posição geopolítica da Bahia no contexto nacional e internacional.',
    'DCRB-GEO-12': 'Compreender a importância das unidades de conservação e áreas protegidas no território baiano.',
    'DCRB-GEO-13': 'Investigar as territorialidades específicas de comunidades tradicionais (quilombolas, indígenas, fundos de pasto).',
    'DCRB-GEO-14': 'Analisar o turismo como atividade econômica e seus impactos socioambientais no litoral e interior.',

    // HISTÓRIA BAIANA
    'DCRB-HIS-01': 'Compreender os processos metodológicos da pesquisa histórica aplicados à realidade baiana.',
    'DCRB-HIS-02': 'Analisar a Independência da Bahia (2 de Julho) em suas dimensões política, social e cultural.',
    'DCRB-HIS-03': 'Investigar a formação da sociedade colonial baiana: economia açucareira, escravidão e resistência.',
    'DCRB-HIS-04': 'Analisar os movimentos de contestação colonial (Conjuração Baiana/Revolta dos Búzios).',
    'DCRB-HIS-05': 'Estudar a resistência negra através dos quilombos e irmandades na Bahia colonial e imperial.',
    'DCRB-HIS-06': 'Compreender a formação do Estado nacional e as rebeliões provinciais na Bahia do século XIX.',
    'DCRB-HIS-07': 'Analisar os movimentos sociais do sertão (cangaço, Canudos, Contestado) e suas interpretações.',
    'DCRB-HIS-08': 'Investigar o patrimônio histórico e cultural baiano como fonte de memória e identidade.',
    'DCRB-HIS-09': 'Analisar a produção cultural e intelectual baiana e sua contribuição para a formação nacional.',
    'DCRB-HIS-10': 'Compreender a história recente da Bahia: urbanização, industrialização e movimentos sociais contemporâneos.',

    // SOCIOLOGIA BAIANA
    'DCRB-SOC-01': 'Analisar a formação social baiana a partir das relações étnico-raciais e de classe.',
    'DCRB-SOC-02': 'Compreender os processos de modernização e desenvolvimento desigual na Bahia.',
    'DCRB-SOC-03': 'Aplicar conceitos sociológicos (habitus, campo, capital) à análise da cultura baiana.',
    'DCRB-SOC-04': 'Investigar as manifestações do racismo estrutural e as lutas antirracistas na Bahia.',
    'DCRB-SOC-05': 'Analisar as religiões de matriz africana como instituições sociais e espaços de resistência.',
    'DCRB-SOC-06': 'Compreender a economia baiana na perspectiva da teoria da dependência e desenvolvimento regional.',
    'DCRB-SOC-07': 'Analisar os processos de urbanização e segregação socioespacial nas cidades baianas.',
    'DCRB-SOC-08': 'Investigar os movimentos sociais contemporâneos e suas estratégias de ação coletiva.',
    'DCRB-SOC-09': 'Compreender as relações de gênero e sexualidade no contexto da sociedade baiana.',
    'DCRB-SOC-10': 'Analisar as desigualdades no acesso à educação, saúde e cultura no estado.',
    'DCRB-SOC-11': 'Investigar as dinâmicas da violência e políticas de segurança pública na Bahia.',
    'DCRB-SOC-12': 'Compreender o funcionamento do sistema político e as culturas políticas baianas.',

    // FILOSOFIA BAIANA
    'DCRB-FIL-01': 'Refletir sobre o sincretismo religioso e cultural como fenômeno filosófico baiano.',
    'DCRB-FIL-02': 'Conhecer e aplicar contribuições da filosofia africana e indígena ao pensamento baiano.',
    'DCRB-FIL-03': 'Analisar problemas éticos contemporâneos a partir da realidade social baiana.',
    'DCRB-FIL-04': 'Compreender questões de identidade, alteridade e reconhecimento no contexto baiano.',
    'DCRB-FIL-05': 'Debater teorias da justiça aplicadas às desigualdades regionais e sociais da Bahia.',
    'DCRB-FIL-06': 'Refletir sobre conceitos de liberdade e determinismo a partir das migrações e secas.',
    'DCRB-FIL-07': 'Analisar ideologias e discursos políticos na formação do imaginário social baiano.',
    'DCRB-FIL-08': 'Compreender teorias do poder e dominação nas relações sociais do estado.',
    'DCRB-FIL-09': 'Refletir sobre ciência, tecnologia e seus impactos no desenvolvimento baiano.',
    'DCRB-FIL-10': 'Analisar questões estéticas na produção cultural e artística baiana.',
    'DCRB-FIL-11': 'Investigar problemas filosóficos relacionados à memória, história e esquecimento.',

    // ================================
    // BNCC - HABILIDADES GERAIS
    // ================================

    // LINGUAGENS E SUAS TECNOLOGIAS
    'EM13LGG101': 'Analisar criticamente textos de diferentes gêneros discursivos.',
    'EM13LGG102': 'Compreender processos de produção e circulação de discursos nas diversas linguagens.',
    'EM13LGG103': 'Produzir textos analíticos e argumentativos em diferentes linguagens.',
    'EM13LGG201': 'Utilizar diversas linguagens para expressar e partilhar informações.',
    'EM13LGG202': 'Analisar criticamente interesses e processos de manipulação em textos e mídias.',
    'EM13LGG203': 'Participar de diálogos e processos de negociação para resolução de conflitos.',
    'EM13LGG301': 'Participar de processos de produção autoral em diferentes linguagens e mídias.',
    'EM13LGG302': 'Posicionar-se criticamente diante de diversas visões de mundo presentes em textos.',
    'EM13LGG303': 'Debater questões polêmicas de relevância social, respeitando diferentes opiniões.',
    'EM13LGG304': 'Reconhecer a variação linguística como fenômeno social, histórico e cultural.',
    'EM13LGG401': 'Analisar criticamente textos de modo a compreender sua dimensão ética e estética.',
    'EM13LGG402': 'Empregar linguagens para o combate à discriminação e à violência.',
    'EM13LGG501': 'Selecionar e utilizar movimentos corporais de forma autônoma para lazer e saúde.',
    'EM13LGG601': 'Apropriar-se do patrimônio artístico nacional e internacional de forma crítica.',
    'EM13LGG602': 'Valorizar as manifestações artísticas locais e regionais como parte da identidade.',
    'EM13LGG603': 'Expressar-se e partilhar informações, sentimentos e ideias através de artes.',
    'EM13LGG701': 'Explorar tecnologias digitais de informação e comunicação de forma ética e estética.',
    'EM13LGG702': 'Avaliar o papel das tecnologias digitais na vida contemporânea e na cultura.',
    'EM13LGG703': 'Utilizar mídias digitais para a produção de conhecimentos e projetos sociais.',

    // MATEMÁTICA E SUAS TECNOLOGIAS
    'EM13MAT101': 'Interpretar criticamente situações econômicas e sociais com base em modelos matemáticos.',
    'EM13MAT102': 'Analisar tabelas, gráficos e dados sobre variáveis econômicas e sociais.',
    'EM13MAT103': 'Interpretar e comparar criticamente distribuições estatísticas de variáveis sociais.',
    'EM13MAT104': 'Interpretar taxas e índices de natureza socioeconômica para análise de dados.',
    'EM13MAT105': 'Elaborar e interpretar modelos matemáticos para prever a evolução de variáveis.',
    'EM13MAT201': 'Resolver problemas envolvendo geometria plana e espacial em contextos reais.',
    'EM13MAT202': 'Utilizar conceitos geométricos para análise e interpretação de fenômenos naturais.',
    'EM13MAT203': 'Calcular volumes, áreas e perímetros em situações contextualizadas.',
    'EM13MAT301': 'Compreender e utilizar funções para modelar situações-problema.',
    'EM13MAT302': 'Interpretar e analisar dados estatísticos em diferentes contextos.',
    'EM13MAT303': 'Resolver sistemas lineares e problemas de programação linear.',
    'EM13MAT304': 'Compreender e aplicar sequências e progressões em situações reais.',
    'EM13MAT305': 'Calcular probabilidades e analisar situações envolvendo incerteza.',
    'EM13MAT401': 'Compreender e aplicar conceitos de exponenciais e logaritmos.',
    'EM13MAT402': 'Analisar funções e suas aplicações em diferentes contextos.',
    'EM13MAT403': 'Interpretar e analisar dados estatísticos com uso de medidas de dispersão.',
    'EM13MAT404': 'Compreender e aplicar conceitos de trigonometria em situações reais.',
    'EM13MAT405': 'Utilizar conceitos de cálculo diferencial e integral em contextos aplicados.',

    // CIÊNCIAS DA NATUREZA E SUAS TECNOLOGIAS
    'EM13CNT101': 'Analisar fenômenos naturais e processos tecnológicos com base em princípios físicos.',
    'EM13CNT102': 'Avaliar os riscos e os benefícios de tecnologias em diferentes contextos sociais.',
    'EM13CNT103': 'Utilizar o conhecimento sobre as radiações e seus efeitos em diagnósticos de saúde.',
    'EM13CNT201': 'Compreender os processos celulares e suas implicações para a vida.',
    'EM13CNT202': 'Analisar a relação entre estrutura e função em sistemas biológicos.',
    'EM13CNT203': 'Compreender os processos ecológicos e as relações nos ecossistemas.',
    'EM13CNT204': 'Analisar adaptações dos seres vivos aos diferentes ambientes.',
    'EM13CNT205': 'Compreender as relações ecológicas e os fluxos de energia nos ecossistemas.',
    'EM13CNT301': 'Interpretar resultados de investigações científicas sobre resíduos e impactos ambientais.',
    'EM13CNT302': 'Comunicar conclusões de pesquisas científicas sobre sustentabilidade.',
    'EM13CNT303': 'Interpretar textos de divulgação científica sobre biotecnologia e ética.',
    'EM13CNT304': 'Compreender os mecanismos da evolução e da diversidade biológica.',

    // CIÊNCIAS HUMANAS E SOCIAIS APLICADAS
    'EM13CHS101': 'Identificar e analisar a sistematização do tempo e do espaço em diferentes sociedades.',
    'EM13CHS102': 'Identificar e analisar processos de ocupação do espaço e formação de territórios.',
    'EM13CHS103': 'Elaborar hipóteses sobre as causas da desigualdade socioespacial.',
    'EM13CHS201': 'Analisar a formação de diferentes identidades e as relações de poder envolvidas.',
    'EM13CHS202': 'Analisar o impacto do racismo e outras formas de preconceito na sociedade.',
    'EM13CHS203': 'Comparar diferentes processos de formação cultural e artística.',
    'EM13CHS301': 'Compreender o funcionamento das instituições e das relações de produção.',
    'EM13CHS302': 'Analisar as transformações do mundo do trabalho e seus impactos.',
    'EM13CHS303': 'Debater modelos de desenvolvimento econômico e suas implicações socioambientais.',
    'EM13CHS502': 'Analisar processos de disputa de poder e as diferentes formas de Estado.',
    'EM13CHS601': 'Identificar e analisar as relações de poder entre as nações no mundo contemporâneo.',
    'EM13CHS602': 'Utilizar conceitos das Ciências Humanas para analisar conflitos mundiais.',

    // ================================
    // OUTRAS ÁREAS DO CONHECIMENTO
    // ================================

    // BIOLOGIA ESPECÍFICA
    'DCRB-BIO-01': 'Analisar adaptações das plantas da Caatinga ao estresse hídrico e térmico.',
    'DCRB-BIO-02': 'Compreender a fisiologia vegetal adaptativa dos ecossistemas baianos.',
    'DCRB-BIO-03': 'Investigar a biodiversidade marinha dos recifes de coral do sul da Bahia.',
    'DCRB-BIO-04': 'Analisar os processos celulares em organismos dos diferentes biomas baianos.',
    'DCRB-BIO-05': 'Compreender as relações ecológicas nos manguezais da Baía de Todos os Santos.',
    'DCRB-BIO-06': 'Investigar a etnobotânica e saberes tradicionais sobre plantas medicinais.',
    'DCRB-BIO-07': 'Analisar impactos ambientais da carcinicultura e outras atividades costeiras.',
    'DCRB-BIO-08': 'Compreender processos de especiação e endemismo na Chapada Diamantina.',
    'DCRB-BIO-09': 'Investigar microbiologia de solos do semiárido e suas aplicações biotecnológicas.',
    'DCRB-BIO-10': 'Analisar problemas de saúde pública relacionados ao meio ambiente baiano.',

    // LINGUAGENS ESPECÍFICAS
    'DCRB-LIN-01': 'Analisar obras literárias de autores baianos e suas relações com o contexto regional.',
    'DCRB-LIN-02': 'Compreender a variação linguística do português falado na Bahia.',
    'DCRB-LIN-03': 'Produzir textos que valorizem a cultura e identidade baiana.',
    'DCRB-LIN-04': 'Analisar discursos midiáticos sobre a Bahia e suas representações.',
    'DCRB-LIN-05': 'Compreender o papel das línguas africanas (iorubá, quimbundo) na formação linguística.',
    'DCRB-LIN-06': 'Analisar letras de música como expressão da cultura popular baiana.',
    'DCRB-LIN-07': 'Produzir textos em diferentes gêneros sobre temas regionais relevantes.',
    'DCRB-LIN-08': 'Compreender a literatura de cordel como expressão cultural do sertão.',
    'DCRB-LIN-09': 'Analisar a produção cinematográfica baiana e suas temáticas.',
    'DCRB-LIN-10': 'Desenvolver competência comunicativa em contextos multiculturais baianos.',

    // MATEMÁTICA ESPECÍFICA
    'DCRB-MAT-01': 'Aplicar conceitos matemáticos à análise de dados socioeconômicos da Bahia.',
    'DCRB-MAT-02': 'Resolver problemas envolvendo geometria aplicada ao território e urbanismo.',
    'DCRB-MAT-03': 'Utilizar estatística para análise de indicadores sociais regionais.',
    'DCRB-MAT-04': 'Aplicar funções matemáticas à modelagem de fenômenos naturais baianos.',
    'DCRB-MAT-05': 'Utilizar conceitos de probabilidade em contextos econômicos regionais.',
    'DCRB-MAT-06': 'Aplicar matemática financeira à análise da agricultura familiar.',
    'DCRB-MAT-07': 'Utilizar geometria analítica na representação cartográfica do território.',
    'DCRB-MAT-08': 'Aplicar cálculo diferencial à otimização de processos produtivos.',
    'DCRB-MAT-09': 'Utilizar álgebra linear na análise de dados multivariados regionais.',
    'DCRB-MAT-10': 'Aplicar matemática à sustentabilidade e gestão de recursos naturais.',

    // QUÍMICA ESPECÍFICA
    'DCRB-QUI-01': 'Analisar processos químicos do Polo Petroquímico de Camaçari.',
    'DCRB-QUI-02': 'Compreender a química dos solos dos diferentes biomas baianos.',
    'DCRB-QUI-03': 'Investigar a química de alimentos regionais e tradicionais.',
    'DCRB-QUI-04': 'Analisar processos de contaminação e remediação ambiental.',
    'DCRB-QUI-05': 'Compreender a química dos cosméticos de origem vegetal do semiárido.',
    'DCRB-QUI-06': 'Investigar processos de produção de biodiesel a partir de oleaginosas regionais.',
    'DCRB-QUI-07': 'Analisar a qualidade da água em diferentes bacias hidrográficas.',
    'DCRB-QUI-08': 'Compreender processos de corrosão em estruturas costeiras.',
    'DCRB-QUI-09': 'Investigar a química de produtos naturais da flora baiana.',
    'DCRB-QUI-10': 'Analisar processos industriais e seus impactos ambientais.',

    // FÍSICA ESPECÍFICA
    'DCRB-FIS-01': 'Analisar a produção de energia eólica no interior baiano.',
    'DCRB-FIS-02': 'Compreender a física do clima e fenômenos meteorológicos regionais.',
    'DCRB-FIS-03': 'Investigar aplicações da física na agricultura irrigada.',
    'DCRB-FIS-04': 'Analisar a acústica e física das manifestações culturais.',
    'DCRB-FIS-05': 'Compreender a física dos processos costeiros e oceanográficos.',
    'DCRB-FIS-06': 'Investigar aplicações da óptica em tecnologias regionais.',
    'DCRB-FIS-07': 'Analisar a termodinâmica de processos industriais.',
    'DCRB-FIS-08': 'Compreender a física dos materiais aplicada à construção civil.',
    'DCRB-FIS-09': 'Investigar aplicações da mecânica em máquinas agrícolas.',
    'DCRB-FIS-10': 'Analisar a física dos transportes e logística regional.',

    // ARTES ESPECÍFICAS
    'DCRB-ART-01': 'Analisar as manifestações artísticas de matriz africana na Bahia.',
    'DCRB-ART-02': 'Compreender o Carnaval como expressão artística integrada.',
    'DCRB-ART-03': 'Investigar a arte sacra do período colonial baiano.',
    'DCRB-ART-04': 'Analisar a produção artística contemporânea em Salvador.',
    'DCRB-ART-05': 'Compreender as artes visuais dos povos indígenas baianos.',
    'DCRB-ART-06': 'Investigar a música popular baiana e seus gêneros.',
    'DCRB-ART-07': 'Analisar o teatro popular e de rua.',
    'DCRB-ART-08': 'Compreender a dança como expressão cultural.',
    'DCRB-ART-09': 'Investigar o artesanato tradicional regional.',
    'DCRB-ART-10': 'Analisar o cinema baiano e sua estética.',

    // EDUCAÇÃO FÍSICA ESPECÍFICA
    'DCRB-EF-01': 'Praticar e compreender a capoeira como manifestação cultural.',
    'DCRB-EF-02': 'Analisar jogos e brincadeiras tradicionais baianas.',
    'DCRB-EF-03': 'Compreender a relação entre atividade física e saúde nas diferentes idades.',
    'DCRB-EF-04': 'Investigar esportes adaptados às realidades regionais.',
    'DCRB-EF-05': 'Analisar danças populares como prática corporal.',
    'DCRB-EF-06': 'Compreender a educação física inclusiva.',
    'DCRB-EF-07': 'Investigar práticas corporais nas comunidades tradicionais.',
    'DCRB-EF-08': 'Analisar o lazer e recreação no contexto urbano e rural.',
    'DCRB-EF-09': 'Compreender a gestão esportiva em âmbito regional.',
    'DCRB-EF-10': 'Investigar políticas públicas de esporte e lazer.',

    // ================================
    // COMPETÊNCIAS GERAIS DA BNCC
    // ================================

    'CG-01': 'Valorizar e utilizar os conhecimentos historicamente construídos sobre o mundo físico, social, cultural e digital.',
    'CG-02': 'Exercitar a curiosidade intelectual e recorrer à abordagem própria das ciências para investigar causas e elaborar respostas.',
    'CG-03': 'Valorizar e fruir as diversas manifestações artísticas e culturais.',
    'CG-04': 'Utilizar diferentes linguagens para expressar-se e partilhar informações.',
    'CG-05': 'Compreender, utilizar e criar tecnologias digitais de informação e comunicação.',
    'CG-06': 'Valorizar a diversidade de saberes e vivências culturais.',
    'CG-07': 'Argumentar com base em fatos, dados e informações confiáveis.',
    'CG-08': 'Conhecer-se, apreciar-se e cuidar de sua saúde física e emocional.',
    'CG-09': 'Exercitar a empatia, o diálogo, a resolução de conflitos e a cooperação.',
    'CG-10': 'Agir pessoal e coletivamente com autonomia, responsabilidade e ética.',

    // ================================
    // COMPETÊNCIAS ESPECÍFICAS DCRB
    // ================================

    'CE-DCRB-01': 'Compreender a Bahia em suas múltiplas dimensões: histórica, cultural, social e ambiental.',
    'CE-DCRB-02': 'Analisar criticamente a realidade baiana a partir de diferentes perspectivas teóricas.',
    'CE-DCRB-03': 'Valorizar o patrimônio cultural material e imaterial do estado.',
    'CE-DCRB-04': 'Reconhecer e combater todas as formas de discriminação e preconceito.',
    'CE-DCRB-05': 'Participar ativamente da vida social e política da comunidade.',
    'CE-DCRB-06': 'Desenvolver projetos que contribuam para o desenvolvimento regional sustentável.',
    'CE-DCRB-07': 'Utilizar diferentes linguagens para expressar a identidade baiana.',
    'CE-DCRB-08': 'Compreender as relações entre sociedade e natureza no território baiano.',
    'CE-DCRB-09': 'Analisar as desigualdades sociais e propor ações transformadoras.',
    'CE-DCRB-10': 'Valorizar os saberes tradicionais e populares como fontes de conhecimento.',

    // ================================
    // HABILIDADES POR EIXO TEMÁTICO
    // ================================

    // SUSTENTABILIDADE
    'HT-SUS-01': 'Analisar problemas ambientais locais e propor soluções sustentáveis.',
    'HT-SUS-02': 'Compreender a relação entre desenvolvimento econômico e preservação ambiental.',
    'HT-SUS-03': 'Aplicar princípios de consumo consciente e economia circular.',
    'HT-SUS-04': 'Participar de ações de conservação e recuperação ambiental.',
    'HT-SUS-05': 'Analisar políticas públicas ambientais em âmbito regional.',

    // DIREITOS HUMANOS
    'HT-DH-01': 'Reconhecer e defender os direitos humanos em diferentes contextos.',
    'HT-DH-02': 'Analisar violações de direitos e mecanismos de proteção.',
    'HT-DH-03': 'Promover a cultura de paz e resolução não violenta de conflitos.',
    'HT-DH-04': 'Compreender os direitos específicos de grupos vulneráveis.',
    'HT-DH-05': 'Participar de ações de promoção da cidadania.',

    // CULTURA AFRICANA E INDÍGENA
    'HT-CAI-01': 'Reconhecer a contribuição africana e indígena na formação cultural baiana.',
    'HT-CAI-02': 'Valorizar e preservar as manifestações culturais afro-brasileiras e indígenas.',
    'HT-CAI-03': 'Compreender a história e resistência dos povos tradicionais.',
    'HT-CAI-04': 'Analisar as relações interétnicas e o combate ao racismo.',
    'HT-CAI-05': 'Promover o diálogo intercultural e o respeito à diversidade.',

    // TECNOLOGIA E INOVAÇÃO
    'HT-TEC-01': 'Utilizar tecnologias para produção e compartilhamento de conhecimento.',
    'HT-TEC-02': 'Analisar impactos sociais das inovações tecnológicas.',
    'HT-TEC-03': 'Desenvolver soluções tecnológicas para problemas regionais.',
    'HT-TEC-04': 'Compreender o papel da tecnologia no mundo do trabalho.',
    'HT-TEC-05': 'Utilizar mídias digitais de forma crítica e ética.',

    // MUNDO DO TRABALHO
    'HT-MT-01': 'Compreender as transformações no mundo do trabalho contemporâneo.',
    'HT-MT-02': 'Desenvolver competências para empreendedorismo e cooperativismo.',
    'HT-MT-03': 'Analisar relações de trabalho e direitos trabalhistas.',
    'HT-MT-04': 'Planejar projeto de vida e carreira considerando o contexto regional.',
    'HT-MT-05': 'Compreender a economia local e suas potencialidades.',

    // SAÚDE E QUALIDADE DE VIDA
    'HT-SQV-01': 'Compreender determinantes sociais da saúde.',
    'HT-SQV-02': 'Adotar hábitos de vida saudáveis.',
    'HT-SQV-03': 'Analisar políticas públicas de saúde.',
    'HT-SQV-04': 'Prevenir doenças e promover saúde coletiva.',
    'HT-SQV-05': 'Compreender a relação entre ambiente e saúde.',

    // ÉTICA E DEMOCRACIA
    'HT-ED-01': 'Exercer a cidadania de forma ativa e responsável.',
    'HT-ED-02': 'Compreender os princípios do Estado Democrático de Direito.',
    'HT-ED-03': 'Participar de processos decisórios coletivos.',
    'HT-ED-04': 'Analisar questões éticas em diferentes contextos.',
    'HT-ED-05': 'Promover valores democráticos e republicanos.',

    // ================================
    // NÍVEIS DA TAXONOMIA DE BLOOM
    // ================================

    'TB-01': 'Conhecer - Recordar informações específicas.',
    'TB-02': 'Compreender - Entender o significado das informações.',
    'TB-03': 'Aplicar - Usar informações em situações novas.',
    'TB-04': 'Analisar - Dividir informações em partes para entender estruturas.',
    'TB-05': 'Avaliar - Fazer julgamentos com base em critérios.',
    'TB-06': 'Criar - Combinar elementos para formar um todo novo.',

    // ================================
    // FALLBACK E UTILITÁRIOS
    // ================================

    'UNKNOWN': 'Habilidade em processo de catalogação no sistema.',
    'CUSTOM': 'Habilidade específica desenvolvida para o contexto da questão.',
    'INTERDISCIPLINAR': 'Habilidade que integra conhecimentos de diferentes áreas.',
    'CONTEXTUAL': 'Habilidade aplicada a situação específica do contexto baiano.',
    'LOCAL': 'Habilidade relacionada à realidade local e regional.',
    'GLOBAL': 'Habilidade com aplicação em contextos amplos e globais.'
};

export const DifficultySelector = ({ subject, onStart, onBack, isDark }) => {
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedSkill, setSelectedSkill] = useState('all');

    const difficulties = ['all', 'easy', 'medium', 'hard'];

    const difficultyLabels = {
        all: 'Todos',
        easy: 'Fácil',
        medium: 'Médio',
        hard: 'Difícil'
    };

    const uniqueSkills = useMemo(() => {
        const skills = subject.questions
            .map(q => q.skillCode)
            .filter(Boolean);
        return ['all', ...new Set(skills)];
    }, [subject.questions]);

    const getQuestionCount = (diff, skill) => {
        return subject.questions.filter(q => {
            const matchDiff = diff === 'all' || q.difficulty === diff;
            const matchSkill = skill === 'all' || q.skillCode === skill;
            return matchDiff && matchSkill;
        }).length;
    };

    const totalAvailable = getQuestionCount(selectedDifficulty, selectedSkill);

    // Função para pegar a descrição ou retornar o próprio código se não houver tradução
    const getSkillDescription = (code) => {
        return SKILL_MAP[code] || code;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            <header className="flex items-center gap-4">
                <button onClick={onBack} className={`p-2 rounded-full transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`}>
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-xl font-bold">{subject.title}</h2>
                    <p className="text-sm text-slate-500">Defina os parâmetros da operação</p>
                </div>
            </header>

            {/* SELEÇÃO DE DIFICULDADE */}
            <section className="space-y-4">
                <div className="flex items-center justify-between text-indigo-500 font-bold text-sm uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                        <BarChart size={16} />
                        <span>Nível de Dificuldade</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {difficulties.map(d => {
                        const count = getQuestionCount(d, 'all');
                        return (
                            <button
                                key={d}
                                disabled={count === 0 && d !== 'all'}
                                onClick={() => setSelectedDifficulty(d)}
                                className={`py-3 px-4 rounded-xl border font-medium transition-all flex justify-between items-center ${selectedDifficulty === d
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                    : isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                                    } ${count === 0 && d !== 'all' ? 'opacity-30 cursor-not-allowed' : 'hover:border-indigo-500'}`}
                            >
                                <span>{difficultyLabels[d]}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedDifficulty === d ? 'bg-white/20' : 'bg-slate-500/10'}`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* SELEÇÃO DE SKILL BNCC/DCRB */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm uppercase tracking-wider">
                    <Target size={16} />
                    <span>Mapeamento de Habilidades</span>
                </div>
                <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-2 no-scrollbar">
                    {uniqueSkills.map(s => {
                        const count = getQuestionCount('all', s);
                        const isSelected = selectedSkill === s;

                        return (
                            <button
                                key={s}
                                onClick={() => setSelectedSkill(s)}
                                className={`p-4 rounded-xl border text-left transition-all flex flex-col gap-1 ${isSelected
                                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                    : isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                                    } hover:border-emerald-500`}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <span className={`font-bold text-xs px-2 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-indigo-500/10 text-indigo-400'}`}>
                                        {s === 'all' ? 'GERAL' : s}
                                    </span>
                                    <span className={`text-[10px] font-bold ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                                        {count} questões
                                    </span>
                                </div>
                                <p className={`text-sm leading-tight mt-1 ${isSelected ? 'text-emerald-50' : 'text-slate-500'}`}>
                                    {getSkillDescription(s)}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* BOTÃO DE INÍCIO */}
            <div className="pt-4">
                {totalAvailable === 0 ? (
                    <div className="flex items-center gap-2 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs mb-4">
                        <Info size={16} />
                        <span>Nenhuma rota disponível para estes filtros. Reajuste o curso.</span>
                    </div>
                ) : (
                    <div className="text-center mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {totalAvailable} {totalAvailable === 1 ? 'Objetivo identificado' : 'Objetivos identificados'}
                    </div>
                )}

                <button
                    disabled={totalAvailable === 0}
                    onClick={() => onStart(selectedDifficulty, selectedSkill)}
                    className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 ${totalAvailable === 0
                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white shadow-indigo-500/20'
                        }`}
                >
                    <Play size={20} fill="currentColor" />
                    Zarpar para Missão
                </button>
            </div>
        </motion.div>
    );
};