export const SUBJECTS = [
    {
        id: 'matematica-1',
        title: 'Matemática: Lógica e Território',
        description: 'Aplicação de funções e geometria no espaço urbano.',
        iconName: 'Calculator',
        category: 'Exatas',
        learningObjective: 'Desenvolver o raciocínio lógico-matemático para interpretar dados socioeconômicos do estado.',
        xp: 600,
        questions: [
            {
                id: 'mat-q1',
                q: 'Considerando o crescimento urbano de Salvador, uma função de 1º grau f(x) = ax + b representa a ocupação de novos bairros. Se a > 0, o que isso indica sobre a densidade demográfica?',
                a: ['A densidade está diminuindo', 'A densidade é constante', 'A densidade está aumentando', 'O território está sendo desocupado'],
                correct: 2,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT301',
                explanation: 'Em uma função linear, quando o coeficiente angular é positivo, a função é crescente, indicando aumento na variável dependente.',
                videoUrl: 'https://www.youtube.com/watch?v=6dcszXnkRAI'
            },
            {
                id: 'mat-q2',
                q: 'Para calcular a área de uma zona de preservação na Chapada Diamantina em formato circular, qual recurso geométrico é fundamental?',
                a: ['Teorema de Pitágoras', 'Fórmula da área do círculo (πr²)', 'Cálculo de volume', 'Perímetro do triângulo'],
                correct: 1,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT201',
                explanation: 'A aplicação da geometria plana é essencial para o planejamento ambiental e territorial.',
                videoUrl: 'https://www.youtube.com/watch?v=oeTd5Tng0rU'
            },
            {
                id: 'mat-001',
                q: 'A população de Feira de Santana cresce a uma taxa de 2,5% ao ano. Qual função matemática melhor modela esse crescimento?',
                a: ['Função linear', 'Função exponencial', 'Função logarítmica', 'Função quadrática'],
                correct: 1,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT301',
                explanation: 'Crescimentos percentuais constantes são modelados por funções exponenciais.'
            },
            {
                id: 'mat-002',
                q: 'Um agricultor do semiárido baiano tem um terreno retangular de 120m x 80m. Quantos hectares ele possui?',
                a: ['0,96 ha', '9,6 ha', '96 ha', '960 ha'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT201',
                explanation: '1 hectare = 10.000 m². Área = 120x80 = 9.600 m² = 0,96 ha.'
            },
            {
                id: 'mat-003',
                q: 'O Porto de Salvador movimenta containers em progressão aritmética. Se no 1º mês foram 500 e no 3º mês 600, quantos serão no 6º mês?',
                a: ['650', '700', '750', '800'],
                correct: 2,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT304',
                explanation: 'PA com a1=500, a3=600. Razão = 50. a6 = a1 + 5r = 500 + 250 = 750.'
            },
            {
                id: 'mat-004',
                q: 'A produção de cacau no sul da Bahia segue uma função P(t)=5000×(1,08)^t. Em 5 anos, qual será a produção aproximada?',
                a: ['7.000 ton', '7.350 ton', '7.850 ton', '8.200 ton'],
                correct: 1,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT401',
                explanation: 'P(5)=5000×1,08^5 ≈ 5000×1,469 = 7.345 ton.'
            },
            {
                id: 'mat-005',
                q: 'Um mapa de Salvador tem escala 1:25.000. Se duas praças distam 8cm no mapa, qual a distância real?',
                a: ['1 km', '2 km', '3 km', '4 km'],
                correct: 1,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT201',
                explanation: '8cm × 25.000 = 200.000cm = 2.000m = 2km.'
            },
            {
                id: 'mat-006',
                q: 'A arrecadação estadual segue a função R(x)=ax²+bx+c. Se para x=0 (2010) foi R$1bi e para x=5 (2015) foi R$1,5bi, qual tipo de função?',
                a: ['Linear crescente', 'Quadrática com a>0', 'Quadrática com a<0', 'Exponencial'],
                correct: 1,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT402',
                explanation: 'Dois pontos definem uma reta, mas três pontos podem definir uma parábola. Com crescimento, a>0.'
            },
            {
                id: 'mat-007',
                q: 'Em um levantamento sobre turismo na Costa do Dendê, 60% dos visitantes são brasileiros. Se foram entrevistados 250 pessoas, quantas são estrangeiras?',
                a: ['75', '100', '125', '150'],
                correct: 1,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT302',
                explanation: '40% são estrangeiros: 250×0,4 = 100 pessoas.'
            },
            {
                id: 'mat-008',
                q: 'A área territorial da Bahia é de 564.692 km². Qual a porcentagem que isso representa do território brasileiro (8.516.000 km²)?',
                a: ['6,6%', '7,2%', '8,1%', '9,4%'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT302',
                explanation: '564.692/8.516.000 ≈ 0,0663 = 6,63%'
            },
            {
                id: 'mat-009',
                q: 'O PIB da Bahia cresceu de R$100 bi para R$120 bi em 4 anos. Qual a taxa média anual de crescimento?',
                a: ['4,5%', '5,0%', '5,5%', '6,0%'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT401',
                explanation: 'Taxa = (120/100)^(1/4)-1 ≈ 1,2^0,25-1 ≈ 1,0466-1 = 0,0466 = 4,66%'
            },
            {
                id: 'mat-010',
                q: 'Um reservatório no semiárido tem formato de cilindro com raio 10m e altura 4m. Qual seu volume em litros?',
                a: ['1.256.000 L', '1.000.000 L', '125.600 L', '12.560 L'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT203',
                explanation: 'V = πr²h = 3,14×100×4 = 1.256 m³ = 1.256.000 L'
            },
            {
                id: 'mat-011',
                q: 'A distribuição de renda em Salvador segue uma curva de Lorenz. Se o coeficiente de Gini é 0,45, o que isso indica?',
                a: ['Alta desigualdade', 'Média desigualdade', 'Baixa desigualdade', 'Distribuição perfeita'],
                correct: 1,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT403',
                explanation: 'Gini varia de 0 (igualdade perfeita) a 1 (desigualdade máxima). 0,45 indica desigualdade média.'
            },
            {
                id: 'mat-012',
                q: 'Uma cooperativa de agricultura familiar vende 3 produtos: A(R$5), B(R$8), C(R$12). Se vendeu 100 de A, 80 de B e 50 de C, qual a média ponderada do preço?',
                a: ['R$7,20', 'R$7,65', 'R$8,00', 'R$8,35'],
                correct: 1,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT302',
                explanation: 'MP = (5×100 + 8×80 + 12×50)/(100+80+50) = (500+640+600)/230 = 1740/230 ≈ 7,565'
            },
            {
                id: 'mat-013',
                q: 'O fluxo turístico em Porto Seguro segue uma sazonalidade modelada por f(t)=1000+500×sen(πt/6). Qual o pico de visitantes?',
                a: ['1.000', '1.250', '1.500', '1.750'],
                correct: 2,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT404',
                explanation: 'sen(πt/6) máximo = 1, então f(t) máximo = 1000+500×1 = 1500'
            },
            {
                id: 'mat-014',
                q: 'Um triângulo tem vértices nas cidades de Juazeiro (0,0), Petrolina (30,0) e Casa Nova (15,25). Qual sua área em km²?',
                a: ['375 km²', '425 km²', '500 km²', '625 km²'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT202',
                explanation: 'Área = |det|/2 = |(30×25 - 0×15)|/2 = 750/2 = 375'
            },
            {
                id: 'mat-015',
                q: 'A evasão escolar na Bahia caiu de 12% para 9% em 3 anos. Qual a redução percentual?',
                a: ['25%', '30%', '33%', '35%'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT302',
                explanation: 'Redução = (12-9)/12 = 3/12 = 0,25 = 25%'
            },
            {
                id: 'mat-016',
                q: 'Um investimento no Polo Industrial de Camaçari rende 15% ao ano. Em quantos anos dobrará o capital?',
                a: ['4 anos', '5 anos', '6 anos', '7 anos'],
                correct: 1,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT401',
                explanation: 'Usando a regra do 72: 72/15 = 4,8 anos ≈ 5 anos'
            },
            {
                id: 'mat-017',
                q: 'A produção de energia eólica no interior baiano cresce 30% ao ano. Se hoje é 100 MW, qual será em 3 anos?',
                a: ['180 MW', '200 MW', '220 MW', '250 MW'],
                correct: 2,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT401',
                explanation: '100×(1,30)^3 = 100×2,197 = 219,7 MW ≈ 220 MW'
            },
            {
                id: 'mat-018',
                q: 'Um trapézio representa uma área agrícola no recôncavo: bases 80m e 120m, altura 50m. Qual a área?',
                a: ['4.000 m²', '5.000 m²', '6.000 m²', '7.000 m²'],
                correct: 1,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT201',
                explanation: 'Área = (B+b)×h/2 = (120+80)×50/2 = 200×25 = 5.000 m²'
            },
            {
                id: 'mat-019',
                q: 'A correlação entre IDH e investimento em educação em municípios baianos é r=0,75. O que isso indica?',
                a: ['Forte correlação positiva', 'Fraca correlação', 'Correlação negativa', 'Sem correlação'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT403',
                explanation: 'r próximo de 1 indica forte correlação positiva: quanto mais investimento, maior IDH.'
            },
            {
                id: 'mat-020',
                q: 'Um sistema linear representa produção agrícola: 2x+3y=100 (milho), x+2y=60 (feijão). Qual a solução?',
                a: ['x=20, y=20', 'x=30, y=15', 'x=40, y=10', 'x=50, y=0'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT303',
                explanation: 'Resolvendo: da 2ª eq, x=60-2y. Substituindo: 2(60-2y)+3y=100 → 120-4y+3y=100 → y=20, x=20'
            },
            {
                id: 'mat-021',
                q: 'A população rural da Bahia decresce 2% ao ano. Se hoje são 3 milhões, qual será em 10 anos?',
                a: ['2,45 milhões', '2,67 milhões', '2,89 milhões', '3,00 milhões'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT401',
                explanation: 'P = 3×(0,98)^10 ≈ 3×0,817 = 2,451 milhões'
            },
            {
                id: 'mat-022',
                q: 'Um histograma mostra a distribuição de idade dos estudantes. Se a moda é 16 anos, o que isso significa?',
                a: ['A maioria tem 16 anos', 'A média é 16', 'A mediana é 16', 'Todos têm 16'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT302',
                explanation: 'Moda é o valor mais frequente em uma distribuição.'
            },
            {
                id: 'mat-023',
                q: 'A vazão do Rio São Francisco em Juazeiro é modelada por V(t)=500+200×cos(πt/6). Qual a vazão mínima?',
                a: ['300 m³/s', '500 m³/s', '700 m³/s', '900 m³/s'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT404',
                explanation: 'cos mínimo = -1, então V mínimo = 500+200×(-1) = 300 m³/s'
            },
            {
                id: 'mat-024',
                q: 'Um fazendeiro quer cercar uma área circular de 1 hectare. Qual o comprimento da cerca?',
                a: ['354 m', '400 m', '445 m', '500 m'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT201',
                explanation: 'Área = πr² = 10.000 m² → r = √(10000/π) ≈ 56,42 m → C = 2πr ≈ 354 m'
            },
            {
                id: 'mat-025',
                q: 'A probabilidade de chover no sertão em janeiro é 10%. Em 5 dias consecutivos, qual a probabilidade de chover pelo menos 1 dia?',
                a: ['41%', '50%', '59%', '67%'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT305',
                explanation: 'P(pelo menos 1) = 1 - P(nenhum) = 1 - (0,9)^5 = 1 - 0,5905 = 0,4095 ≈ 41%'
            },
            {
                id: 'mat-026',
                q: 'Um ângulo de 45° no mapa corresponde a quantos graus na superfície terrestre?',
                a: ['45°', '22,5°', '90°', 'Depende da projeção'],
                correct: 3,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT202',
                explanation: 'A representação angular depende do tipo de projeção cartográfica utilizada.'
            },
            {
                id: 'mat-027',
                q: 'A sequência 2, 5, 8, 11... representa crescimento de bairros em Lauro de Freitas. Qual o 10º termo?',
                a: ['26', '29', '32', '35'],
                correct: 1,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT304',
                explanation: 'PA com a1=2, r=3. a10 = a1+9r = 2+27 = 29'
            },
            {
                id: 'mat-028',
                q: 'Uma pirâmide etária mostra base larga e topo estreito. O que isso indica sobre a população?',
                a: ['População jovem', 'População envelhecida', 'População estável', 'População em declínio'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT403',
                explanation: 'Base larga indica muitos jovens, típico de países em desenvolvimento.'
            },
            {
                id: 'mat-029',
                q: 'O desvio padrão das notas no ENEM na Bahia é 80 pontos. Se a média é 500, qual a variância?',
                a: ['6.400', '8.000', '10.000', '12.800'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT302',
                explanation: 'Variância = (desvio padrão)² = 80² = 6.400'
            },
            {
                id: 'mat-030',
                q: 'Um logaritmo na escala Richter mede terremotos. Se um é 100 vezes mais intenso que outro, qual a diferença na escala?',
                a: ['1 ponto', '2 pontos', '3 pontos', '4 pontos'],
                correct: 1,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT401',
                explanation: 'Escala Richter é log10. 100 = 10², diferença de 2 pontos.'
            },
            {
                id: 'mat-031',
                q: 'Um conjunto de dados sobre renda tem média R$1.500 e mediana R$1.200. O que isso sugere?',
                a: ['Distribuição simétrica', 'Assimetria à direita', 'Assimetria à esquerda', 'Dados homogêneos'],
                correct: 1,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT403',
                explanation: 'Média > mediana sugere assimetria à direita (valores altos puxam a média).'
            },
            {
                id: 'mat-032',
                q: 'A função f(x)=x³-6x²+9x modela um relevo na Chapada. Quantos pontos críticos tem?',
                a: ['1', '2', '3', '4'],
                correct: 1,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT402',
                explanation: 'f\'(x)=3x²-12x+9=0 → x²-4x+3=0 → (x-1)(x-3)=0 → 2 raízes'
            },
            {
                id: 'mat-033',
                q: 'Um agricultor tem 100m de cerca. Qual a maior área retangular que pode cercar?',
                a: ['400 m²', '525 m²', '625 m²', '700 m²'],
                correct: 2,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT402',
                explanation: 'Perímetro = 100 → 2(x+y)=100 → y=50-x. Área = x(50-x). Máximo em x=25 → Área=625 m²'
            },
            {
                id: 'mat-034',
                q: 'A razão entre homens e mulheres em Salvador é 0,95. Se há 1 milhão de mulheres, quantos homens?',
                a: ['850.000', '900.000', '950.000', '1.000.000'],
                correct: 2,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT302',
                explanation: 'Homens = 0,95 × 1.000.000 = 950.000'
            },
            {
                id: 'mat-035',
                q: 'Um gráfico de dispersão mostra relação linear entre PIB e educação. Qual coeficiente mede essa relação?',
                a: ['Coeficiente de Gini', 'Coeficiente de correlação', 'Coeficiente angular', 'Coeficiente de variação'],
                correct: 1,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT403',
                explanation: 'Coeficiente de correlação de Pearson mede força e direção da relação linear.'
            },
            {
                id: 'mat-036',
                q: 'A integral ∫(2x+3)dx de 0 a 2 representa acúmulo de produção agrícola. Qual o valor?',
                a: ['8', '10', '12', '14'],
                correct: 1,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT405',
                explanation: '∫(2x+3)dx = x²+3x. De 0 a 2: (4+6)-(0+0)=10'
            },
            {
                id: 'mat-037',
                q: 'Um polígono regular representa divisão territorial. Se tem ângulo interno de 135°, quantos lados tem?',
                a: ['6', '8', '10', '12'],
                correct: 1,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT202',
                explanation: 'Ângulo interno = 180(n-2)/n = 135 → 180n-360=135n → 45n=360 → n=8'
            },
            {
                id: 'mat-038',
                q: 'A média móvel de 3 meses suaviza variações no turismo. Para dados 100, 120, 80, 150, qual a última média?',
                a: ['100', '110', '117', '125'],
                correct: 2,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT302',
                explanation: 'Última média = (120+80+150)/3 = 350/3 ≈ 116,67 ≈ 117'
            },
            {
                id: 'mat-039',
                q: 'Um sistema de inequações delimita zona urbana: x≥0, y≥0, x+y≤100, 2x+y≤150. Qual o vértice ótimo para maximizar população?',
                a: ['(0,100)', '(50,50)', '(75,0)', '(100,0)'],
                correct: 1,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT303',
                explanation: 'Interseção de x+y=100 e 2x+y=150 → subtraindo: x=50, então y=50'
            },
            {
                id: 'mat-040',
                q: 'A transformação (x,y)→(2x,3y) em um mapa representa que tipo de distorção?',
                a: ['Ampliação uniforme', 'Ampliação diferencial', 'Rotação', 'Translação'],
                correct: 1,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT202',
                explanation: 'Fatores diferentes em x e y indicam ampliação diferencial (anisotrópica).'
            },
            {
                id: 'mat-041',
                q: 'A sequência de Fibonacci aparece em crescimento vegetal. Se F1=1, F2=1, qual é F8?',
                a: ['13', '21', '34', '55'],
                correct: 1,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT304',
                explanation: 'Fibonacci: 1,1,2,3,5,8,13,21,... F8=21'
            },
            {
                id: 'mat-042',
                q: 'Um teste de hipótese sobre renda média rejeita H0 com p=0,03. O que isso significa?',
                a: ['3% de chance de erro tipo I', '97% de confiança', 'Ambos', 'Nenhum'],
                correct: 2,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT403',
                explanation: 'p=0,03 significa 3% de chance de rejeitar H0 se verdadeira (erro I), ou 97% confiança.'
            },
            {
                id: 'mat-043',
                q: 'A derivada f\'(x) representa taxa de variação de produção industrial. Se f\'(5)=100, o que indica?',
                a: ['Produção = 100 em t=5', 'Taxa de aumento = 100 unid/tempo', 'Aceleração = 100', 'Nada'],
                correct: 1,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT402',
                explanation: 'Derivada em um ponto é a taxa instantânea de variação naquele ponto.'
            },
            {
                id: 'mat-044',
                q: 'Um conjunto tem 80% dos dados dentro de μ±σ. Qual a distribuição?',
                a: ['Normal', 'Uniforme', 'Assimétrica', 'Não determinada'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT403',
                explanation: 'Na normal, ≈68% estão em μ±σ. 80% sugere curtose diferente.'
            },
            {
                id: 'mat-045',
                q: 'A matriz de transição mostra migração entre regiões. Se A→B=0,2 e B→A=0,1, qual estado estável?',
                a: ['Mais em A', 'Mais em B', 'Igual', 'Não converge'],
                correct: 1,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT303',
                explanation: 'Taxa líquida de A para B é maior, então estabiliza com mais em B.'
            },
            {
                id: 'mat-046',
                q: 'Um fractal na costa baiana tem dimensão 1,3. O que isso significa?',
                a: ['Entre linha e superfície', 'Superfície perfeita', 'Linha perfeita', 'Volume'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT404',
                explanation: 'Dimensão fractal entre 1 e 2 indica complexidade entre linha e superfície.'
            },
            {
                id: 'mat-047',
                q: 'A equação diferencial dP/dt=kP modela crescimento populacional. Qual a solução?',
                a: ['P(t)=P0e^(kt)', 'P(t)=P0+kt', 'P(t)=P0k^t', 'P(t)=P0/(1+kt)'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT405',
                explanation: 'Equação do crescimento exponencial contínuo.'
            },
            {
                id: 'mat-048',
                q: 'Um algoritmo de otimização encontra mínimo de custos logísticos. Qual técnica matemática usa?',
                a: ['Programação linear', 'Cálculo diferencial', 'Ambos', 'Nenhum'],
                correct: 2,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13MAT402',
                explanation: 'Depende do problema: linear usa programação, não-linear usa cálculo.'
            },
            {
                id: 'mat-049',
                q: 'A transformada de Fourier analisa sinais de vento para energia eólica. O que representa?',
                a: ['Frequências do sinal', 'Valores no tempo', 'Média móvel', 'Derivada'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT404',
                explanation: 'Transformada decompõe sinal temporal em suas componentes de frequência.'
            },
            {
                id: 'mat-050',
                q: 'Um espaço métrico na análise territorial considera distâncias reais. Qual propriedade fundamental?',
                a: ['d(x,y)≥0', 'd(x,y)=d(y,x)', 'd(x,z)≤d(x,y)+d(y,z)', 'Todas'],
                correct: 3,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Todas são propriedades de uma métrica: não-negatividade, simetria, desigualdade triangular.'
            },
            {
                id: 'mat-051',
                q: 'A taxa de juros real considera inflação. Se nominal=10% e inflação=4%, qual a taxa real?',
                a: ['5,77%', '6,00%', '6,25%', '6,50%'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT401',
                explanation: 'Real = (1+nominal)/(1+inflação)-1 = 1,10/1,04-1 ≈ 0,0577 = 5,77%'
            },
            {
                id: 'mat-052',
                q: 'Um conjunto de Cantor na matemática fractal tem que propriedade topológica?',
                a: ['Completo e perfeito', 'Vazio', 'Conectado', 'Simples'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT404',
                explanation: 'Conjunto de Cantor é completo (contém todos pontos limite) e perfeito (cada ponto é ponto limite).'
            },
            {
                id: 'mat-053',
                q: 'A análise de componentes principais reduz dimensionalidade de dados socioeconômicos. O que preserva?',
                a: ['Variância máxima', 'Média', 'Correlação', 'Covariância'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT403',
                explanation: 'PCA encontra direções que maximizam variância dos dados projetados.'
            },
            {
                id: 'mat-054',
                q: 'Um teorema do ponto fixo garante equilíbrio em modelos econômicos regionais. Qual condição?',
                a: ['Contração em espaço completo', 'Linearidade', 'Diferenciabilidade', 'Simetria'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT402',
                explanation: 'Teorema de Banach: toda contração em espaço métrico completo tem único ponto fixo.'
            },
            {
                id: 'mat-055',
                q: 'A convolução de funções modela difusão de inovações tecnológicas. Qual propriedade?',
                a: ['Comutativa', 'Associativa', 'Distributiva', 'Todas'],
                correct: 3,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT404',
                explanation: 'Convolução é comutativa, associativa e distributiva sobre adição.'
            },
            {
                id: 'mat-056',
                q: 'Um espaço de Hilbert permite análise funcional de sinais. Qual produto interno define?',
                a: ['Ângulo e norma', 'Somente norma', 'Somente ângulo', 'Nada'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT404',
                explanation: 'Produto interno define norma (‖x‖=√⟨x,x⟩) e ângulo (cosθ=⟨x,y⟩/‖x‖‖y‖).'
            },
            {
                id: 'mat-057',
                q: 'A transformada de Laplace resolve equações diferenciais em dinâmica populacional. O que faz?',
                a: ['Converte para domínio complexo', 'Deriva', 'Integra', 'Diferencia'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT405',
                explanation: 'Transformada de Laplace converte equações diferenciais em equações algébricas no domínio complexo.'
            },
            {
                id: 'mat-058',
                q: 'Um grupo de simetria na cristalografia de minérios baianos tem que propriedade?',
                a: ['Fechamento', 'Associatividade', 'Elemento identidade', 'Todas'],
                correct: 3,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT303',
                explanation: 'Todas são propriedades definidoras de um grupo matemático.'
            },
            {
                id: 'mat-059',
                q: 'A medida de Lebesgue generaliza comprimento/área/volume. Qual vantagem sobre Riemann?',
                a: ['Lida melhor com conjuntos "estranhos"', 'Mais simples', 'Mais rápida', 'Mais precisa'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT405',
                explanation: 'Medida de Lebesgue é mais geral e lida melhor com conjuntos complicados e funções descontínuas.'
            },
            {
                id: 'mat-060',
                q: 'Um fibrado na topologia descreve espaços como produto local. Exemplo na física?',
                a: ['Campo vetorial', 'Número real', 'Ponto', 'Conjunto'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Fibrado tangente de uma variedade descreve campos vetoriais, localmente produto da base pela fibra.'
            },
            {
                id: 'mat-061',
                q: 'A álgebra de Boole modela circuitos lógicos em tecnologia. Qual operação corresponde a "E" lógico?',
                a: ['Multiplicação', 'Adição', 'Subtração', 'Divisão'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT303',
                explanation: 'Na álgebra booleana, multiplicação (∧) corresponde ao operador lógico AND.'
            },
            {
                id: 'mat-062',
                q: 'Um grafo representa conexões de transporte entre cidades. O que mede o coeficiente de clustering?',
                a: ['Transitividade', 'Distância média', 'Diâmetro', 'Centralidade'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT303',
                explanation: 'Coeficiente de clustering mede tendência de nós formarem triângulos (transitividade).'
            },
            {
                id: 'mat-063',
                q: 'A teoria dos jogos analisa competição entre empresas. O que é equilíbrio de Nash?',
                a: ['Ninguém quer mudar unilateralmente', 'Ótimo social', 'Máximo ganho individual', 'Mínimo prejuízo'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT403',
                explanation: 'Em equilíbrio de Nash, nenhum jogador tem incentivo para mudar estratégia unilateralmente.'
            },
            {
                id: 'mat-064',
                q: 'Um processo estocástico modela variações climáticas. Markoviano significa que?',
                a: ['Futuro depende só do presente', 'Independente do passado', 'Determinístico', 'Periódico'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT403',
                explanation: 'Processo de Markov tem propriedade de memória curta: futuro depende apenas do estado presente.'
            },
            {
                id: 'mat-065',
                q: 'A geometria diferencial estuda formas da costa baiana. O que mede a curvatura gaussiana?',
                a: ['Como a superfície se curva intrinsicamente', 'Aparencia externa', 'Área', 'Comprimento'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Curvatura gaussiana é intrínseca - pode ser medida por seres na superfície sem sair dela.'
            },
            {
                id: 'mat-066',
                q: 'Um operador compacto em análise funcional tem que propriedade útil?',
                a: ['Leva conjuntos limitados em relativamente compactos', 'É linear', 'É contínuo', 'É injetivo'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT404',
                explanation: 'Operadores compactos mapeam conjuntos limitados em conjuntos com fecho compacto, generalizando matrizes.'
            },
            {
                id: 'mat-067',
                q: 'A teoria da medida fundamenta probabilidade moderna. O que é σ-álgebra?',
                a: ['Coleção de conjuntos mensuráveis fechada sob operações', 'Medida de um conjunto', 'Função', 'Número'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT405',
                explanation: 'σ-álgebra é coleção de subconjuntos fechada sob complementação e união contável - domínio da medida.'
            },
            {
                id: 'mat-068',
                q: 'Um feixe na geometria algébrica estuda soluções de equações polinomiais. Localmente parece com?',
                a: ['Anéis comutativos', 'Espaços vetoriais', 'Grupos', 'Corpos'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Feixes associam anéis comutativos a abertos, capturando funções regulares localmente.'
            },
            {
                id: 'mat-069',
                q: 'A homologia em topologia algébrica classifica buracos. H0 mede o quê?',
                a: ['Componentes conexas', 'Buracos 1-dimensionais', 'Buracos 2-dimensionais', 'Volume'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'H0 conta componentes conexas por caminhos - dimensão é número de componentes.'
            },
            {
                id: 'mat-070',
                q: 'Um functor na teoria das categorias preserva estrutura. Entre grupos e conjuntos, o que faz o functor forgetful?',
                a: ['Esquece operação do grupo', 'Cria operação', 'Inverte operação', 'Duplica elementos'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT303',
                explanation: 'Functor forgetful de Group para Set mapeia grupo para seu conjunto subjacente, "esquecendo" operação.'
            },
            {
                id: 'mat-071',
                q: 'A análise complexa usa variável z=x+iy. O que diz o teorema dos resíduos?',
                a: ['Integral = 2πi × soma dos resíduos', 'Função é holomorfa', 'Existe singularidade', 'Converge'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT405',
                explanation: 'Teorema dos resíduos: integral sobre curva fechada = 2πi × soma resíduos dentro da curva.'
            },
            {
                id: 'mat-072',
                q: 'Um espaço uniforme generaliza espaço métrico. O que substitui a distância?',
                a: ['Sistema de vizinhanças uniformes', 'Função contínua', 'Relação de equivalência', 'Ordem parcial'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Espaços uniformes usam sistema de vizinhanças uniformes (entourages) em vez de métrica.'
            },
            {
                id: 'mat-073',
                q: 'A lógica modal estuda "necessário" e "possível". Operador □ significa o quê?',
                a: ['Necessariamente', 'Possivelmente', 'Não', 'E'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT303',
                explanation: 'Na lógica modal, □φ significa "φ é necessário" ou "φ é verdadeiro em todos os mundos possíveis".'
            },
            {
                id: 'mat-074',
                q: 'Um reticulado na teoria da ordem modela hierarquias. Qual propriedade fundamental?',
                a: ['Existência de sup e inf para pares', 'Totalmente ordenado', 'Bem ordenado', 'Finito'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT303',
                explanation: 'Reticulado é conjunto parcialmente ordenado onde todo par tem supremo e ínfimo.'
            },
            {
                id: 'mat-075',
                q: 'A teoria K em topologia algébrica classifica fibrados vetoriais. K(X) é grupo de quê?',
                a: ['Classes de isomorfismo de fibrados', 'Homotopia', 'Homologia', 'Cohomologia'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'K(X) é grupo de Grothendieck de classes de isomorfismo de fibrados vetoriais sobre X.'
            },
            {
                id: 'mat-076',
                q: 'Um modelo de Ramsey em economia matemática evita crises. O que garance o teorema de Ramsey?',
                a: ['Existência de equilíbrio otimizador', 'Mercado eficiente', 'Crescimento estável', 'Distribuição justa'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT402',
                explanation: 'Teorema de Ramsey garante existência de trajetória ótima de crescimento em modelos intertemporais.'
            },
            {
                id: 'mat-077',
                q: 'A análise não-standard usa infinitesimais reais. Qual vantagem no cálculo?',
                a: ['Torna intuitivas definições de limite', 'Mais rigorosa', 'Mais simples', 'Mais rápida'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT405',
                explanation: 'Análise não-standard torna conceitos como limite e continuidade mais intuitivos usando infinitesimais.'
            },
            {
                id: 'mat-078',
                q: 'Um espaço de Banach é completo na sua norma. Exemplo importante?',
                a: ['Espaço L^p de funções integráveis', 'R^n', 'Espaço das contínuas', 'Todos anteriores'],
                correct: 3,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT404',
                explanation: 'Todos são exemplos de espaços de Banach quando equipados com normas apropriadas.'
            },
            {
                id: 'mat-079',
                q: 'A geometria simplética surge na mecânica hamiltoniana. O que preserva a forma simplética?',
                a: ['Área orientada', 'Comprimento', 'Ângulo', 'Volume'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Forma simplética mede área orientada e transformações simpléticas preservam essa área.'
            },
            {
                id: 'mat-080',
                q: 'Um monoide na álgebra abstrata tem operação associativa com identidade. Diferença para grupo?',
                a: ['Pode faltar inversos', 'Sem identidade', 'Não associativo', 'Comutativo'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT303',
                explanation: 'Monoide tem operação associativa e elemento identidade, mas nem todo elemento tem inverso.'
            },
            {
                id: 'mat-081',
                q: 'A teoria ergódica estuda médias temporais. Hipótese ergódica em física estatística diz que?',
                a: ['Média temporal = média espacial', 'Sistema é periódico', 'Caótico', 'Determinístico'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT403',
                explanation: 'Hipótese ergódica: médias temporais ao longo de trajetória igualam médias espaciais sobre espaço de fase.'
            },
            {
                id: 'mat-082',
                q: 'Um fecho algébrico de corpo contém raízes de todos polinômios. Para R, qual é?',
                a: ['C (complexos)', 'Q (racionais)', 'Z (inteiros)', 'N (naturais)'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT303',
                explanation: 'Fecho algébrico de R é C (números complexos), pelo Teorema Fundamental da Álgebra.'
            },
            {
                id: 'mat-083',
                q: 'A topologia de Zariski em geometria algébrica tem que propriedade incomum?',
                a: ['Não Hausdorff', 'Métrica', 'Discreta', 'Compacta'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Topologia de Zariski geralmente não é Hausdorff - abertos são muito grandes, fechados são conjuntos algébricos.'
            },
            {
                id: 'mat-084',
                q: 'Um esquema na geometria algébrica moderna unifica álgebra e geometria. É espaço localmente o quê?',
                a: ['Espec de anel', 'Espaço vetorial', 'Variedade diferenciável', 'Conjunto aberto'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Esquema é espaço localmente isomorfo a espectro de anel comutativo (Spec A).'
            },
            {
                id: 'mat-085',
                q: 'A teoria de Galois relaciona equações e grupos. O que mede o grupo de Galois?',
                a: ['Simetrias das raízes', 'Número de raízes', 'Grau da equação', 'Coeficientes'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT303',
                explanation: 'Grupo de Galois de extensão mede simetrias (automorfismos) que fixam o corpo base.'
            },
            {
                id: 'mat-086',
                q: 'Um complexo de cadeias na homologia é sequência de grupos com d_n∘d_{n-1}=0. O que isso garante?',
                a: ['Im(d_{n-1}) ⊆ Ker(d_n)', 'Exatidão', 'Isomorfismo', 'Dualidade'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Condição d_n∘d_{n-1}=0 significa que imagem de d_{n-1} está contida no núcleo de d_n.'
            },
            {
                id: 'mat-087',
                q: 'A análise funcional estuda espaços de funções. O que diz teorema de Hahn-Banach?',
                a: ['Extensão de funcionais lineares', 'Existência de base', 'Compacidade', 'Convergência'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT404',
                explanation: 'Teorema de Hahn-Banach permite estender funcionais lineares limitados de subespaço para todo espaço.'
            },
            {
                id: 'mat-088',
                q: 'Um espaço métrico geodésico tem curvas minimizantes. Exemplo fundamental?',
                a: ['Variedade Riemanniana', 'Espaço vetorial', 'Conjunto discreto', 'Espaço topológico'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Variedades Riemannianas são espaços métricos geodésicos onde geodésicas minimizam localmente distância.'
            },
            {
                id: 'mat-089',
                q: 'A teoria de representação estuda grupos via transformações lineares. O que é representação irredutível?',
                a: ['Sem subrepresentações próprias não nulas', 'De grau 1', 'Abeliana', 'Fiel'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT303',
                explanation: 'Representação é irredutível se não tem subespaços invariantes próprios não triviais.'
            },
            {
                id: 'mat-090',
                q: 'Um feixe coerente em geometria algébrica tem propriedades finitárias. O que garante teorema de Serre?',
                a: ['Equivalência com categoria de módulos', 'Existência', 'Unicidade', 'Classificação'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Teorema de Serre: categoria de feixes coerentes sobre variedade projetiva equivale a categoria de módulos graduados.'
            },
            {
                id: 'mat-091',
                q: 'A teoria de Morse estuda funções em variedades. O que informação crítica revela?',
                a: ['Topologia da variedade', 'Geometria', 'Área', 'Volume'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT402',
                explanation: 'Teoria de Morse: pontos críticos de função Morse contêm informação sobre topologia da variedade.'
            },
            {
                id: 'mat-092',
                q: 'Um espaço homogêneo G/H tem grupo G agindo transitivamente. O que significa isotropia H?',
                a: ['Estabilizador de ponto', 'Subgrupo normal', 'Centro', 'Comutador'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'H é subgrupo de isotropia (estabilizador) de algum ponto, e espaço homogêneo é G/H.'
            },
            {
                id: 'mat-093',
                q: 'A geometria não comutativa generaliza espaços via álgebras. O que substitui pontos?',
                a: ['Ideais primos da álgebra', 'Elementos', 'Unidades', 'Derivações'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Na geometria não comutativa, pontos correspondem a ideais primos (ou primitivos) da álgebra.'
            },
            {
                id: 'mat-094',
                q: 'Um operador auto-adjunto em espaço de Hilbert tem espectro real. Importância em mecânica quântica?',
                a: ['Observáveis físicos', 'Estados', 'Evolução temporal', 'Medições'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT404',
                explanation: 'Em mecânica quântica, observáveis são representados por operadores auto-adjuntos (espectro real).'
            },
            {
                id: 'mat-095',
                q: 'A teoria de percolação modela propagação em redes. O que é limiar crítico p_c?',
                a: ['Probabilidade acima da qual aparece componente infinito', 'Densidade média', 'Conectividade', 'Diâmetro'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT403',
                explanation: 'p_c é probabilidade crítica: para p > p_c, há componente conexo infinito com probabilidade positiva.'
            },
            {
                id: 'mat-096',
                q: 'Um invariante knot distingue nós. Exemplo simples?',
                a: ['Número de enlaçamento', 'Comprimento', 'Espessura', 'Raio'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Número de enlaçamento (linking number) é invariante simples que mede como duas curvas se entrelaçam.'
            },
            {
                id: 'mat-097',
                q: 'A geometria tropical substitui operações por max e +. Como soma tropical de 3 e 5?',
                a: ['5 (max(3,5))', '8 (3+5)', '15 (3×5)', '2 (5-3)'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13MAT202',
                explanation: 'Na geometria tropical, soma é máximo: 3 ⊕ 5 = max(3,5) = 5.'
            },
            {
                id: 'mat-098',
                q: 'Um campo vetorial em variedade tem singularidades. O que diz teorema de Poincaré-Hopf?',
                a: ['Soma índices = característica de Euler', 'Sem singularidades', 'Integral zero', 'Conservativo'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT402',
                explanation: 'Teorema de Poincaré-Hopf: soma índices de singularidades de campo vetorial = característica de Euler da variedade.'
            },
            {
                id: 'mat-099',
                q: 'A teoria de Hodge em variedades Kähler relaciona formas harmônicas. O que diz decomposição de Hodge?',
                a: ['Todo cohomology class tem representante harmônico único', 'Decomposição ortogonal', 'Isomorfismo', 'Dualidade'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Decomposição de Hodge: em variedade compacta Kähler, formas podem ser decompostas, e cada classe cohomologia tem representante harmônico único.'
            },
            {
                id: 'mat-100',
                q: 'Um espaço hiperbólico de Gromov generaliza curvatura negativa. Qual propriedade característica?',
                a: ['Desigualdade do triângulo fina', 'Geodésicas únicas', 'Simplesmente conexo', 'Completo'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13MAT202',
                explanation: 'Espaço hiperbólico no sentido de Gromov satisfaz desigualdade do triângulo fina (thin triangle condition).'
            }
        ],
        summary: 'A matemática aplicada ao DCRB foca na resolução de problemas reais, usando funções e geometria para ler o mundo e o território baiano.',
        mindMap: 'https://exemplo.com/mindmaps/matematica-dcrb.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYhACfQUtM0eL_9d6Q_nhx-q'
    },
    {
        id: 'geografia-ba',
        title: 'Geografia: Território Baiano',
        description: 'Análise espacial e cultural da Bahia.',
        iconName: 'Globe',
        category: 'Humanas',
        learningObjective: 'Analisar a formação territorial da Bahia e suas dinâmicas socioespaciais contemporâneas.',
        xp: 800,
        questions: [
            {
                id: 'geo-q1',
                q: 'O DCRB destaca a importância da leitura do mundo. Qual bioma é predominante no semiárido baiano e exige estratégias específicas de convivência?',
                a: ['Mata Atlântica', 'Cerrado', 'Caatinga', 'Pampas'],
                correct: 2,
                difficulty: 'easy',
                bloomLevel: 'Conhecer',
                skillCode: 'DCRB-GEO-01',
                explanation: 'A Caatinga é o bioma exclusivo do Brasil e cobre grande parte do território baiano, exigindo políticas de sustentabilidade.',
                videoUrl: 'https://www.youtube.com/watch?v=vg9-DLSuo7Q'
            },
            {
                id: 'geo-q2',
                q: 'Analise o impacto do Polo Petroquímico de Camaçari na economia regional. Esse fenômeno é um exemplo de:',
                a: ['Desconcentração industrial', 'Industrialização planejada e concentração técnica', 'Economia de subsistência', 'Turismo histórico'],
                correct: 1,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-04',
                explanation: 'O Polo representa uma zona de intensa atividade industrial que altera a dinâmica populacional e econômica da Região Metropolitana de Salvador.',
                videoUrl: 'https://www.youtube.com/watch?v=v15_Y7oQ9K8'
            },
            {
                id: 'geo-001',
                q: 'Qual processo geológico formou a Chapada Diamantina há milhões de anos?',
                a: ['Dobramentos antigos e erosão diferencial', 'Vulcanismo intenso', 'Glaciação', 'Sedimentação marinha recente'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-02',
                explanation: 'A Chapada Diamantina resultou de dobramentos no Pré-Cambriano seguidos de intensa erosão que revelou quartzitos e arenitos.'
            },
            {
                id: 'geo-002',
                q: 'O Recôncavo Baiano tem importância histórica devido principalmente a:',
                a: ['Ciclo da cana-de-açúcar e escravidão', 'Mineração de ouro', 'Ciclo do café', 'Industrialização precoce'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Conhecer',
                skillCode: 'DCRB-GEO-05',
                explanation: 'O Recôncavo foi núcleo da economia açucareira colonial, com engenhos que utilizaram mão de obra escravizada em larga escala.'
            },
            {
                id: 'geo-003',
                q: 'Qual fator explica a concentração populacional na Região Metropolitana de Salvador?',
                a: ['Conurbação urbana e centralidade econômica', 'Fertilidade do solo', 'Clima ameno', 'Existência de minérios'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-07',
                explanation: 'A RMS concentra funções administrativas, industriais e de serviços, atraindo migração e gerando conurbação com municípios vizinhos.'
            },
            {
                id: 'geo-004',
                q: 'O Rio São Francisco é vital para o sertão baiano. Qual problema atual ameaça sua sustentabilidade?',
                a: ['Transposição e assoreamento', 'Excesso de chuvas', 'Congelamento no inverno', 'Eutrofização natural'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-09',
                explanation: 'A transposição altera vazão natural e o assoreamento reduz capacidade, comprometendo usos múltiplos no semiárido.'
            },
            {
                id: 'geo-005',
                q: 'A Zona da Mata no sul da Bahia tem economia baseada historicamente em:',
                a: ['Cacau e turismo ecológico', 'Soja e milho', 'Pecuária extensiva', 'Indústria têxtil'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Conhecer',
                skillCode: 'DCRB-GEO-06',
                explanation: 'A região foi grande produtora mundial de cacau, complementada recentemente pelo turismo nas áreas de Mata Atlântica preservada.'
            },
            {
                id: 'geo-006',
                q: 'Qual é a principal causa da desertificação em áreas do sertão baiano?',
                a: ['Uso inadequado do solo e mudanças climáticas', 'Excesso de chuvas', 'Reflorestamento', 'Industrialização'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-10',
                explanation: 'Práticas como desmatamento, sobrepastoreiro e agricultura inadequada, somadas a mudanças climáticas, aceleram a desertificação.'
            },
            {
                id: 'geo-007',
                q: 'O Porto de Salvador tem importância estratégica por:',
                a: ['Ser principal escoamento do Centro-Oeste e servir ao Polo Industrial', 'Escoar apenas produtos locais', 'Ser porto exclusivamente turístico', 'Estar localizado longe das rotas comerciais'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-08',
                explanation: 'Sua localização privilegiada conecta produção do Centro-Oeste brasileiro aos mercados internacionais e atende ao Polo de Camaçari.'
            },
            {
                id: 'geo-008',
                q: 'As cidades de Barreiras e Luís Eduardo Magalhães no oeste baiano têm crescimento baseado em:',
                a: ['Agronegócio de grãos e irrigação', 'Mineração de diamantes', 'Turismo religioso', 'Indústria naval'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-06',
                explanation: 'A expansão da fronteira agrícola com soja, milho e algodão, usando irrigação do Rio Grande, impulsiona a economia regional.'
            },
            {
                id: 'geo-009',
                q: 'Qual fenômeno climático explica as secas prolongadas no sertão baiano?',
                a: ['Atuação da massa equatorial continental e irregularidade das chuvas', 'Influência constante da massa polar atlântica', 'Ventos alísios úmidos permanentes', 'Frentes frias intensas'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-03',
                explanation: 'A massa equatorial continental é quente e seca, e a irregularidade pluviométrica caracteriza o clima semiárido.'
            },
            {
                id: 'geo-010',
                q: 'A Ilha de Itaparica tem importância geoestratégica por:',
                a: ['Proteger a Baía de Todos os Santos e ter potencial turístico', 'Abrigar o principal porto do estado', 'Ser centro industrial', 'Ter grandes reservas minerais'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-11',
                explanation: 'Sua posição na entrada da baía oferece proteção natural e suas praias e cultura são ativos turísticos importantes.'
            },
            {
                id: 'geo-011',
                q: 'Qual o principal impacto ambiental da carcinicultura no litoral norte baiano?',
                a: ['Destruição de manguezais e alteração de ecossistemas', 'Aumento da biodiversidade', 'Enriquecimento do solo', 'Controle natural de pragas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-12',
                explanation: 'A criação de camarões em cativeiro frequentemente substitui manguezais, ecossistemas importantes para reprodução de espécies marinhas.'
            },
            {
                id: 'geo-012',
                q: 'O Complexo Intermodal de Camaçari integra diferentes modos de transporte. Qual vantagem isso oferece?',
                a: ['Redução de custos logísticos e maior eficiência', 'Aumento da poluição', 'Concentração em um único modal', 'Diminuição da segurança'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-08',
                explanation: 'A integração rodoviária, ferroviária e portuária otimiza a cadeia logística, reduzindo custos e aumentando competitividade.'
            },
            {
                id: 'geo-013',
                q: 'Qual fator histórico explica a localização de Salvador como primeira capital do Brasil?',
                a: ['Posição estratégica na Baía de Todos os Santos e proximidade com Europa', 'Existência de ouro', 'Clima frio', 'Distância do litoral'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-05',
                explanation: 'A baía oferecia porto natural seguro e a posição era favorável às rotas marítimas com a Europa.'
            },
            {
                id: 'geo-014',
                q: 'As comunidades quilombolas na Bahia mantêm relação especial com o território porque:',
                a: ['Preservam conhecimentos tradicionais e têm direito à terra por reconhecimento constitucional', 'Não usam recursos naturais', 'São nômades', 'Rejeitam qualquer tipo de agricultura'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-13',
                explanation: 'As comunidades mantêm práticas sustentáveis herdadas e têm direitos territoriais assegurados pela Constituição de 1988.'
            },
            {
                id: 'geo-015',
                q: 'Qual a importância geopolítica da Base de Lançamento de Alcântara para a Bahia?',
                a: ['Posicionamento estratégico próximo à linha do Equador e desenvolvimento tecnológico', 'Defesa contra invasões terrestres', 'Centro de mineração', 'Base agrícola'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-11',
                explanation: 'A proximidade com a linha do Equador economiza combustível em lançamentos e atrai investimentos em tecnologia espacial.'
            },
            {
                id: 'geo-016',
                q: 'O Parque Nacional da Chapada Diamantina atrai turistas principalmente por suas:',
                a: ['Formações rochosas únicas, cachoeiras e grutas', 'Praias oceânicas', 'Neve no inverno', 'Grandes centros urbanos'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Conhecer',
                skillCode: 'DCRB-GEO-14',
                explanation: 'O parque oferece paisagens espetaculares com morros, vales, cavernas e quedas d\'água em meio à Caatinga e Cerrado.'
            },
            {
                id: 'geo-017',
                q: 'Qual problema urbano é mais grave em Salvador devido à sua topografia?',
                a: ['Segregação socioespacial entre Cidade Alta e Baixa', 'Falta de água', 'Frio intenso', 'Vulcanismo ativo'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-07',
                explanation: 'A elevação do terreno criou divisão histórica entre áreas nobres no alto e populares na baixa, aprofundando desigualdades.'
            },
            {
                id: 'geo-019',
                q: 'Qual o principal impacto da construção de barragens no Rio São Francisco para o sertão?',
                a: ['Regularização de vazão para irrigação e energia, mas com deslocamento de populações', 'Aumento das secas', 'Diminuição da evaporação', 'Eliminação completa das cheias naturais'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-10',
                explanation: 'Barragens como Sobradinho geram energia e permitem irrigação, mas alagam terras férteis e deslocam comunidades tradicionais.'
            },
            {
                id: 'geo-020',
                q: 'O que explica a alta biodiversidade da Mata Atlântica no sul da Bahia?',
                a: ['Isolamento geográfico durante eras glaciais e variedade de microclimas', 'Solo uniforme', 'Clima desértico', 'Intervenção humana recente'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-02',
                explanation: 'Refúgios florestais durante glaciações permitiram especiação, e a diversidade topográfica cria múltiplos microclimas.'
            },
            {
                id: 'geo-021',
                q: 'Qual a relação entre o ciclo do cacau e a formação das cidades do sul da Bahia?',
                a: ['Formação de núcleos urbanos ao redor das fazendas e comércio de exportação', 'Cidades planejadas pelo governo', 'Urbanização independente da economia', 'Declínio urbano durante o ciclo'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-05',
                explanation: 'Cidades como Ilhéus e Itabuna cresceram como centros de processamento e exportação do cacau, com arquitetura influenciada pela riqueza dos coronéis.'
            },
            {
                id: 'geo-022',
                q: 'Por que o sertão baiano tem solos geralmente pouco profundos e pedregosos?',
                a: ['Intenso intemperismo físico e baixa decomposição orgânica', 'Excesso de chuvas', 'Atividade vulcânica recente', 'Presença de geleiras'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-02',
                explanation: 'O clima semiárido com chuvas concentradas causa erosão, e a vegetação esparsa fornece pouca matéria orgânica.'
            },
            {
                id: 'geo-023',
                q: 'Qual o papel das veredas no Cerrado baiano?',
                a: ['Manutenção de água no subsolo e corredores ecológicos', 'Impedir a infiltração', 'Acelerar a desertificação', 'Servir apenas para agricultura'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-03',
                explanation: 'Veredas são áreas úmidas que recarregam aquíferos e conectam ecossistemas, sendo vitais para biodiversidade.'
            },
            {
                id: 'geo-024',
                q: 'Como a Zona Franca de Manaus influencia a economia da Bahia?',
                a: ['Competição por indústrias e fluxo de produtos eletrônicos', 'Cooperação direta com o Polo de Camaçari', 'Não há relação significativa', 'Favorece apenas a agricultura baiana'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-08',
                explanation: 'A ZFM atrai indústrias com incentivos, competindo com a Bahia, enquanto produtos eletrônicos chegam ao mercado baiano.'
            },
            {
                id: 'geo-025',
                q: 'Qual o significado geopolítico da posição da Bahia no Atlântico Sul?',
                a: ['Controle de rotas marítimas e projeção para África', 'Isolamento internacional', 'Foco apenas no Pacífico', 'Posição irrelevante'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-11',
                explanation: 'A posição estratégica permite vigilância de rotas comerciais e facilita relações com países africanos, herança da diáspora.'
            },
            {
                id: 'geo-026',
                q: 'Por que o litoral norte baiano tem dunas móveis?',
                a: ['Ventos constantes de sudeste e sedimentos arenosos abundantes', 'Atividade tectônica', 'Derretimento de geleiras', 'Desmatamento recente'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-02',
                explanation: 'Ventos alísios transportam areia da praia, formando dunas que se movem com a direção do vento.'
            },
            {
                id: 'geo-027',
                q: 'Qual o impacto do turismo de massa em Porto Seguro?',
                a: ['Geração de emprego mas pressão sobre infraestrutura e meio ambiente', 'Apenas benefícios econômicos', 'Declínio cultural', 'Aumento da qualidade de vida sem contrapartidas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-14',
                explanation: 'O turismo movimenta a economia mas sobrecarrega saneamento, gera resíduos e pode banalizar culturas tradicionais.'
            },
            {
                id: 'geo-028',
                q: 'Como a BR-101 influencia o desenvolvimento regional?',
                a: ['Eixo de integração nacional e desenvolvimento linear', 'Barreira natural', 'Via apenas local', 'Importância apenas histórica'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-08',
                explanation: 'A rodovia conecta regiões produtoras a centros consumidores, estimulando crescimento de cidades ao longo de seu traçado.'
            },
            {
                id: 'geo-029',
                q: 'Qual a importância das restingas para o litoral baiano?',
                a: ['Proteção contra erosão marinha e habitat especializado', 'Impedem o turismo', 'São barreiras para navegação', 'Não têm função ecológica'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-12',
                explanation: 'Restingas fixam dunas, reduzem impacto de ressacas e abrigam espécies endêmicas adaptadas a solos salinos.'
            },
            {
                id: 'geo-030',
                q: 'Por que o oeste baiano se tornou fronteira agrícola nas últimas décadas?',
                a: ['Solo de cerrado corrigido com tecnologia e disponibilidade hídrica', 'Solo naturalmente fértil', 'Clima úmido constante', 'Ausência de desafios logísticos'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-06',
                explanation: 'Correção da acidez do cerrado com calcário e irrigação dos rios da região permitiram expansão da soja e algodão.'
            },
            {
                id: 'geo-031',
                q: 'Qual a relação entre a bacia do Rio Paraguaçu e o abastecimento da RMS?',
                a: ['Principal fonte de água para Salvador e região metropolitana', 'Fornece apenas energia', 'Poluída irremediavelmente', 'Sem importância hídrica'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-09',
                explanation: 'O rio e seus afluentes suprem mais de 80% da água consumida na região através de sistemas como o Ipitanga.'
            },
            {
                id: 'geo-032',
                q: 'Como as falésias do litoral baiano se formaram?',
                a: ['Elevação tectônica e erosão marinha diferencial', 'Deposição de sedimentos recentes', 'Atividade vulcânica', 'Derretimento glacial'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-02',
                explanation: 'O soerguimento do continente expôs rochas à ação do mar, que erosiona camadas menos resistentes formando paredões.'
            },
            {
                id: 'geo-033',
                q: 'Qual o papel dos terreiros de candomblé na paisagem urbana de Salvador?',
                a: ['Espaços de resistência cultural e reorganização do território afro-brasileiro', 'Apenas locais religiosos', 'Barreiras ao desenvolvimento', 'Sem significado espacial'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-13',
                explanation: 'Os terreiros criam redes sociais e econômicas, preservando tradições e influenciando a ocupação de bairros periféricos.'
            },
            {
                id: 'geo-034',
                q: 'Por que o subsolo da Bahia tem diversidade mineral?',
                a: ['História geológica complexa com diferentes ambientes de formação', 'Atividade vulcânica recente', 'Sedimentação uniforme', 'Influência apenas do clima'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-02',
                explanation: 'Processos como metamorfismo, sedimentação e mineralização em diversas eras geológicas criaram depósitos variados.'
            },
            {
                id: 'geo-035',
                q: 'Como as mudanças climáticas afetam o litoral baiano?',
                a: ['Elevação do nível do mar e aumento da salinidade em estuários', 'Resfriamento das águas', 'Diminuição da erosão', 'Aumento das geadas'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-03',
                explanation: 'O aquecimento global eleva oceanos, ameaçando infraestrutura costeira e alterando ecossistemas como manguezais.'
            },
            {
                id: 'geo-036',
                q: 'Qual a importância do aquífero Urucuia para o oeste baiano?',
                a: ['Fonte de água para irrigação em períodos secos', 'Fornece apenas água potável doméstica', 'Está esgotado', 'Não tem uso prático'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-09',
                explanation: 'O aquífero armazena água que alimenta rios e é usada em pivôs centrais, sustentando a agricultura no cerrado.'
            },
            {
                id: 'geo-037',
                q: 'Como a divisão regional oficial (IBGE) classifica a Bahia?',
                a: ['Nordeste, com subdivisões em mesorregiões como Metropolitana, Centro-Norte etc.', 'Sudeste', 'Norte', 'Centro-Oeste'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Conhecer',
                skillCode: 'DCRB-GEO-01',
                explanation: 'A Bahia pertence à região Nordeste e é dividida em 7 mesorregiões e 32 microrregiões para planejamento estatístico.'
            },
            {
                id: 'geo-038',
                q: 'Qual o impacto da ferrovia Centro-Atlântica na economia baiana?',
                a: ['Escoamento de grãos do oeste e minério do centro-leste', 'Transporte apenas de passageiros', 'Desativada completamente', 'Importância apenas histórica'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-08',
                explanation: 'A ferrovia reduz custos do transporte de commodities para o Porto de Salvador, integrando o interior ao litoral.'
            },
            {
                id: 'geo-039',
                q: 'Por que o Parque das Dunas em Salvador é importante?',
                a: ['Único campo de dunas urbanas do Brasil e regulador climático', 'Área apenas recreativa', 'Sem valor ecológico', 'Impede a expansão urbana necessária'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-12',
                explanation: 'As dunas abrigam biodiversidade única, recarregam aquíferos e amenizam temperatura na cidade.'
            },
            {
                id: 'geo-040',
                q: 'Como a topografia influencia o clima na Chapada Diamantina?',
                a: ['Cria ilhas de altitude com clima mais ameno e orografia que induz chuvas', 'Não influencia', 'Só causa ventos', 'Torna o clima uniforme'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-03',
                explanation: 'A elevação reduz temperaturas e os paredões forçam elevação do ar úmido, provocando chuvas orográficas.'
            },
            {
                id: 'geo-041',
                q: 'Qual a relação entre a BR-116 e o desenvolvimento do sudoeste baiano?',
                a: ['Eixo de integração com São Paulo e escoamento da produção', 'Via apenas local', 'Importância diminuta', 'Barreira ao desenvolvimento'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-08',
                explanation: 'A rodovia conecta a região ao maior mercado consumidor do país, facilitando comércio de produtos como café e frutas.'
            },
            {
                id: 'geo-042',
                q: 'Por que os manguezais da Baía de Todos os Santos são protegidos por lei?',
                a: ['Berçário de espécies marinhas e filtro natural de poluentes', 'Não têm proteção legal', 'São áreas impróprias para conservação', 'Apenas por sua beleza cênica'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-12',
                explanation: 'Manguezais sustentam pesca artesanal, protegem a costa e retêm sedimentos e poluentes, sendo Área de Preservação Permanente.'
            },
            {
                id: 'geo-043',
                q: 'Como a urbanização acelerada afeta os rios urbanos em Feira de Santana?',
                a: ['Impermeabilização aumenta enchentes e poluição por esgoto', 'Melhora a qualidade da água', 'Não afeta o regime hídrico', 'Aumenta a vazão natural'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-07',
                explanation: 'A redução de áreas permeáveis eleva escoamento superficial, enquanto esgoto não tratado contamina os cursos d\'água.'
            },
            {
                id: 'geo-044',
                q: 'Qual a importância estratégica do Porto de Aratu?',
                a: ['Atende ao Polo Industrial e movimenta cargas perigosas', 'Porto apenas turístico', 'Desativado', 'Movimenta apenas grãos'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-08',
                explanation: 'O porto especializado atende à indústria química de Camaçari com infraestrutura para produtos perigosos.'
            },
            {
                id: 'geo-045',
                q: 'Como as comunidades de fundo de pasto no sertão organizam seu território?',
                a: ['Uso coletivo de terras para criação solta e extrativismo', 'Propriedades individuais cercadas', 'Agricultura intensiva', 'Exploração mineral'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-13',
                explanation: 'Sistema tradicional onde animais pastam livremente em áreas comuns e famílias coletam produtos do cerrado, com gestão comunitária.'
            },
            {
                id: 'geo-046',
                q: 'Por que o litoral sul da Bahia tem recifes de coral?',
                a: ['Águas claras e temperatura adequada para desenvolvimento dos corais', 'Águas poluídas', 'Frio intenso', 'Fundo lodoso'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-02',
                explanation: 'Condições como transparência, salinidade estável e temperatura entre 20-30°C permitem formação dos únicos recifes do Atlântico Sul.'
            },
            {
                id: 'geo-047',
                q: 'Qual o impacto da mineração de urânio em Caetité?',
                a: ['Geração de empregos mas risco de contaminação radiativa', 'Apenas benefícios econômicos', 'Melhora da qualidade da água', 'Sem impactos ambientais'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-10',
                explanation: 'A mineração movimenta economia local, mas resíduos radioativos exigem gestão cuidadosa para evitar contaminação de solos e águas.'
            },
            {
                id: 'geo-048',
                q: 'Como a transposição do São Francisco altera a dinâmica regional?',
                a: ['Leva água a regiões secas mas pode causar conflitos por uso', 'Resolve todos os problemas hídricos', 'Não tem efeito real', 'Seca ainda mais o rio principal'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-09',
                explanation: 'O projeto beneficia populações do semiárido, mas gera disputas sobre prioridades de uso e impactos ambientais nos afluentes.'
            },
            {
                id: 'geo-049',
                q: 'Qual a relação entre o cangaço e a geografia do sertão?',
                a: ['Terreno acidentado oferecia esconderijos e a secura dificultava perseguição', 'Não há relação', 'Lugares planos facilitavam o cangaço', 'Áreas úmidas eram preferidas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-05',
                explanation: 'Serras, cavernas e a vastidão do sertão permitiam que cangaceiros se movessem e se escondessem das volantes.'
            },
            {
                id: 'geo-050',
                q: 'Por que a Bahia tem potencial para energia eólica?',
                a: ['Ventos constantes no litoral e interior elevado', 'Ausência de ventos', 'Apenas no litoral', 'Ventos fracos e irregulares'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-06',
                explanation: 'Ventos alísios no litoral e regimes de vento em regiões como a Chapada Diamantina oferecem condições para geração eólica.'
            },
            {
                id: 'geo-051',
                q: 'Como as ilhas da Baía de Todos os Santos foram utilizadas historicamente?',
                a: ['Defesa militar, quarentena e cultivo', 'Sempre desabitadas', 'Apenas para turismo recente', 'Centros industriais'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-05',
                explanation: 'Ilhas como Itaparica (defesa), Bom Jesus (lazareto) e Maré (engenhos) tiveram funções estratégicas na colonização.'
            },
            {
                id: 'geo-052',
                q: 'Qual o papel dos brejos de altitude no semiárido?',
                a: ['Refúgios de biodiversidade e fontes de água permanentes', 'Áreas desertificadas', 'Sem importância ecológica', 'Impedem infiltração'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-03',
                explanation: 'Essas áreas úmidas em elevações mantêm flora e fauna únicas e fornecem água durante estiagens.'
            },
            {
                id: 'geo-053',
                q: 'Como a especulação imobiliária afeta o litoral de Salvador?',
                a: ['Verticalização excessiva e privatização de praias', 'Melhora o acesso público', 'Preserva áreas verdes', 'Reduz valores imobiliários'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-07',
                explanation: 'Condomínios de luxo restringem acesso ao mar e a construção densa altera paisagem e sobrecarrega infraestrutura.'
            },
            {
                id: 'geo-054',
                q: 'Qual a importância do Rio das Contas para o sul da Bahia?',
                a: ['Principal rio da bacia hidrográfica e suporte a atividades econômicas', 'Rio temporário sem importância', 'Poluído irremediavelmente', 'Fornece apenas energia'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-09',
                explanation: 'O rio abastece cidades, irriga agricultura e suas cabeceiras na Chapada são importantes para conservação.'
            },
            {
                id: 'geo-055',
                q: 'Por que o cerrado baiano é considerado "berço das águas"?',
                a: ['Nascentes de importantes bacias hidrográficas como São Francisco e Paraguaçu', 'Não tem nascentes', 'Área seca por natureza', 'Apenas recebe água de outras regiões'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-03',
                explanation: 'O bioma cerrado, com seu solo profundo e vegetação que favorece infiltração, alimenta rios de várias bacias.'
            },
            {
                id: 'geo-056',
                q: 'Como a cultura do sisal moldou a paisagem do semiárido baiano?',
                a: ['Extensas plantações e pequenas unidades de processamento familiar', 'Não deixou marcas', 'Apenas grandes indústrias', 'Cultivo apenas para subsistência'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-06',
                explanation: 'O sisal, resistente à seca, criou uma economia baseada em minifúndios com roças e casas de beneficiamento.'
            },
            {
                id: 'geo-057',
                q: 'Qual o impacto do cultivo de eucalipto no extremo sul?',
                a: ['Mudança na paisagem e possível redução da disponibilidade hídrica', 'Aumento da biodiversidade', 'Melhora da fertilidade do solo', 'Não altera ecossistema'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-10',
                explanation: 'Os extensos plantios substituem vegetação nativa e o eucalipto consome muita água, podendo afetar nascentes.'
            },
            {
                id: 'geo-058',
                q: 'Como as serras do espinhaço influenciam o clima regional?',
                a: ['Barreira para umidade e criadora de microclimas', 'Não influenciam', 'Só aumentam temperatura', 'Impedem a formação de ventos'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-03',
                explanation: 'A cadeia montanhosa intercepta ventos úmidos, criando chuvas no lado de barlavento e sombra de chuva no sotavento.'
            },
            {
                id: 'geo-059',
                q: 'Qual a importância geopolítica da Bahia no contexto nacional?',
                a: ['Porta de entrada do Nordeste e conexão Norte-Nordeste', 'Estado periférico', 'Importância apenas histórica', 'Isolado das rotas nacionais'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-11',
                explanation: 'A posição central no litoral nordestino e conexões terrestres fazem da Bahia hub logístico e econômico estratégico.'
            },
            {
                id: 'geo-060',
                q: 'Como as águas subterrâneas são utilizadas no carste da Chapada Diamantina?',
                a: ['Abastecem cidades através de nascentes e poços em fraturas', 'Inacessíveis', 'Contaminadas naturalmente', 'Sem uso humano'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-09',
                explanation: 'O terreno cárstico permite infiltração rápida, formando aquíferos que emergem em fontes como a do Ribeirão.'
            },
            {
                id: 'geo-061',
                q: 'Qual o papel dos parques eólicos na matriz energética baiana?',
                a: ['Diversificação e fonte renovável complementar', 'Energia principal', 'Sem importância', 'Substituem totalmente hidrelétricas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-06',
                explanation: 'A energia eólica complementa a hidrelétrica, especialmente em períodos secos, e é menos poluente.'
            },
            {
                id: 'geo-062',
                q: 'Por que a bacia do Rio Jequitinhonha tem problemas de assoreamento?',
                a: ['Desmatamento nas margens e mineração irregular', 'Excesso de chuvas', 'Natureza do solo', 'Construção de barragens'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-10',
                explanation: 'A remoção da vegetação ciliar e a garimpagem aumentam erosão e sedimentação no leito do rio.'
            },
            {
                id: 'geo-063',
                q: 'Como a cultura africana moldou a paisagem agrícola do recôncavo?',
                a: ['Introdução de culturas como dendê e técnicas de manejo', 'Não houve influência', 'Apenas técnicas europeias', 'Uso exclusivo de máquinas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-13',
                explanation: 'Africanos escravizados trouxeram conhecimentos agrícolas tropicais e plantas que se adaptaram ao território.'
            },
            {
                id: 'geo-064',
                q: 'Qual o impacto da salinização em solos irrigados no vale do São Francisco?',
                a: ['Redução da produtividade e degradação permanente', 'Melhora da fertilidade', 'Não ocorre na região', 'Apenas problema estético'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-10',
                explanation: 'Má drenagem e evaporação intensa acumulam sais no solo, tornando-o impróprio para agricultura.'
            },
            {
                id: 'geo-065',
                q: 'Como os costões rochosos do litoral baiano se formaram?',
                a: ['Intrusões ígneas resistentes à erosão marinha', 'Acúmulo de areia', 'Atividade coralínea', 'Deposição de conchas'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-02',
                explanation: 'Rochas como granito e gnaisse, mais resistentes que os sedimentos ao redor, formam promontórios que avançam no mar.'
            },
            {
                id: 'geo-066',
                q: 'Qual a relação entre o cacau e a preservação da Mata Atlântica?',
                a: ['Cultivo sob sombra mantém fragmentos florestais', 'Substitui completamente a mata', 'Não tem relação', 'Impede regeneração'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-12',
                explanation: 'O sistema cabruca, onde cacau cresce à sombra de árvores nativas, conserva biodiversidade enquanto produz.'
            },
            {
                id: 'geo-067',
                q: 'Por que a cidade de Vitória da Conquista tem clima mais ameno?',
                a: ['Altitude de aproximadamente 1000 metros', 'Proximidade do mar', 'Floresta densa', 'Influência de rio grande'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-03',
                explanation: 'A elevada altitude reduz temperaturas médias, dando características de clima tropical de altitude.'
            },
            {
                id: 'geo-068',
                q: 'Como as várzeas do São Francisco são utilizadas?',
                a: ['Agricultura de subsistência nas cheias naturais (antes das barragens)', 'Navegação intensiva', 'Urbanização', 'Mineração'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-09',
                explanation: 'As terras periodicamente inundadas eram naturalmente fertilizadas, permitindo cultivos como feijão e arroz.'
            },
            {
                id: 'geo-069',
                q: 'Qual o papel das unidades de conservação marinhas?',
                a: ['Proteção de recifes e controle da pesca predatória', 'Apenas para turismo', 'Sem efetividade', 'Impedem qualquer atividade humana'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-12',
                explanation: 'Áreas como o Parque Marinho de Abrolhos preservam biodiversidade e garantem sustentabilidade da pesca artesanal.'
            },
            {
                id: 'geo-070',
                q: 'Como a posição da Bahia no globo influencia seu clima?',
                a: ['Baixas latitudes garantem temperaturas altas o ano todo', 'Causa invernos rigorosos', 'Provoca neve', 'Temperaturas constantemente baixas'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-03',
                explanation: 'Localizada entre 8° e 18° sul, a Bahia recebe alta insolação durante todo o ano, com pequena variação térmica sazonal.'
            },
            {
                id: 'geo-071',
                q: 'Qual a importância das lagoas costeiras como a de Abaeté?',
                a: ['Ecossistemas únicos com dunas e vegetação especializada', 'Sem valor ecológico', 'Apenas para esportes náuticos', 'Áreas a serem aterradas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-12',
                explanation: 'Lagoas entre dunas abrigam espécies endêmicas e têm importância cultural, como a Lagoa do Abaeté em Salvador.'
            },
            {
                id: 'geo-072',
                q: 'Como o relevo tabular (chapadas) influencia a ocupação humana?',
                a: ['Topos planos favorecem agricultura e cidades, enquanto encostas são menos ocupadas', 'Impede qualquer ocupação', 'Só permite mineração', 'Favorece apenas pastagem'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-07',
                explanation: 'As áreas planas no topo das chapadas são preferidas para cultivos e urbanização, com estradas seguindo os platôs.'
            },
            {
                id: 'geo-073',
                q: 'Qual o impacto da monocultura de soja nos cerrados baianos?',
                a: ['Perda de biodiversidade e dependência de insumos externos', 'Aumento da diversidade', 'Melhora natural do solo', 'Sistema sustentável por natureza'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-10',
                explanation: 'A substituição do cerrado nativo por lavouras homogêneas reduz habitats e exige fertilizantes e agrotóxicos.'
            },
            {
                id: 'geo-074',
                q: 'Por que a Bahia tem diferentes tipos de solo em curtas distâncias?',
                a: ['Variação geológica, climática e de vegetação', 'Uniformidade total', 'Apenas influência humana', 'Somento tipo de rocha mãe'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-02',
                explanation: 'A interação entre rochas diversas, climas variados e diferentes coberturas vegetais gera complexo mosaico pedológico.'
            },
            {
                id: 'geo-075',
                q: 'Como os ventos alísios influenciam a vegetação do litoral?',
                a: ['Transportam umidade e moldam copas das árvores (bandeira)', 'Não influenciam', 'Só causam erosão', 'Impedem crescimento vegetal'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-03',
                explanation: 'Os ventos constantes do sudeste carregam umidade oceânica e deformam a copa das árvores no sentido contrário.'
            },
            {
                id: 'geo-076',
                q: 'Qual a relação entre as cavernas da Chapada Diamantina e o turismo?',
                a: ['Atração espeleológica que gera renda mas requer conservação', 'Sem potencial turístico', 'Fechadas permanentemente', 'Apenas para pesquisa'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-14',
                explanation: 'Grutas como a Lapa Doce atraem visitantes, criando empregos, mas o impacto humano pode danificar formações frágeis.'
            },
            {
                id: 'geo-077',
                q: 'Como a urbanização desordenada afeta as encostas de Salvador?',
                a: ['Aumenta risco de deslizamentos e dificulta acesso a serviços', 'Estabiliza os terrenos', 'Melhora drenagem', 'Não tem impacto'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-07',
                explanation: 'Ocupação de áreas íngremes sem infraestrutura adequada causa tragédias em períodos chuvosos e segregação social.'
            },
            {
                id: 'geo-078',
                q: 'Qual o papel dos rios temporários (intermitentes) no semiárido?',
                a: ['Drenagem das chuvas concentradas e recarga de aquíferos', 'Rios permanentes', 'Não existem', 'Só causam erosão'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-09',
                explanation: 'Esses rios, secos parte do ano, transportam água das chuvas e permitem infiltração nos leitos arenosos.'
            },
            {
                id: 'geo-079',
                q: 'Por que a baía de Camamu é importante para a pesca artesanal?',
                a: ['Manguezais fornecem nutrientes e abrigo para espécies marinhas', 'Águas poluídas', 'Sem vida marinha', 'Apenas para pesca industrial'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-06',
                explanation: 'A segunda maior baía do Brasil tem ecossistemas produtivos que sustentam comunidades pesqueiras há gerações.'
            },
            {
                id: 'geo-080',
                q: 'Como as mudanças no código florestal afetam a Bahia?',
                a: ['Impactam especialmente biomas como cerrado e caatinga, com debates sobre preservação', 'Não afetam', 'Só interessam à Amazônia', 'Apenas benefícios'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-12',
                explanation: 'A redução de áreas protegidas em APPs e reservas legais pode acelerar desmatamento nos biomas menos visados.'
            },
            {
                id: 'geo-081',
                q: 'Qual a importância do aquífero São Sebastião para Salvador?',
                a: ['Fonte alternativa de abastecimento em épocas de seca', 'Principal fonte', 'Contaminado', 'Inacessível'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-09',
                explanation: 'O aquífero na formação São Sebastião fornece água de boa qualidade que complementa o sistema superficial.'
            },
            {
                id: 'geo-082',
                q: 'Como a cultura indígena influenciou o uso do território baiano?',
                a: ['Sistemas agrícolas como a coivara e conhecimento de plantas medicinais', 'Não houve influência', 'Apenas na alimentação', 'Técnicas esquecidas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-13',
                explanation: 'Povos como os Pataxó e Tupinambá desenvolveram manejo sustentável da floresta e domesticação de espécies.'
            },
            {
                id: 'geo-083',
                q: 'Por que o litoral baiano tem diferentes tipos de praia?',
                a: ['Variação na energia das ondas, tipo de sedimento e geologia local', 'Todas iguais', 'Apenas areia branca', 'Influência apenas humana'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-02',
                explanation: 'Fatores como exposição a ondas, origem dos sedimentos (coral, quartzo) e presença de rios criam praias diversas.'
            },
            {
                id: 'geo-084',
                q: 'Qual o impacto do turismo náutico na Baía de Todos os Santos?',
                a: ['Geração de renda mas poluição por combustíveis e esgoto', 'Apenas positivo', 'Sem impacto', 'Impede outras atividades'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-14',
                explanation: 'Marinas e passeios movimentam economia, mas vazamentos e dejetos afetam qualidade da água e ecossistemas.'
            },
            {
                id: 'geo-085',
                q: 'Como a pecuária extensiva moldou a paisagem do sertão?',
                a: ['Substituição da caatinga por pastagens e abertura de cacimbas', 'Não alterou vegetação', 'Recuperou solos', 'Aumentou biodiversidade'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-10',
                explanation: 'A criação de gado em grandes propriedades levou ao desmatamento e construção de açudes, alterando ecossistemas.'
            },
            {
                id: 'geo-086',
                q: 'Qual a relação entre a BR-242 e o desenvolvimento do oeste baiano?',
                a: ['Principal eixo de escoamento da produção agrícola para o Porto de Salvador', 'Via apenas turística', 'Sem importância econômica', 'Ligação apenas com outros estados'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-08',
                explanation: 'A rodovia conecta a fronteira agrícola ao litoral, reduzindo custos de transporte de grãos e insumos.'
            },
            {
                id: 'geo-087',
                q: 'Por que os manguezais são considerados "filtros naturais"?',
                a: ['Retêm sedimentos e poluentes das águas continentais antes do mar', 'Não filtram', 'Apenas acumulam lixo', 'Poluem as águas'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-12',
                explanation: 'As raízes do mangue prendem partículas em suspensão e microorganismos processam matéria orgânica, melhorando qualidade da água.'
            },
            {
                id: 'geo-088',
                q: 'Como a posição da Terra de Santa Cruz influenciou a colonização?',
                a: ['Primeiro ponto avistado por Cabral, marcando início da ocupação portuguesa', 'Última região colonizada', 'Não teve importância', 'Área evitada pelos portugueses'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-05',
                explanation: 'O litoral sul baiano foi o primeiro contato europeu, iniciando o processo de exploração e povoamento do Brasil.'
            },
            {
                id: 'geo-089',
                q: 'Qual o impacto das mudanças no regime de chuvas na agricultura familiar?',
                a: ['Aumento da incerteza e perdas nas safras', 'Melhora das condições', 'Não afeta', 'Só beneficia'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-03',
                explanation: 'A irregularidade crescente das precipitações, com veranicos prolongados, compromete cultivos dependentes de chuva.'
            },
            {
                id: 'geo-090',
                q: 'Como os tabuleiros costeiros influenciam a ocupação humana?',
                a: ['Terras planas favoráveis à agricultura e urbanização, mas com solos pobres', 'Impedem ocupação', 'Só para preservação', 'Áreas alagadas'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-07',
                explanation: 'Os platôs junto ao litoral são intensamente usados para cidades e cultivos, apesar da necessidade de correção do solo.'
            },
            {
                id: 'geo-091',
                q: 'Qual a importância geológica da Serra do Sincorá?',
                a: ['Divisor de águas entre bacias e afloramentos de rochas pré-cambrianas', 'Sem importância', 'Apenas paisagística', 'Área vulcânica ativa'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-02',
                explanation: 'A serra separa bacias hidrográficas e expõe rochas entre as mais antigas do planeta, com registros geológicos importantes.'
            },
            {
                id: 'geo-092',
                q: 'Como o extrativismo do licuri sustenta comunidades no semiárido?',
                a: ['Uso múltiplo da palmeira (óleo, artesanato, alimentação) em sistema sustentável', 'Exploração predatória', 'Cultivo intensivo', 'Atividade em declínio total'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-06',
                explanation: 'A palmeira nativa fornece produtos para subsistência e comercialização sem necessidade de desmatamento.'
            },
            {
                id: 'geo-093',
                q: 'Por que a bacia do Rio Pardo é importante para o agronegócio?',
                a: ['Irrigação de cultivos como café e fruticultura no sudoeste', 'Navegação', 'Pesca industrial', 'Sem uso agrícola'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-09',
                explanation: 'As águas do rio e afluentes permitem agricultura irrigada em região com estação seca definida.'
            },
            {
                id: 'geo-094',
                q: 'Qual o papel das APPs urbanas na qualidade de vida?',
                a: ['Áreas verdes que melhoram microclima e oferecem lazer', 'Apenas restrições ao crescimento', 'Sem função urbana', 'Só para preservação distante'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-07',
                explanation: 'Mata ciliar, encostas e topos de morro protegidos nas cidades reduham ilhas de calor e fornecem espaços recreativos.'
            },
            {
                id: 'geo-095',
                q: 'Como a expansão da fronteira agrícola afeta comunidades tradicionais?',
                a: ['Conflitos por terra e redução de territórios para extrativismo', 'Melhora suas condições', 'Não afeta', 'Integração harmoniosa'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-13',
                explanation: 'A grilagem e compra de terras por grandes produtores expulsa quilombolas, indígenas e fundos de pasto.'
            },
            {
                id: 'geo-096',
                q: 'Por que o litoral baiano tem recifes em franja e em pontal?',
                a: ['Diferença na energia das ondas e tipo de substrato', 'Todos iguais', 'Apenas recifes de coral', 'Influência apenas humana'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-GEO-02',
                explanation: 'Recifes em franja acompanham a costa em águas calmas, enquanto em pontal se formam onde há maior energia das ondas.'
            },
            {
                id: 'geo-097',
                q: 'Qual o impacto do parcelamento irregular do solo em áreas de preservação?',
                a: ['Degradação ambiental e risco para moradores', 'Ordenamento urbano', 'Preservação da natureza', 'Sem consequências'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-07',
                explanation: 'Loteamentos em áreas de risco ou protegidas causam desmatamento, assoreamento e colocam população em perigo.'
            },
            {
                id: 'geo-098',
                q: 'Como a cultura marítima influencia a identidade do litoral baiano?',
                a: ['Festas, culinária e economia ligadas ao mar', 'Cultura apenas terrestre', 'Sem relação', 'Influência apenas estrangeira'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-GEO-13',
                explanation: 'Tradições como a festa de Iemanjá, pesca artesanal e receitas com frutos do mar marcam a cultura costeira.'
            },
            {
                id: 'geo-099',
                q: 'Qual a importância da bacia do Rio Grande para a irrigação?',
                a: ['Principal fonte para pivôs centrais no oeste baiano', 'Rio não utilizado', 'Apenas para navegação', 'Poluído demais'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-GEO-09',
                explanation: 'O rio e seus afluentes fornecem água para extensas áreas de agricultura irrigada no cerrado baiano.'
            },
            {
                id: 'geo-100',
                q: 'Como as unidades de conservação de uso sustentável funcionam?',
                a: ['Permitem atividades econômicas compatíveis com preservação', 'Proibição total', 'Apenas pesquisa', 'Uso exclusivo do governo'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-GEO-12',
                explanation: 'Categories como APA e RDS permitem moradia, agricultura familiar e extrativismo sob regras que garantam conservação.'
            }
        ],
        summary: 'O estudo geográfico baiano integra sociedade e natureza, focando no protagonismo do estudante diante da sua realidade local.',
        mindMap: 'https://exemplo.com/mindmaps/geografia-bahia.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYhHjvQvQvQvQvQvQvQvQvQv'
    },
    {
        id: 'historia-ba',
        title: 'História: Lutas e Identidades',
        description: 'Da colonização aos movimentos de independência na Bahia.',
        iconName: 'History',
        category: 'Humanas',
        learningObjective: 'Compreender os processos históricos de resistência e formação da sociedade baiana.',
        xp: 700,
        questions: [
            {
                id: 'hist-q1',
                q: 'A Independência da Bahia, celebrada em 2 de julho, difere do 7 de setembro por qual motivo principal?',
                a: ['Foi um acordo diplomático', 'Houve intensa participação popular e conflitos armados', 'Não teve participação de negros e mulheres', 'Foi decidida em Portugal'],
                correct: 1,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-02',
                explanation: 'O 2 de julho marca a expulsão das tropas portuguesas de Salvador com forte engajamento popular, incluindo figuras como Maria Quitéria e Joana Angélica.',
                videoUrl: 'https://www.youtube.com/watch?v=krzOVoXGHHY'
            },
            {
                id: 'hist-001',
                q: 'Qual foi o principal produto econômico do Recôncavo Baiano durante o período colonial?',
                a: ['Açúcar', 'Ouro', 'Café', 'Algodão'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Conhecer',
                skillCode: 'DCRB-HIS-03',
                explanation: 'O açúcar foi a base da economia colonial no Recôncavo, utilizando mão de obra escravizada africana em engenhos.'
            },
            {
                id: 'hist-002',
                q: 'Quem foi Zumbi dos Palmares e qual sua relação com a Bahia?',
                a: ['Líder do quilombo que pode ter nascido na Bahia e simboliza resistência negra', 'Governador colonial', 'Missionário jesuíta', 'Comerciante português'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-05',
                explanation: 'Zumbi, possivelmente nascido em território baiano, liderou o Quilombo dos Palmares, maior símbolo de resistência à escravidão.'
            },
            {
                id: 'hist-003',
                q: 'Qual a importância da Revolta dos Búzios (1798) na história baiana?',
                a: ['Primeiro movimento com ideais republicanos e abolicionistas no Brasil', 'Revolta apenas de elites', 'Movimento separatista', 'Revolta religiosa'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-04',
                explanation: 'Também chamada de Conjuração Baiana, defendia independência, república e fim da escravidão, envolvendo principalmente negros e mestiços.'
            },
            {
                id: 'hist-004',
                q: 'Quem foi Maria Quitéria e qual seu papel na Independência da Bahia?',
                a: ['Heroína que se disfarçou de homem para lutar nas tropas brasileiras', 'Rainha portuguesa', 'Abadessa do Convento da Lapa', 'Escravizada libertadora'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-02',
                explanation: 'Considerada a Joana d\'Arc brasileira, lutou pela independência baiana e foi a primeira mulher a integrar o Exército Brasileiro.'
            },
            {
                id: 'hist-005',
                q: 'O que foi o Cangaço e qual sua relação com a Bahia?',
                a: 'Movimento social de bandoleiros que atuou no sertão nordestino, incluindo a Bahia',
                a: ['Banditismo social no sertão com figuras como Lampião atuando na Bahia', 'Movimento político urbano', 'Revolta indígena', 'Revolução industrial'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-07',
                explanation: 'O cangaço foi fenômeno do sertão com aspectos de protesto social, e Lampião frequentou o noroeste baiano.'
            },
            {
                id: 'hist-006',
                q: 'Qual o significado histórico do Pelourinho em Salvador?',
                a: ['Local de castigo de escravizados que hoje simboliza memória e resistência', 'Mercado de escravos', 'Palácio governamental', 'Igreja colonial'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-08',
                explanation: 'O Pelourinho era onde escravizados eram punidos; hoje, como Centro Histórico, representa luta por preservação da cultura afro-brasileira.'
            },
            {
                id: 'hist-007',
                q: 'Quem foi Mãe Menininha do Gantois e sua importância?',
                a: ['Importante ialorixá que divulgou o candomblé e lutou contra intolerância religiosa', 'Rainha congolesa', 'Heroína da independência', 'Escritora modernista'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-09',
                explanation: 'Mãe Menininha foi líder religiosa fundamental para aceitação do candomblé, recebendo pessoas de todas as classes em seu terreiro.'
            },
            {
                id: 'hist-008',
                q: 'O que foi a Guerra de Canudos (1896-1897) e seu significado?',
                a: ['Conflito entre comunidade sertaneja liderada por Antônio Conselheiro e o Exército brasileiro', 'Revolta de escravizados', 'Guerra contra Portugal', 'Conflito entre estados'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-07',
                explanation: 'Canudos representou resistência popular contra República oligárquica e marginalização do sertanejo, com massacre que chocou o país.'
            },
            {
                id: 'hist-009',
                q: 'Qual a importância histórica do Porto de Salvador no período colonial?',
                a: ['Principal ponto de entrada de africanos escravizados e exportação de açúcar', 'Centro de mineração', 'Porto apenas militar', 'Exportação de café'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-03',
                explanation: 'Salvador foi maior porto negreiro das Américas e escoadouro da produção açucareira, definindo formação étnica e econômica da região.'
            },
            {
                id: 'hist-010',
                q: 'Quem foi Castro Alves e sua contribuição para a história baiana?',
                a: ['Poeta romântico que abraçou causa abolicionista em obras como "Navio Negreiro"', 'Político da independência', 'Líder quilombola', 'Militar imperial'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-09',
                explanation: 'Nascido na Bahia, Castro Alves usou sua poesia para denunciar horrores da escravidão, sendo chamado "Poeta dos Escravos".'
            },
            {
                id: 'hist-011',
                q: 'Qual o significado da Sabinada (1837-1838)?',
                a: ['Revolta autonomista em Salvador que proclamou República Baiana temporária', 'Revolta escrava', 'Movimento separatista do sul', 'Rebelião indígena'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-06',
                explanation: 'Liderada por Francisco Sabino, a revolta expressou insatisfação com centralização do Império e buscou autonomia para Bahia.'
            },
            {
                id: 'hist-012',
                q: 'O que foi o Quilombo dos Palmares e sua relação com a Bahia?',
                a: ['Maior quilombo das Américas que recebeu fugitivos de várias regiões, incluindo Bahia', 'Fazenda de açúcar', 'Missão jesuítica', 'Cidade colonial'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-05',
                explanation: 'Embora localizado em Alagoas, Palmares recebeu inúmeros africanos fugidos de engenhos baianos, simbolizando resistência em todo Nordeste.'
            },
            {
                id: 'hist-013',
                q: 'Quem foi João Ubaldo Ribeiro e sua importância para cultura baiana?',
                a: ['Escritor que retratou identidade baiana em obras como "Viva o Povo Brasileiro"', 'Político imperial', 'Líder religioso', 'Artista plástico'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-09',
                explanation: 'Nascido em Itaparica, João Ubaldo explorou em sua literatura as complexidades da sociedade baiana com humor e crítica social.'
            },
            {
                id: 'hist-014',
                q: 'Qual a importância histórica da Igreja do Bonfim em Salvador?',
                a: ['Símbolo do sincretismo religioso e devoção popular', 'Primeira igreja do Brasil', 'Catedral colonial', 'Igreja apenas para elite'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-08',
                explanation: 'O Bonfim representa fusão entre catolicismo e candomblé, com a lavagem das escadarias mostrando resistência cultural afro-brasileira.'
            },
            {
                id: 'hist-015',
                q: 'O que foi a Revolta dos Malês (1835) e seu significado?',
                a: ['Rebelião de escravizados muçulmanos em Salvador por liberdade e fim da escravidão', 'Revolta de soldados', 'Movimento de comerciantes', 'Protesto de indígenas'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-05',
                explanation: 'A mais significativa rebelião urbana de escravizados nas Américas, organizada por africanos islamizados que sabiam ler e escrever.'
            },
            {
                id: 'hist-016',
                q: 'Quem foi Pierre Verger e sua contribuição para estudos baianos?',
                a: ['Fotógrafo e pesquisador francês que documentou cultura afro-baiana e diáspora', 'Missionário colonial', 'Governador geral', 'Engenheiro holandês'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-09',
                explanation: 'Verger registrou em fotos e textos as relações entre Bahia e África, tornando-se babalorixá e referência nos estudos afro-brasileiros.'
            },
            {
                id: 'hist-017',
                q: 'Qual o papel dos jesuítas na história educacional da Bahia?',
                a: ['Fundaram primeiras escolas e colégios, como o Colégio dos Jesuítas em Salvador', 'Só catequizaram indígenas', 'Não atuaram na educação', 'Fundaram apenas universidades'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-03',
                explanation: 'Os jesuítas estabelecerem sistema educacional colonial, ensinando elites e catequizando indígenas, antes de expulsão em 1759.'
            },
            {
                id: 'hist-018',
                q: 'O que foi a "Guerra do Paraguai" e participação baiana?',
                a: ['Conflito onde baianos formaram "Voluntários da Pátria", incluindo escravizados alforriados', 'Guerra civil brasileira', 'Conflito regional', 'Rebelião local'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-06',
                explanation: 'A Bahia contribuiu com tropas e teve navios construídos no Arsenal da Marinha; muitos negros lutaram com promessa de liberdade.'
            },
            {
                id: 'hist-019',
                q: 'Quem foi Gregório de Matos e sua importância literária?',
                a: ['Poeta barroco conhecido como "Boca do Inferno" por sátiras à sociedade baiana colonial', 'Historiador da independência', 'Político republicano', 'Pintor colonial'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-09',
                explanation: 'Nascido em Salvador, Gregório criticou vícios da sociedade colonial com ironia ácida, sendo primeiro grande poeta brasileiro.'
            },
            {
                id: 'hist-020',
                q: 'Qual significado histórico do Elevador Lacerda?',
                a: ['Primeiro elevador urbano do Brasil, ligando Cidade Alta e Baixa, simbolizando modernização', 'Forte militar', 'Mercado de escravos', 'Igreja barroca'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-08',
                explanation: 'Inaugurado em 1873, resolvia problema de acesso entre partes da cidade e representava progresso tecnológico na capital baiana.'
            },
            {
                id: 'hist-021',
                q: 'O que foi a Inconfidência Baiana e diferenças para a Mineira?',
                a: ['Movimento popular com participação de negros e ideais abolicionistas, diferente da elite mineira', 'Movimento idêntico', 'Sem diferenças significativas', 'Apenas diferença de datas'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-04',
                explanation: 'Enquanto a Inconfidência Mineira era de elite e mantinha escravidão, a Baiana era popular, multirracial e defendia abolição.'
            },
            {
                id: 'hist-022',
                q: 'Quem foi Carybé e sua contribuição cultural?',
                a: ['Artista argentino-baiano que retratou cenas do cotidiano e religiosidade afro-brasileira', 'Político imperial', 'Escritor modernista', 'Líder quilombola'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-09',
                explanation: 'Carybé imortalizou em gravuras e pinturas a cultura baiana, especialmente os orixás e festas populares.'
            },
            {
                id: 'hist-023',
                q: 'Qual importância histórica do Mercado Modelo em Salvador?',
                a: ['Antigo mercado de escravos transformado em centro cultural e comercial', 'Primeira bolsa de valores', 'Sede do governo', 'Cine teatro'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-08',
                explanation: 'No local funcionou a Alfândega onde africanos escravizados eram comercializados; hoje abriga artesanato e cultura baiana.'
            },
            {
                id: 'hist-024',
                q: 'O que foi a "Campanha do sertão" na Independência da Bahia?',
                a: ['Estratégia militar que levou combates ao interior para isolar portugueses em Salvador', 'Marcha para o litoral', 'Fuga para o sul', 'Tratado diplomático'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-02',
                explanation: 'Liderada por Labatut e depois Lima e Silva, a campanha cortou suprimentos de tropas portuguesas sitiadas na capital.'
            },
            {
                id: 'hist-025',
                q: 'Quem foi Ruy Barbosa e seu legado para Bahia?',
                a: ['Jurista, político e abolicionista baiano que participou da fundação da República', 'Militar da independência', 'Líder religioso', 'Artista barroco'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-06',
                explanation: 'Nascido em Salvador, Ruy Barbosa foi figura central na transição para República e defensor de direitos civis e educação.'
            },
            {
                id: 'hist-026',
                q: 'Qual o significado histórico do Farol da Barra?',
                a: ['Primeiro farol das Américas e local de defesa contra invasões estrangeiras', 'Forte apenas decorativo', 'Mercado colonial', 'Igreja jesuíta'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-08',
                explanation: 'Construído no Forte de Santo Antônio, o farol guiava navios desde 1698 e testemunhou batalhas como a invasão holandesa.'
            },
            {
                id: 'hist-027',
                q: 'O que foi a "Revolta do Quebra-Quilos" (1874-1875) na Bahia?',
                a: ['Protesto popular contra sistema métrico decimal e aumento de impostos', 'Revolta escrava', 'Movimento separatista', 'Rebelião militar'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-07',
                explanation: 'Sertanejos destruíram instrumentos de medida por desconfiança das novas unidades e aumento de tributos, reprimidos violentamente.'
            },
            {
                id: 'hist-028',
                q: 'Quem foi Dorival Caymmi e importância para música baiana?',
                a: ['Compositor que retratou pescadores e cultura litorânea em canções como "O Que É Que a Baiana Tem?"', 'Político republicano', 'Escritor naturalista', 'Pintor modernista'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-09',
                explanation: 'Caymmi imortalizou tipos populares e paisagens baianas, influenciando gerações de músicos e divulgando cultura do estado.'
            },
            {
                id: 'hist-029',
                q: 'Qual importância histórica do Dique do Tororó em Salvador?',
                a: ['Local estratégico em batalhas da Independência e hoje espaço cultural', 'Centro industrial', 'Aeroporto colonial', 'Universidade imperial'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-08',
                explanation: 'O dique foi cenário de combates em 1823 e hoje abriga esculturas de orixás, simbolizando fusão entre história e cultura afro-baiana.'
            },
            {
                id: 'hist-030',
                q: 'O que foi a "Guerra dos Cabanos" na Bahia (1832-1835)?',
                a: ['Conflito de populares contra centralização imperial após abdicação de D. Pedro I', 'Revolta escrava urbana', 'Guerra entre estados', 'Rebelião militar'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-06',
                explanation: 'Também chamada de Cabanagem Baiana, foi movimento popular no recôncavo por melhores condições e autonomia, violentamente reprimido.'
            },
            {
                id: 'hist-031',
                q: 'Quem foi Anita Malfatti e sua relação com a Bahia?',
                a: ['Pintora modernista que embora paulista, influenciou artistas baianos com sua obra revolucionária', 'Escritora baiana', 'Política local', 'Musicista popular'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-09',
                explanation: 'Sua exposição de 1917 chocou conservadores e inspirou modernismo brasileiro, influenciando gerações de artistas em todo país.'
            },
            {
                id: 'hist-032',
                q: 'Qual significado do Campo Grande em Salvador na história baiana?',
                a: ['Local de desfiles cívicos, manifestações e antigo campo de treinamento militar', 'Centro financeiro', 'Área industrial', 'Bairro colonial'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-08',
                explanation: 'O amplo espaço foi palco de eventos desde período colonial, incluindo comemorações da Independência da Bahia.'
            },
            {
                id: 'hist-033',
                q: 'O que foi a "Revolta do Batalhão de Infantaria" (1824) na Bahia?',
                a: ['Motim militar contra condições de serviço e influência portuguesa pós-independência', 'Revolta escrava', 'Movimento separatista', 'Protesto religioso'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-02',
                explanation: 'Soldados brasileiros se rebelaram contra oficiais portugueses e más condições, mostrando tensões raciais e nacionais no novo exército.'
            },
            {
                id: 'hist-034',
                q: 'Quem foi Glauber Rocha e importância para cinema baiano?',
                a: ['Cineasta baiano, líder do Cinema Novo, com filmes como "Deus e o Diabo na Terra do Sol"', 'Ator de teatro', 'Produtor musical', 'Pintor expressionista'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-09',
                explanation: 'Glauber revolucionou cinema brasileiro com estética inovadora e crítica social, retratando dilemas do sertão e questões políticas.'
            },
            {
                id: 'hist-035',
                q: 'Qual importância histórica do Forte São Marcelo em Salvador?',
                a: ['Único forte circular das Américas, protegendo entrada do porto desde século XVII', 'Forte terrestre', 'Palácio governamental', 'Igreja fortificada'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-08',
                explanation: 'Construído no mar, defendia cidade de invasores e piratas, participando de conflitos como invasão holandesa e Independência.'
            },
            {
                id: 'hist-036',
                q: 'O que foi "Guerra do Contestado" e relação com Bahia?',
                a: ['Embora ocorrida no Sul, migrou baianos participaram do movimento messiânico', 'Guerra na Bahia', 'Conflito internacional', 'Rebelião urbana'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-07',
                explanation: 'Baianos que migraram para trabalhar na ferrovia no Sul se juntaram ao movimento, mostrando conexões entre problemas sociais regionais.'
            },
            {
                id: 'hist-037',
                q: 'Quem foi Edivaldo Brito e sua importância política?',
                a: ['Primeiro prefeito negro de Salvador (1971-1975) em período de redemocratização', 'Governador colonial', 'Senador imperial', 'Ministro da ditadura'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-10',
                explanation: 'Sua eleição em cidade com maioria negra representou avanço contra racismo estrutural, embora em contexto de regime militar.'
            },
            {
                id: 'hist-038',
                q: 'Qual significado histórico do Teatro São João em Santo Amaro?',
                a: ['Importante casa de espetáculos do século XIX que reflete riqueza do ciclo açucareiro', 'Teatro moderno', 'Cinema', 'Igreja barroca'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-08',
                explanation: 'Construído por barões do açúcar, mostra opulência do Recôncavo em seu apogeu e hoje é patrimônio cultural.'
            },
            {
                id: 'hist-039',
                q: 'O que foi a "Revolta da Armada" (1893-1894) e participação baiana?',
                a: ['Rebelião da marinha contra Floriano Peixoto com ações na Bahia', 'Revolta do exército', 'Movimento civil', 'Guerra internacional'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-06',
                explanation: 'Navios rebeldes atacaram Salvador e bloquearam porto, mostrando instabilidade da República Velha e federalismo como questão.'
            },
            {
                id: 'hist-040',
                q: 'Quem foi Mestre Didi e importância para cultura afro-baiana?',
                a: ['Artista e sacerdote que criou esculturas inspiradas em arte sacra africana e orixás', 'Político abolicionista', 'Escritor romântico', 'Compositor popular'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-09',
                explanation: 'Filho de Mãe Senhora, uniu arte contemporânea e tradição iorubá, sendo reconhecido internacionalmente.'
            },
            {
                id: 'hist-041',
                q: 'Qual importância histórica da Rua Chile (antiga Rua da Misericórdia) em Salvador?',
                a: ['Via que ligava porto à cidade alta, cenário de comércio e vida urbana desde colônia', 'Área rural', 'Distrito industrial', 'Bairro residencial moderno'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-08',
                explanation: 'A rua testemunhou chegada de escravizados, movimento de mercadorias e transformações urbanas da capital.'
            },
            {
                id: 'hist-042',
                q: 'O que foi "Guerra do Fogo" no contexto baiano?',
                a: ['Conflitos por controle de fósforos e isqueiros no sertão durante secas prolongadas', 'Guerra tribal', 'Conflito industrial', 'Batalha colonial'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-07',
                explanation: 'Durante secas extremas, controle do fogo (para cozinhar, espantar animais) gerava disputas entre famílias e comunidades sertanejas.'
            },
            {
                id: 'hist-043',
                q: 'Quem foi Luís Gama e relação com Bahia?',
                a: ['Advogado autodidata, abolicionista filho de africana livre com pai português baiano', 'Militar da independência', 'Governador provincial', 'Missionário'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-05',
                explanation: 'Embora atuasse em São Paulo, sua origem baiana e luta pela libertação de escravizados o conectam à história de resistência do estado.'
            },
            {
                id: 'hist-044',
                q: 'Qual significado histórico do Solar do Unhão em Salvador?',
                a: ['Antigo engenho urbano que hoje abriga Museu de Arte Moderna, mostrando transformações', 'Quartel militar', 'Igreja jesuíta', 'Mercado público'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-08',
                explanation: 'Do período colonial como engenho a centro cultural contemporâneo, o solar simboliza mudanças econômicas e culturais da cidade.'
            },
            {
                id: 'hist-045',
                q: 'O que foi "Revolta do Ronco da Abelha" (1851-1852) no sertão baiano?',
                a: ['Protestos contra recrutamento militar forçado para Guerra do Paraguai', 'Revolta escrava', 'Movimento separatista', 'Rebelião religiosa'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-06',
                explanation: 'Sertanejos fugiam ao ouvir tropas (o "ronco"), recusando servir em guerra distante enquanto famílias passavam necessidades.'
            },
            {
                id: 'hist-046',
                q: 'Quem foi Mãe Stella de Oxóssi e importância religiosa?',
                a: ['Yalorixá do Ilê Axé Opô Afonjá, primeira sacerdotisa a escrever livros sobre candomblé', 'Heroína da independência', 'Política republicana', 'Artista plástica'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-09',
                explanation: 'Sua atuação intelectualizou e divulgou o candomblé, combatendo preconceito e preservando tradições africanas.'
            },
            {
                id: 'hist-047',
                q: 'Qual importância histórica da Igreja e Convento de São Francisco em Salvador?',
                a: ['Exemplo máximo do barroco brasileiro com arte sacra e trabalho escravo indígena e africano', 'Igreja gótica', 'Templo protestante', 'Capela simples'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-08',
                explanation: 'A riqueza da talha dourada contrasta com a exploração que a financiou, representando contradições da sociedade colonial.'
            },
            {
                id: 'hist-048',
                q: 'O que foi "Guerra dos Marimbondos" (1851-1852) na Bahia?',
                a: ['Revolta popular contra cobrança de impostos sobre carne-seca e farinha', 'Conflito internacional', 'Guerra entre estados', 'Rebelião militar'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-HIS-07',
                explanation: 'Sertanejos atacaram coletorias e queimaram registros fiscais, protestando contra taxação de alimentos básicos durante seca.'
            },
            {
                id: 'hist-049',
                q: 'Quem foi Capistrano de Abreu e contribuição para historiografia baiana?',
                a: ['Historiador cearense que pesquisou formação do Brasil com fontes incluindo história baiana', 'Político baiano', 'Militar imperial', 'Escritor romântico'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-01',
                explanation: 'Sua obra pioneira, como "Capítulos de História Colonial", inclui análise do papel da Bahia na formação nacional.'
            },
            {
                id: 'hist-050',
                q: 'Qual significado histórico do Parque São Bartolomeu em Salvador?',
                a: ['Local de resistência quilombola e celebrações afro-religiosas no Subúrbio Ferroviário', 'Parque industrial', 'Área de elite', 'Jardim colonial'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-HIS-08',
                explanation: 'Área verde que abriga nascentes e foi refúgio de quilombolas, mantendo importância cultural para comunidades negras.'
            }
        ],
        summary: 'A história na Bahia é marcada pela resistência. O DCRB valoriza a compreensão desses processos para a formação do pensamento crítico.',
        mindMap: 'https://exemplo.com/mindmaps/historia-bahia.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYgZcDaMhS3yLZm0gTOqX-73'
    },
    {
        id: 'biologia-cnt',
        title: 'Biologia: Vida e Ambiente',
        description: 'Citologia e ecossistemas locais.',
        iconName: 'Dna',
        category: 'Biológicas',
        learningObjective: 'Relacionar o funcionamento celular com a manutenção da vida e o equilíbrio dos biomas locais.',
        xp: 550,
        questions: [
            {
                id: 'bio-q1',
                q: 'Nas plantas da Caatinga, quais adaptações celulares permitem a sobrevivência ao estresse hídrico?',
                a: ['Aumento da respiração celular', 'Presença de estômatos que se fecham em horas quentes e parênquima aquífero', 'Ausência de mitocôndrias', 'Células sem parede celular'],
                correct: 1,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT202',
                explanation: 'Adaptações como o parênquima aquífero permitem o armazenamento de água, uma estratégia ativa de sobrevivência no semiárido.',
                videoUrl: 'https://www.youtube.com/watch?v=JnG0dZ1efuM'
            },
            {
                id: 'bio-001',
                q: 'Qual característica das células das plantas cactáceas do sertão baiano as ajudam a reter água?',
                a: ['Vacúolos grandes e parede celular espessa', 'Muitos cloroplastos', 'Núcleo duplo', 'Membrana celular fina'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'EM13CNT202',
                explanation: 'Vacúolos volumosos armazenam água e paredes celulares espessas reduzem perda por transpiração.'
            },
            {
                id: 'bio-002',
                q: 'No manguezal da Baía de Todos os Santos, como as raízes das plantas lidam com a salinidade?',
                a: ['Possuem glândulas de sal e raízes aéreas (pneumatóforos)', 'Absorvem todo o sal', 'Não crescem na água salgada', 'Filtram o sal através das folhas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT203',
                explanation: 'As plantas do mangue excretam excesso de sal por glândulas e pneumatóforos permitem respiração em solo alagado.'
            },
            {
                id: 'bio-003',
                q: 'Qual processo celular é intensificado nas sementes do licuri para sobreviver à estiagem?',
                a: ['Redução do metabolismo e desidratação controlada', 'Aumento da fotossíntese', 'Divisão celular acelerada', 'Produção contínua de enzimas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT202',
                explanation: 'As sementes entram em dormência com metabolismo mínimo, retomando crescimento apenas com umidade adequada.'
            },
            {
                id: 'bio-004',
                q: 'Como os peixes da Lagoa do Abaeté adaptaram-se às águas ácidas e escuras?',
                a: ['Desenvolvimento de quimiorrecepção aguçada e tolerância a pH baixo', 'Brânquias especiais para águas alcalinas', 'Perda da visão completa', 'Aumento do tamanho das escamas'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT204',
                explanation: 'A água escura e ácida das lagoas de dunas selecionou peixes com sensibilidade química e tolerância fisiológica.'
            },
            {
                id: 'bio-005',
                q: 'Qual a importância das micorrizas para plantas da Caatinga?',
                a: ['Aumentam absorção de água e nutrientes em solos pobres', 'Causam doenças nas raízes', 'Competem por água', 'Não existem na região'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT205',
                explanation: 'A associação com fungos amplifica área de absorção radical, crucial em ambiente com recursos limitados.'
            },
            {
                id: 'bio-006',
                q: 'Como as células das bromélias da Mata Atlântica baiana captam nutrientes?',
                a: ['Através de tricomas absorventes nas folhas (tanque) em vez de apenas pelas raízes', 'Apenas pelas raízes', 'Por fotossíntese especial', 'Da umidade do ar diretamente'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'EM13CNT202',
                explanation: 'As bromélias epífitas desenvolveram tanque central que coleta água e detritos, com células foliares especializadas.'
            },
            {
                id: 'bio-007',
                q: 'Qual adaptação celular permite aos animais do cerrado baiano suportar variações térmicas?',
                a: ['Regulação da fluidez da membrana celular conforme temperatura', 'Aumento do número de mitocôndrias', 'Redução do metabolismo basal', 'Células sem núcleo'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT204',
                explanation: 'A composição lipídica da membrana se ajusta para manter funcionalidade tanto no calor do dia quanto no frio da noite.'
            },
            {
                id: 'bio-008',
                q: 'Como as algas dos recifes de coral do sul da Bahia realizam simbiose com corais?',
                a: ['Zooxantelas fornecem açúcares via fotossíntese e recebem proteção', 'Parasitam os corais', 'Competem por espaço', 'Não há relação'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT205',
                explanation: 'A relação mutualística é fundamental para crescimento dos corais e produtividade do ecossistema recifal.'
            },
            {
                id: 'bio-009',
                q: 'Qual processo celular explica a bioluminescência dos vaga-lumes do Parque das Dunas?',
                a: ['Reação química envolvendo luciferina e enzima luciferase nas células especializadas', 'Fotossíntese adaptada', 'Reflexão da luz lunar', 'Eletricidade estática'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13CNT201',
                explanation: 'A oxidação da luciferina catalisada pela luciferase produz luz fria, usada para comunicação e acasalamento.'
            },
            {
                id: 'bio-010',
                q: 'Como as células das aves migratórias que visitam o litoral baiano produzem energia para longos voos?',
                a: ['Alto número de mitocôndrias nas células musculares e metabolismo lipídico eficiente', 'Fotossíntese complementar', 'Fermentação lática', 'Glicólise anaeróbica'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT201',
                explanation: 'As fibras musculares vermelhas são ricas em mitocôndrias e usam gordura como combustível de liberação lenta.'
            },
            {
                id: 'bio-011',
                q: 'Qual adaptação celular das plantas carnívoras da Chapada Diamantina?',
                a: ['Células glandulares que secretem enzimas digestivas e células sensoriais que disparam o mecanismo de captura', 'Células fotossintéticas aumentadas', 'Raízes especializadas', 'Flores com toxinas'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT202',
                explanation: 'A carnívoria evoluiu em solos pobres em nutrientes, com células especializadas para atrair, prender e digerir insetos.'
            },
            {
                id: 'bio-012',
                q: 'Como os peixes do Rio São Francisco detectam mudanças na qualidade da água?',
                a: ['Células quimiorreceptoras nas brânquias e linha lateral', 'Apenas pela visão', 'Por mudança de cor', 'Não detectam'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT204',
                explanation: 'Sensores especializados alertam para variações de pH, oxigênio e poluentes, permitindo comportamento de fuga.'
            },
            {
                id: 'bio-013',
                q: 'Qual o papel dos peroxissomos nas células das plantas do semiárido?',
                a: ['Degradam peróxido de hidrogênio tóxico produzido sob estresse hídrico e luminoso', 'Realizam fotossíntese', 'Armazenam água', 'Produzem celulose'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT201',
                explanation: 'Em condições de estresse, aumenta produção de espécies reativas de oxigênio que peroxissomos neutralizam.'
            },
            {
                id: 'bio-014',
                q: 'Como as células das raízes das leguminosas no recôncavo fixam nitrogênio?',
                a: ['Simbiose com bactérias Rhizobium que formam nódulos radiculares', 'Absorvem diretamente do ar', 'Convertem amônia do solo', 'Não fixam nitrogênio'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT205',
                explanation: 'As bactérias convertem N2 atmosférico em formas utilizáveis pelas plantas, enriquecendo solos agrícolas.'
            },
            {
                id: 'bio-015',
                q: 'Qual adaptação celular permite a sobrevivência de microorganismos nas salinas de Rio Real?',
                a: ['Síntese de solutos compatíveis (como glicina betaína) para equilíbrio osmótico', 'Parede celular eliminada', 'Metabolismo anaeróbico permanente', 'Células sem organelas'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT203',
                explanation: 'Halófilos acumulam compostos que equilibram pressão osmótica sem interferir com funções celulares.'
            },
            {
                id: 'bio-016',
                q: 'Como as células das glândulas de veneno das serpentes da Caatinga produzem toxinas?',
                a: ['Ribossomos do retículo endoplasmático rugoso sintetizam proteínas tóxicas armazenadas em vesículas', 'Por fotossíntese', 'Das mitocôndrias', 'Da membrana celular'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'EM13CNT201',
                explanation: 'As células glandulares especializadas possuem RE rugoso desenvolvido para produção massiva de enzimas e neurotoxinas.'
            },
            {
                id: 'bio-017',
                q: 'Qual processo celular explica a regeneração da cauda do lagarto local (calango)?',
                a: ['Ativação de células-tronco e aumento da proliferação celular na região lesionada', 'Fotossíntese', 'Fermentação', 'Mitose contínua em todas as células'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT202',
                explanation: 'Células indiferenciadas se multiplicam e diferenciam-se para reconstruir tecidos, incluindo vértebras cartilaginosas.'
            },
            {
                id: 'bio-018',
                q: 'Como os estômatos das plantas da restinga funcionam para economizar água?',
                a: ['Abrindo à noite (metabolismo CAM) e fechando durante o dia quente', 'Sempre abertos', 'Sempre fechados', 'Abrindo aleatoriamente'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT202',
                explanation: 'O metabolismo ácido das crassuláceas (CAM) permite fixação noturna de CO2, reduzindo perda de água por transpiração diurna.'
            },
            {
                id: 'bio-019',
                q: 'Qual a função dos cloroplastos nas algas calcárias dos recifes baianos?',
                a: ['Fotossíntese que fornece energia para precipitação de carbonato de cálcio', 'Armazenar água', 'Produzir toxinas', 'Fixar nitrogênio'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT203',
                explanation: 'A produção de matéria orgânica pela fotossíntese altera pH local, favorecendo formação do esqueleto calcário.'
            },
            {
                id: 'bio-020',
                q: 'Como as células dos tubarões da costa baiana detectam campos elétricos fracos?',
                a: ['Por ampolas de Lorenzini - células eletrorreceptoras especializadas', 'Por olhos especiais', 'Por linha lateral apenas', 'Não detectam'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'EM13CNT204',
                explanation: 'Estes órgãos sensoriais detectam impulsos elétricos de presas escondidas na areia ou água turva.'
            },
            {
                id: 'bio-021',
                q: 'Qual adaptação celular permite aos liquens sobreviverem nas rochas da Chapada Diamantina?',
                a: ['Associação simbiótica entre fungos (proteção) e algas/cianobactérias (nutrientes)', 'Células com parede dupla', 'Metabolismo independente', 'Parasitismo'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT205',
                explanation: 'O fungo fornece estrutura e retenção de água, enquanto o fotobionte produz carboidratos via fotossíntese.'
            },
            {
                id: 'bio-022',
                q: 'Como os neurônios dos morcegos frugívoros da Mata Atlântica processam ecolocalização?',
                a: ['Células especializadas no córtex auditivo processam diferenças de tempo e intensidade dos ecos', 'Por visão noturna', 'Olfato apurado', 'Sensibilidade térmica'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT204',
                explanation: 'A neurobiologia permite criar mapas mentais tridimensionais a partir de emissões ultrassônicas e seus retornos.'
            },
            {
                id: 'bio-023',
                q: 'Qual processo celular explica a resistência de bactérias do solo da Caatinga a antibióticos naturais?',
                a: ['Produção de enzimas degradadoras, bombas de efluxo e alteração de sítios alvo', 'Parede celular impermeável', 'Não ocorre resistência', 'Metabolismo lento'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT203',
                explanation: 'A competição microbiana no solo selecionou mecanismos de defesa que coincidentemente conferem resistência a antibióticos clínicos.'
            },
            {
                id: 'bio-024',
                q: 'Como as células das glândulas de néctar das plantas do cerrado atraem polinizadores?',
                a: ['Via metabolismo secundário que produz açúcares, aminoácidos e compostos aromáticos', 'Por fotossíntese básica', 'Absorvendo água do solo', 'Da decomposição de insetos'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT202',
                explanation: 'Células secretoras especializadas sintetizam recompensas químicas que coevoluíram com preferências dos polinizadores.'
            },
            {
                id: 'bio-025',
                q: 'Qual adaptação celular permite aos peixes elétricos do Rio São Francisco gerar descargas?',
                a: ['Células eletrocinéticas (eletrócitos) modificadas de músculos que funcionam como baterias em série', 'Neurônios gigantes', 'Escamas condutoras', 'Brânquias especiais'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Compreender',
                skillCode: 'EM13CNT204',
                explanation: 'Os eletrócitos dispõem-se em série, somando pequenos potenciais para criar descargas de até centenas de volts.'
            },
            {
                id: 'bio-026',
                q: 'Como as células das raízes das árvores do mangue lidam com a hipoxia (baixo oxigênio)?',
                a: ['Produzem aerênquima (tecido com grandes espaços de ar) e lenticelas para troca gasosa', 'Fermentação alcoólica', 'Fotossíntese radical', 'Absorvem oxigênio da água salgada'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT202',
                explanation: 'O parênquima aerífero permite difusão de oxigênio da parte aérea para as raízes submersas.'
            },
            {
                id: 'bio-027',
                q: 'Qual processo celular explica a bioluminescência dos fungos da Mata Atlântica baiana?',
                a: ['Reação enzimática da luciferase fúngica com substrato específico (luciferina) diferente do animal', 'Fosforescência', 'Reflexão de luz', 'Eletricidade estática'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT201',
                explanation: 'A bioluminescência fúngica envolve sistema enzimático distinto, possivelmente para atrair artrópodes que dispersam esporos.'
            },
            {
                id: 'bio-028',
                q: 'Como os osteoblastos dos jabutis do sertão produzem cascos resistentes com pouco cálcio disponível?',
                a: ['Eficiente reciclagem óssea e absorção seletiva de cálcio da dieta', 'Fotossíntese óssea', 'Produção de cálcio do ar', 'Não precisam de cálcio'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT202',
                explanation: 'O metabolismo mineral é altamente eficiente, com osteoblastos depositando matriz óssea mesmo com ingestão limitada.'
            },
            {
                id: 'bio-029',
                q: 'Qual adaptação celular permite às plantas aquáticas da Lagoa de Itaparica flutuar?',
                a: ['Parênquima aerífero (aerênquima) com grandes espaços de ar entre células', 'Células cheias de água', 'Folhas cerosas', 'Raízes flutuantes'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'EM13CNT202',
                explanation: 'O tecido com câmaras de ar reduz densidade, permitindo que folhas e caules permaneçam na superfície.'
            },
            {
                id: 'bio-030',
                q: 'Como os melanócitos dos camaleões da Caatinga mudam de cor?',
                a: ['Redisposição de grânulos de pigmento dentro da célula via microtúbulos e microfilamentos', 'Produção de novos pigmentos', 'Alteração da forma celular', 'Reflexão da luz por cristais'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT204',
                explanation: 'Sinais hormonais e neurais controlam o citoesqueleto, concentrando ou dispersando melanina para camuflagem ou termorregulação.'
            },
            {
                id: 'bio-031',
                q: 'Qual processo celular explica a tolerância das plantas da restinga à salinidade do ar marinho?',
                a: ['Acúmulo de prolina e outros solutos compatíveis para ajuste osmótico e proteção enzimática', 'Excreção ativa de sal', 'Impermeabilização completa', 'Fotossíntese noturna'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT203',
                explanation: 'Aminoácidos como prolina atuam como osmoprotetores, estabilizando proteínas e membranas contra estresse salino.'
            },
            {
                id: 'bio-032',
                q: 'Como as células das glândulas de feromônios dos insetos da Chapada produzem compostos voláteis?',
                a: ['Via metabolismo lipídico especializado no retículo endoplasmático liso', 'Fotossíntese', 'Fermentação', 'Digestão de plantas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT201',
                explanation: 'Células glandulares sintetizam moléculas de sinalização química a partir de precursores lipídicos.'
            },
            {
                id: 'bio-033',
                q: 'Qual adaptação celular permite aos peixes das grutas da Chapada Diamantina viverem na escuridão?',
                a: ['Redução/ausência de melanócitos e desenvolvimento de órgãos sensoriais não-visuais (como linha lateral ampliada)', 'Olhos maiores', 'Produção de luz própria', 'Fotossíntese simbiótica'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT204',
                explanation: 'A especiacao em cavernas levou à perda de pigmentação e aprimoramento de sistemas tátil, químico e elétrico.'
            },
            {
                id: 'bio-034',
                q: 'Como os plastídios das plantas epífitas da Mata Atlântica se adaptam à luz filtrada pelo dossel?',
                a: ['Aumento do número de cloroplastos por célula e concentração de clorofila b (mais eficiente em sombra)', 'Só clorofila a', 'Cloroplastos menores', 'Ausência de cloroplastos'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT202',
                explanation: 'Plantas de sombra otimizam captação de fótons com antenas coletoras maiores (mais clorofila b) e distribuição de cloroplastos.'
            },
            {
                id: 'bio-035',
                q: 'Qual processo celular explica a rápida cicatrização em plantas suculentas do semiárido após herbivoria?',
                a: ['Ativação de meristemas laterais e produção de compostos fenólicos que selam feridas', 'Fotossíntese acelerada', 'Crescimento apenas de raízes', 'Não cicatrizam'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT202',
                explanation: 'Células próximas à lesão desdiferenciam-se e proliferam, enquanto compostos secundários previnem infecções e perda de água.'
            },
            {
                id: 'bio-036',
                q: 'Como as hemácias dos mamíferos de altitude da Chapada transportam oxigênio eficientemente em ar rarefeito?',
                a: ['Alta concentração de hemoglobina e alterações na afinidade ao oxigênio por modulação alostérica', 'Hemácias maiores', 'Hemácias nucleadas', 'Respiração cutânea adicional'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT204',
                explanation: 'A adaptação inclui aumento na produção de hemoglobina e ajustes na curva de dissociação para otimizar captação em baixa pressão de O2.'
            },
            {
                id: 'bio-037',
                q: 'Qual adaptação celular permite às algas das piscinas naturais da costa resistirem à variação de salinidade?',
                a: ['Regulação do volume celular via transporte ativo de íons e síntese de glicerol', 'Parede celular rígida', 'Células contractíveis', 'Esporos de resistência permanentes'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT203',
                explanation: 'Mecanismos osmorreguladores mantêm turgor e funções vitais apesar de flutuações entre água doce da chuva e salgada do mar.'
            },
            {
                id: 'bio-038',
                q: 'Como os espermatozoides dos peixes marinhos da costa baiana lidam com a osmolaridade da água salgada?',
                a: ['Controle rigoroso da entrada de sal via canais iônicos e bombas durante a motilidade', 'Parede celular espessa', 'Natação muito rápida', 'Fertilização interna apenas'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT204',
                explanation: 'A ativação espermática em meio hipertônico requer ajustes osmóticos para evitar choque e manter motilidade até o óvulo.'
            },
            {
                id: 'bio-039',
                q: 'Qual processo celular explica a resistência de fungos decompositores da serrapilheira da Mata Atlântica a taninos?',
                a: ['Produção de enzimas extracelulares como lacases e tanases que degradam compostos fenólicos', 'Impermeabilidade da parede celular', 'Metabolismo anaeróbico', 'Simbiose com bactérias'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT203',
                explanation: 'Fungos basidiomicetos especializados secretam complexos enzimáticos que desintoxicam substâncias antimicrobianas das folhas.'
            },
            {
                id: 'bio-040',
                q: 'Como as células das glândulas de veneno dos sapos da região de Ilhéus produzem alcaloides?',
                a: ['Metabolismo secundário derivado de precursores dietéticos (artrópodes) modificados no organismo', 'Fotossíntese', 'Da água do solo', 'Síntese de novo a partir de CO2'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT201',
                explanation: 'Muitas toxinas são sequestradas de presas e bioacumuladas ou modificadas, não sendo sintetizadas totalmente pelo anfíbio.'
            },
            {
                id: 'bio-041',
                q: 'Qual adaptação celular permite aos líquens sobreviverem à dessecação nas rochas expostas?',
                a: ['Síntese de açúcares (trealose) que estabilizam membranas e proteínas no estado seco', 'Esporos de resistência', 'Células sem água', 'Metabolismo suspenso permanentemente'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT203',
                explanation: 'Dissacarídeos como a trealose formam matriz vítrea que preserva estruturas celulares durante anidrobiose.'
            },
            {
                id: 'bio-042',
                q: 'Como os mastócitos dos animais do cerrado respondem a picadas de insetos peçonhentos?',
                a: ['Liberação controlada de histamina e outros mediadores inflamatórios para isolamento do veneno', 'Nenhuma resposta', 'Liberação maciça causando choque anafilático', 'Produção de anticorpos imediata'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT204',
                explanation: 'A resposta inflamatória localizada contém toxinas e atrai células do sistema imune, equilibrando defesa e dano tecidual.'
            },
            {
                id: 'bio-043',
                q: 'Qual processo celular explica a fluorescência dos corais do Parque Marinho de Abrolhos?',
                a: ['Produção de proteínas fluorescentes (GFP-like) que convertem luz UV em visível, possivelmente protegendo zooxantelas', 'Fosforescência natural', 'Reflexão da luz solar', 'Bioluminescência bacteriana'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT203',
                explanation: 'As proteínas absorvem radiação ultravioleta nociva e re-emitem como luz visível inofensiva, em possível relação simbiótica.'
            },
            {
                id: 'bio-044',
                q: 'Como as células dos tentáculos das anêmonas do litoral baiano detectam e imobilizam presas?',
                a: ['Cnidócitos com cnidas (nematocistos) que disparam harpoon com toxinas por estímulo mecânico/químico', 'Por sucção', 'Por redes de muco', 'Por eletrocução'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'EM13CNT204',
                explanation: 'Células especializadas contêm organelas com filamento enrolado que everte explosivamente, injetando veneno neurotóxico.'
            },
            {
                id: 'bio-045',
                q: 'Qual adaptação celular permite às bactérias do solo da Caatinga fixarem fósforo em pH alto?',
                a: ['Produção de ácidos orgânicos (cítrico, oxálico) que solubilizam fosfatos e bombas específicas para absorção', 'Fotossíntese', 'Parasitismo de raízes', 'Fixação simbiótica'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT203',
                explanation: 'Bactérias solubilizadoras de fosfato acidificam a rizosfera, convertendo formas insolúveis em ortofosfato disponível.'
            },
            {
                id: 'bio-046',
                q: 'Como os cardiomiócitos dos beija-flores da Chapada suportam frequências cardíacas extremas (até 1200 bpm)?',
                a: ['Alta densidade de mitocôndrias, retículo sarcoplasmático eficiente e canais de cálcio especializados', 'Células maiores', 'Menos mitocôndrias', 'Metabolismo anaeróbico'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT204',
                explanation: 'As células cardíacas evoluíram para rápida recaptação de cálcio e produção de ATP para contrações ultrarrápidas durante voo.'
            },
            {
                id: 'bio-047',
                q: 'Qual processo celular explica a produção de látex pelas seringueiras cultivadas no sul da Bahia?',
                a: ['Biosíntese de politerpenos (poli-isopreno) no citosol e armazenamento em vacuolas de células laticíferas', 'Fotossíntese direta', 'Secreção radicular', 'Degradação de celulose'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13CNT201',
                explanation: 'Células especializadas formam sistema de canais que coletam o látex, produto secundário com função defensiva.'
            },
            {
                id: 'bio-048',
                q: 'Como os melanóforos dos peixes recifais mudam de cor para camuflagem?',
                a: ['Controle hormonal (MSH) que redistribui grânulos de melanina via microtúbulos, sincronizado com ambiente visual', 'Produção de novos pigmentos', 'Alteração da forma celular', 'Reflexão por cristais de guanina'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT204',
                explanation: 'Sistema neuroendócrino integra informação visual e ajusta dispersão de pigmentos em cromatóforos para mimetismo.'
            },
            {
                id: 'bio-049',
                q: 'Qual adaptação celular permite aos protozoários do trato digestivo de herbívoros do cerrado digerir celulose?',
                a: ['Enzimas celulolíticas (celulases) produzidas pelo próprio protozoário ou por bactérias endossimbióticas', 'Fagocitose direta', 'Fermentação externa', 'Não digerem celulose'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13CNT205',
                explanation: 'Simbiose no rúmen ou ceco permite que herbívoros aproveitem energia de fibras vegetais indigestas para mamíferos.'
            },
            {
                id: 'bio-050',
                q: 'Como os neurônios dos polvos do litoral baiano permitem aprendizado complexo e camuflagem dinâmica?',
                a: ['Grande número de neurônios no sistema nervoso periférico (braços) que processam informação localmente', 'Cérebro centralizado apenas', 'Reflexos simples', 'Não aprendem'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13CNT204',
                explanation: 'Dois terços dos neurônios estão nos braços, permitindo controle distribuído da musculatura para camuflagem e manipulação de objetos.'
            }
        ],
        summary: 'A biologia no contexto do DCRB busca conectar conceitos microscópicos com o impacto ambiental visível no território.',
        mindMap: 'https://exemplo.com/mindmaps/biologia-ba.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYiE1AXnI8ZRZ8CQ4zDq5cW0'
    },
    {
        id: 'linguagens-ba',
        title: 'Linguagens: Identidade e Discurso',
        description: 'Análise literária e variedades linguísticas.',
        iconName: 'Languages',
        category: 'Linguagens',
        learningObjective: 'Reconhecer a língua como fenômeno social, cultural e identitário.',
        xp: 500,
        questions: [
            {
                id: 'lin-q1',
                q: 'A obra de Jorge Amado é fundamental para a literatura brasileira. Qual característica melhor define sua abordagem sobre o povo baiano?',
                a: ['Foco na elite paulista', 'Representação da cultura popular, sincretismo religioso e desigualdade social', 'Uso de linguagem puramente formal', 'Ausência de temas políticos'],
                correct: 1,
                difficulty: 'medium',
                bloomLevel: 'Interpretar',
                skillCode: 'EM13LGG101',
                explanation: 'Jorge Amado imortalizou a Bahia ao descrever o cotidiano das classes populares e a riqueza cultural do estado.',
                videoUrl: 'https://www.youtube.com/watch?v=thKk-x4QBf8'
            },
            {
                id: 'lin-001',
                q: 'Qual expressão típica do português baiano reflete influência africana?',
                a: ['"Oxente" (interjeição de espanto)', '"Legal" (aprovacao)', '"Cara" (pessoa)', '"Maneiro" (interessante)'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Conhecer',
                skillCode: 'EM13LGG304',
                explanation: '"Oxente" vem do iorubá "Oxé", mostrando como línguas africanas enriqueceram o português brasileiro, especialmente na Bahia.'
            },
            {
                id: 'lin-002',
                q: 'Na obra "Capitães da Areia" de Jorge Amado, como a linguagem constrói a identidade dos meninos de rua?',
                a: ['Uso de gírias e expressões do cotidiano popular salvadoreno para dar autenticidade', 'Linguagem erudita e formal', 'Dialeto italiano', 'Francês misturado'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'EM13LGG102',
                explanation: 'Amado capta a fala das ruas de Salvador nos anos 1930, mostrando como a linguagem revela condições sociais e resistência cultural.'
            },
            {
                id: 'lin-003',
                q: 'Qual a importância do cordel na cultura popular baiana?',
                a: ['Forma de literatura oral e escrita que documenta histórias locais e critica social', 'Gênero apenas acadêmico', 'Importado da Europa sem adaptação', 'Forma obsoleta'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13LGG202',
                explanation: 'Os folhetos de cordel no sertão baiano preservam narrativas, humor e denúncia, sendo veículo de expressão das classes populares.'
            },
            {
                id: 'lin-004',
                q: 'Como a música de Caetano Veloso representa a Tropicália em termos linguísticos?',
                a: ['Mistura português formal, coloquialismo e referências eruditas e populares', 'Apenas inglês', 'Portugues arcaico', 'Espanhol misturado'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13LGG103',
                explanation: 'Caetano cria colagens linguísticas que refletem o sincretismo cultural brasileiro, da Bahia para o mundo.'
            },
            {
                id: 'lin-005',
                q: 'Qual fenômeno linguístico explica a pronúncia "nóis vai" em comunidades baianas?',
                a: ['Concordância não padrão por influência de línguas africanas e processo natural de simplificação', 'Erro gramatical sem histórico', 'Influência indígena apenas', 'Portugues europeu puro'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'EM13LGG304',
                explanation: 'A concordância verbal popular tem raízes históricas e sociais, não sendo "erro" mas variação legítima dentro do português brasileiro.'
            },
            {
                id: 'lin-006',
                q: 'Na poesia de Castro Alves, como a linguagem serve à causa abolicionista?',
                a: ['Uso de imagens fortes e vocabulário emotivo para denunciar a escravidão', 'Linguagem neutra e técnica', 'Eufemismos para suavizar', 'Latim para dar autoridade'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Interpretar',
                skillCode: 'EM13LGG102',
                explanation: 'Em "Navio Negreiro", o poeta baiano usa recursos como metáforas vívidas e ritmo para criar impacto emocional contra a escravatura.'
            },
            {
                id: 'lin-007',
                q: 'Qual a função social do "pagode baiano" como gênero musical?',
                a: ['Expressão de identidade negra periférica e crítica social com linguagem coloquial', 'Música apenas para entretenimento', 'Gênero elitista', 'Importação estrangeira'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13LGG203',
                explanation: 'Grupos como É o Tchan e Psirico criaram linguagem própria que dialoga com juventude e trata de temas do cotidiano urbano.'
            },
            {
                id: 'lin-008',
                q: 'Como o romance "Dona Flor e Seus Dois Maridos" representa o português baiano?',
                a: ['Mistura fala culta de Flor com linguagem popular de Vadinho e Teodoro', 'Apenas linguagem formal', 'Dialeto estrangeiro', 'Português arcaico'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'EM13LGG102',
                explanation: 'Jorge Amado usa variações linguísticas para caracterizar personagens e classes sociais na Salvador dos anos 1940.'
            },
            {
                id: 'lin-009',
                q: 'Qual a importância do iorubá nos terreiros de candomblé baiano?',
                a: ['Língua sagrada que preserva tradições e resistência cultural africana', 'Língua substituída pelo português', 'Dialeto local sem importância', 'Língua apenas para música'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'EM13LGG304',
                explanation: 'O iorubá mantém-se vivo em cantigas, rezas e nomes de orixás, sendo patrimônio imaterial da cultura afro-baiana.'
            },
            {
                id: 'lin-010',
                q: 'Como a literatura de cordel do sertão baiano usa recursos linguísticos?',
                a: ['Rima, métrica e fórmula de abertura para memorização e transmissão oral', 'Prosa livre sem estrutura', 'Linguagem técnica', 'Estrangeirismos'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13LGG202',
                explanation: 'Estruturas fixas como sextilhas e setilhas facilitam recitação e adaptação de histórias tradicionais à realidade local.'
            },
            {
                id: 'lin-011',
                q: 'Qual a contribuição de João Ubaldo Ribeiro para a literatura de língua portuguesa?',
                a: ['Criação de estilo único que mistura oralidade baiana e reflexão filosófica', 'Traduções apenas', 'Literatura apenas regional', 'Apenas crítica social'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13LGG103',
                explanation: 'Em "Viva o Povo Brasileiro", Ubaldo reinventa a história nacional com linguagem que funde coloquialismo e erudição.'
            },
            {
                id: 'lin-012',
                q: 'Como os repentistas do sertão baiano usam a linguagem em duelos poéticos?',
                a: ['Improvisação métrica e rímica sobre temas propostos, com agilidade mental e conhecimento cultural', 'Leitura de textos prontos', 'Discussão sem estrutura', 'Canto apenas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13LGG203',
                explanation: 'A arte do repente exige domínio de formas poéticas tradicionais e capacidade de criar versos sobre qualquer assunto no momento.'
            },
            {
                id: 'lin-013',
                q: 'Qual o papel dos provérbios na cultura oral baiana?',
                a: ['Transmissão de sabedoria popular e valores comunitários através de frases concisas', 'Apenas entretenimento', 'Linguagem obsoleta', 'Sem função social'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'EM13LGG304',
                explanation: 'Ditados como "Água mole em pedra dura, tanto bate até que fura" condensam experiências e orientam comportamento.'
            },
            {
                id: 'lin-014',
                q: 'Como a poesia de Gregório de Matos critica a sociedade colonial baiana?',
                a: ['Uso de sátira ferina, trocadilhos e vocabulário coloquial para expor vícios sociais', 'Elogios à elite', 'Linguagem apenas amorosa', 'Crítica velada'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13LGG102',
                explanation: 'O "Boca do Inferno" usava sua verve satírica para atacar desde autoridades até costumes da Salvador do século XVII.'
            },
            {
                id: 'lin-015',
                q: 'Qual a importância do "Vocabulário Africano na Bahia" de Yeda Pessoa de Castro?',
                a: ['Documentação científica das contribuições linguísticas africanas ao português baiano', 'Inventário de erros', 'Dicionário comum', 'Lista de gírias'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13LGG304',
                explanation: 'A obra da pesquisadora baiana mapeia sistematicamente palavras de origem africana usadas no estado, legitimando essa herança.'
            },
            {
                id: 'lin-016',
                q: `Como a música "É d'Oxum" de Gerônimo representa a religiosidade afro-baiana?`,
                a: ['Uso de termos do candomblé em português e iorubá para celebrar orixá', 'Crítica à religião', 'Linguagem secular apenas', 'Termos católicos apenas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Interpretar',
                skillCode: 'EM13LGG203',
                explanation: 'A letra integra vocabulário religioso específico à estrutura musical popular, divulgando e valorizando a cultura dos orixás.'
            },
            {
                id: 'lin-017',
                q: 'Qual fenômeno de variação linguística é marcante no interior da Bahia?',
                a: ['Rotacismo (troca de L por R) e redução de ditongos', 'Palatalização de T e D', 'Aspiração de S', 'Vocalização de L'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Conhecer',
                skillCode: 'EM13LGG304',
                explanation: 'Características como "praia" pronunciado "praia" (sem ditongo) e "mal" como "mar" são marcas do português rural baiano.'
            },
            {
                id: 'lin-018',
                q: 'Como o teatro popular de rua em Salvador usa a linguagem?',
                a: ['Improvisação com dialetos locais, interação com público e crítica social humorada', 'Textos fixos em português padrão', 'Linguagem estrangeira', 'Mímica apenas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13LGG203',
                explanation: 'Grupos como Teatro Popular de Ilhéus adaptam linguagem ao contexto, usando sotaques e gírias para conectar-se com espectadores.'
            },
            {
                id: 'lin-019',
                q: 'Qual a contribuição das "Cartas Chilenas" para a literatura satírica baiana?',
                a: ['Crítica política disfarçada em forma epistolar com linguagem ácida e pseudônimos', 'Cartas amorosas', 'Documentos oficiais', 'Poesia lírica'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13LGG102',
                explanation: 'Atribuídas a Tomás Antônio Gonzaga, as cartas satirizam o governador de Minas com estilo que influenciou sátira brasileira.'
            },
            {
                id: 'lin-020',
                q: 'Como o funk baiano (arrocha) cria identidade linguística própria?',
                a: ['Gírias locais, duplo sentido e ritmo que convida à dança e expressão corporal', 'Letras em inglês', 'Linguagem formal', 'Termos técnicos'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Interpretar',
                skillCode: 'EM13LGG203',
                explanation: 'O arrocha desenvolveu léxico específico e formas de expressão que falam diretamente à juventude das periferias urbanas.'
            },
            {
                id: 'lin-021',
                q: 'Qual a importância dos contos de fadas adaptados no sertão baiano?',
                a: ['Recontextualização de narrativas universais com elementos locais (caatinga, cangaço)', 'Cópia fiel europeia', 'Abandono da tradição oral', 'Criação totalmente nova'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13LGG202',
                explanation: 'Contadores de história transformam Chapeuzinho Vermelho em "Chapeuzinho do Sertão", com lobo mau como cangaceiro.'
            },
            {
                id: 'lin-022',
                q: 'Como a obra "Tenda dos Milagres" de Jorge Amado trata do racismo linguístico?',
                a: ['Mostra valor da cultura e linguagem afro-baianas contra preconceitos da elite branca', 'Ignora questão racial', 'Defende assimilação', 'Critica apenas religião'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13LGG102',
                explanation: 'Através do personagem Pedro Archanjo, Amado denuncia hierarquias linguísticas que marginalizam falares de origem africana.'
            },
            {
                id: 'lin-023',
                q: 'Qual o papel das ladainhas no candomblé baiano?',
                a: ['Orações cantadas em iorubá ou português que invocam orixás e transmitem conhecimentos', 'Apenas música', 'Texto sem significado', 'Improvisação livre'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'EM13LGG304',
                explanation: 'As ladainhas preservam narrativas míticas e ensinamentos éticos, funcionando como literatura oral sagrada.'
            },
            {
                id: 'lin-024',
                q: 'Como o romance "A Muralha" de Dinah Silveira de Queiroz representa o português colonial?',
                a: ['Reconstituição histórica da língua do século XVI com arcaísmos e influência tupi', 'Portugues contemporâneo', 'Mistura com inglês', 'Dialeto italiano'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13LGG102',
                explanation: 'A autora pesquisa usos linguísticos do período das bandeiras para criar verossimilhança histórica na narrativa.'
            },
            {
                id: 'lin-025',
                q: 'Qual a função das "cantigas de trabalho" no recôncavo baiano?',
                a: ['Ritmar tarefas coletivas e transmitir conhecimentos sobre cultivo e processamento', 'Apenas entretenimento', 'Crítica política', 'Religiosidade'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13LGG203',
                explanation: 'Cantigas na colheita da cana ou no beneficiamento do dendê coordenam movimentos e preservam técnicas tradicionais.'
            },
            {
                id: 'lin-026',
                q: 'Como a poesia de Myriam Fraga dialoga com a tradição literária baiana?',
                a: ['Reinterpreta mitos e paisagens baianas com linguagem contemporânea e feminina', 'Cópia de estilos antigos', 'Rejeição da tradição', 'Temas universais apenas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Interpretar',
                skillCode: 'EM13LGG103',
                explanation: 'A poeta baiana cria diálogo entre geração de 45 e modernidade, tratando de Salvador e identidade com voz própria.'
            },
            {
                id: 'lin-027',
                q: 'Qual o significado da expressão "fazer a cabeça" no contexto baiano?',
                a: ['Iniciação no candomblé e, por extensão, convencer alguém (origem religiosa)', 'Cortar cabelo', 'Estudar muito', 'Enganar alguém'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'EM13LGG304',
                explanation: 'Expressão que migrou do vocabulário religioso afro-brasileiro para o português coloquial, mostrando influência cultural.'
            },
            {
                id: 'lin-028',
                q: 'Como a literatura de Adonias Filho representa o sul da Bahia?',
                a: ['Linguagem barroca e atmosfera densa para retratar conflitos na região cacaueira', 'Estilo jornalístico', 'Comédia leve', 'Poesia concreta'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13LGG102',
                explanation: 'Em obras como "Memórias de Lázaro", o autor cria prosa introspectiva que reflete dramas sociais do ciclo do cacau.'
            },
            {
                id: 'lin-029',
                q: 'Qual a importância dos "pontos" na umbanda e candomblé baianos?',
                a: ['Cantigas que definem ritos, invocam entidades e transmitem conhecimento teológico', 'Apenas música de fundo', 'Improvisação sem regras', 'Letras em português apenas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13LGG203',
                explanation: 'Cada orixá tem pontos específicos que narram seus mitos e atributos, funcionando como literatura oral ritual.'
            },
            {
                id: 'lin-030',
                q: 'Como o cordel "A Chegada de Lampião no Inferno" usa humor e crítica?',
                a: ['Satiriza figura do cangaceiro com elementos sobrenaturais e moralizantes', 'Elogia crimes', 'Conto de horror', 'Drama realista'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Interpretar',
                skillCode: 'EM13LGG202',
                explanation: 'O folheto popular recria mito de Lampião com ironia, refletindo visão ambígua do cangaço como herói e bandido.'
            },
            {
                id: 'lin-031',
                q: 'Qual fenômeno linguístico ocorre na fala "nós pega o peixe"?',
                a: ['Hipercorreção (tentativa de usar forma culta resultando em "erro")', 'Portugues padrão', 'Influência indígena', 'Estrangeirismo'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13LGG304',
                explanation: 'Falantes que normalmente dizem "nóis pega" tentam corrigir para "nós" mas mantêm verbo no singular, criando forma intermediária.'
            },
            {
                id: 'lin-032',
                q: 'Como a obra "Mar Morto" de Jorge Amado usa metáforas do mar?',
                a: ['Oceano como símbolo de destino, amor e morte na comunidade de pescadores de Salvador', 'Mar apenas cenário', 'Símbolo religioso', 'Metáfora política'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Interpretar',
                skillCode: 'EM13LGG102',
                explanation: 'A linguagem poética transforma elementos marítimos em representações de dramas humanos na Bahia litorânea.'
            },
            {
                id: 'lin-033',
                q: 'Qual o papel das "adivinhas" na cultura infantil baiana?',
                a: ['Desenvolvimento do raciocínio lógico e transmissão de saberes através de enigmas verbais', 'Apenas passatempo', 'Teste de conhecimento', 'Brincadeira sem valor'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13LGG202',
                explanation: 'Adivinhas como "O que é, o que é?" exercitam pensamento lateral e preservam elementos da cultura popular.'
            },
            {
                id: 'lin-034',
                q: 'Como a poesia concreta de Augusto de Campos dialoga com a Bahia?',
                a: ['Experimentos visuais com palavras que, embora paulista, influenciaram vanguardas baianas', 'Poesia tradicional baiana', 'Regionalismo apenas', 'Rejeição da modernidade'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13LGG103',
                explanation: 'A poesia concreta impactou artistas baianos, mostrando como vanguardas nacionais se relacionam com produções regionais.'
            },
            {
                id: 'lin-035',
                q: 'Qual a importância da "Fala do Sertão" de Euclides da Cunha?',
                a: ['Registro linguístico do sertanejo em "Os Sertões", valorizando sua cultura oral', 'Crítica à fala popular', 'Inventário de erros', 'Análise apenas geográfica'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'EM13LGG304',
                explanation: 'Euclides documenta vocabulário e expressões do sertão baiano, reconhecendo neles sistema linguístico coerente.'
            },
            {
                id: 'lin-036',
                q: 'Como o teatro do Bando de Teatro Olodum usa linguagem para discutir raça?',
                a: ['Texto dramático que incorpora falares negros urbanos e referências à diáspora africana', 'Portugues padrão apenas', 'Línguas estrangeiras', 'Linguagem técnica'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'EM13LGG203',
                explanation: 'O grupo cria dramaturgia que reflete identidade afro-baiana, usando linguagem como instrumento de afirmação política.'
            },
            {
                id: 'lin-037',
                q: 'Qual a contribuição de Sônia Coutinho para literatura baiana contemporânea?',
                a: ['Narrativa feminina que explora subjetividade urbana em Salvador com linguagem refinada', 'Literatura apenas rural', 'Poesia épica', 'Teatro popular'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13LGG103',
                explanation: 'A escritora baiana traz perspectiva feminina para retrato da cidade, com prosa que mistura realismo e fluxo de consciência.'
            },
            {
                id: 'lin-038',
                q: 'Como as "cantigas de roda" baianas preservam tradição?',
                a: ['Transmissão oral de geração em geração com adaptações locais', 'Registro apenas escrito', 'Composições novas sempre', 'Importação estrangeira'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13LGG202',
                explanation: 'Cirandas como "Atirei o pau no gato" mantêm estrutura mas ganham versões regionais com elementos baianos.'
            },
            {
                id: 'lin-039',
                q: 'Qual o significado da expressão "bater cabeça" no contexto cultural baiano?',
                a: ['Saudação ritual no candomblé e, por extensão, pedir desculpas ou submeter-se', 'Discussão violenta', 'Estudar muito', 'Bater literalmente'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'EM13LGG304',
                explanation: 'Outro exemplo de termo religioso que migrou para linguagem cotidiana, mostrando permeabilidade cultural.'
            },
            {
                id: 'lin-040',
                q: 'Como a obra "Agora e na Hora" de Antônio Torres representa o êxodo rural?',
                a: ['Linguagem que contrasta fala sertaneja com discurso urbano na migração para Salvador', 'Apenas dialeto rural', 'Portugues padrão', 'Mistura com inglês'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13LGG102',
                explanation: 'O romance explora conflito linguístico como metáfora do choque entre mundo rural e urbano na Bahia contemporânea.'
            },
            {
                id: 'lin-041',
                q: 'Qual o papel das "narrativas de assombração" no interior baiano?',
                a: ['Controle social através do medo e transmissão de valores comunitários', 'Apenas entretenimento', 'Relatos históricos', 'Crítica política'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Interpretar',
                skillCode: 'EM13LGG202',
                explanation: 'Histórias de mula-sem-cabeça e lobisomem regulam comportamento e reforçam normas sociais em comunidades rurais.'
            },
            {
                id: 'lin-042',
                q: 'Como a poesia de Castro Alves usa recursos sonoros?',
                a: ['Aliterações, assonâncias e ritmo marcante para criar efeito dramático', 'Verso livre apenas', 'Rimas pobres', 'Estrutura irregular'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13LGG103',
                explanation: 'Em "O Navio Negreiro", repetição de sons como "s" e "r" imita ruídos do mar e reforça tom denunciatório.'
            },
            {
                id: 'lin-043',
                q: 'Qual a importância do "Dicionário do Brasileirismo" para estudo da língua na Bahia?',
                a: ['Registro de palavras e expressões tipicamente brasileiras, muitas de origem baiana', 'Dicionário português apenas', 'Lista de gírias passageiras', 'Obra sobre erros'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13LGG304',
                explanation: 'Obras lexicográficas documentam contribuições regionais ao português brasileiro, legitimando variedades não padrão.'
            },
            {
                id: 'lin-044',
                q: 'Como o romance "Jubiabá" de Jorge Amado retrata a oralidade negra?',
                a: ['Incorporação de narrativas orais afro-baianas através do personagem contador de histórias', 'Portugues formal apenas', 'Língua literária padrão', 'Traduções'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13LGG102',
                explanation: 'A figura de Jubiabá como griô (contador tradicional) permite inserir mitologia e sabedoria oral africana na estrutura do romance.'
            },
            {
                id: 'lin-045',
                q: 'Qual fenômeno ocorre na pronúncia "muié" para "mulher" em algumas regiões baianas?',
                a: ['Monotongação e perda do L palatal (fenômeno comum no português brasileiro popular)', 'Aumento de sons', 'Inserção de vogais', 'Rotacismo'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Conhecer',
                skillCode: 'EM13LGG304',
                explanation: 'Processo natural de simplificação fonética também observado em outras regiões do Brasil, não sendo exclusivo baiano.'
            },
            {
                id: 'lin-046',
                q: 'Como a música "Alegria, Alegria" de Caetano Veloso reflete linguagem jovem dos anos 60?',
                a: ['Colagem de referências pop e cotidianas que capta espírito de uma geração', 'Linguagem arcaica', 'Vocabulário técnico', 'Dialeto rural'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Interpretar',
                skillCode: 'EM13LGG203',
                explanation: 'A letra mistura publicidade, notícias e cultura pop, criando retrato linguístico da juventude urbana brasileira em transição.'
            },
            {
                id: 'lin-047',
                q: 'Qual o papel das "loas" na literatura de cordel?',
                a: ['Introdução em prosa rimada que apresenta autor e tema, estabelecendo contrato com leitor', 'Conclusão apenas', 'Parte narrativa principal', 'Glossário'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'EM13LGG202',
                explanation: 'A loa cumpre função metalinguística, situando o folheto na tradição e criando expectativas no público.'
            },
            {
                id: 'lin-048',
                q: 'Como o conto "A Hora da Estrela" de Clarice Lispector, embora não baiana, dialoga com questões linguísticas relevantes para Bahia?',
                a: ['Exploração da inadequação linguística de personagem nordestina no Rio, tema migração', 'Portugues padrão apenas', 'Dialeto gaúcho', 'Língua estrangeira'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'EM13LGG102',
                explanation: 'A dificuldade de Macabéa com a linguagem reflete marginalização de migrantes nordestinos, questão pertinente à Bahia.'
            },
            {
                id: 'lin-049',
                q: 'Qual a importância do "Auto da Compadecida" de Ariano Suassuna para cultura nordestina?',
                a: ['Síntese de tradição oral, cordel e teatro popular com linguagem rica e humor', 'Drama realista urbano', 'Teatro experimental abstrato', 'Adaptação estrangeira'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Compreender',
                skillCode: 'EM13LGG203',
                explanation: 'Embora paraibano, Suassuna influenciou toda região Nordeste, mostrando universalidade da cultura popular nordestina.'
            },
            {
                id: 'lin-050',
                q: 'Como a obra "Casa de Pensão" de Aluísio Azevedo, embora maranhense, trata questões urbanas relevantes para Salvador?',
                a: ['Retrato naturalista da vida em pensões que dialoga com realidade das pensões baianas', 'Romance rural', 'Ficção científica', 'Poesia lírica'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'EM13LGG102',
                explanation: 'O romance expõe tensões de migrantes em cidade grande, tema comum a Salvador que recebe muitos interioranos.'
            }
        ],
        summary: 'Linguagens no DCRB foca no protagonismo e na expressão da realidade cultural e social do estudante.',
        mindMap: 'https://exemplo.com/mindmaps/linguagens-ba.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYhHjvQvQvQvQvQvQvQvQvQv'
    },
    {
        id: 'sociologia-ba',
        title: 'Sociologia: Sociedade e Transformação',
        description: 'Análise das estruturas sociais e movimentos transformadores na Bahia.',
        iconName: 'Users',
        category: 'Humanas',
        learningObjective: 'Compreender a formação social baiana e os processos de transformação social contemporâneos.',
        xp: 650,
        questions: [
            {
                id: 'soc-001',
                q: 'Qual conceito sociológico melhor explica a formação da sociedade baiana colonial?',
                a: ['Escravismo colonial com estrutura patriarcal e miscigenação forçada', 'Feudalismo tardio', 'Capitalismo industrial precoce', 'Socialismo primitivo'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-01',
                explanation: 'A Bahia colonial se estruturou no tripé plantation-escravidão-patriarcado, com hierarquias raciais e sociais rígidas.'
            },
            {
                id: 'soc-002',
                q: 'Como o conceito de "habitus" de Bourdieu ajuda a entender a cultura baiana?',
                a: ['Disposições incorporadas que reproduzem desigualdades mas também permitem resistência cultural', 'Determinismo biológico', 'Escolha racional individual', 'Acaso histórico'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-SOC-03',
                explanation: 'Práticas culturais baianas (candomblé, capoeira, música) formam habitus que tanto reproduzem estruturas sociais quanto criam espaços de autonomia.'
            },
            {
                id: 'soc-003',
                q: 'Qual teoria explica a persistência do racismo na Bahia, estado com maioria negra?',
                a: ['Racismo estrutural que permeia instituições mesmo com maioria demográfica negra', 'Racismo individual apenas', 'Conflito de classes puro', 'Diferença cultural natural'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-04',
                explanation: 'O racismo na Bahia se manifesta na distribuição desigual de recursos, estereótipos culturais e violência policial, não apenas em preconceito interpessoal.'
            },
            {
                id: 'soc-004',
                q: 'Como o conceito de "modernização conservadora" se aplica ao desenvolvimento baiano?',
                a: ['Mudanças econômicas sem transformação das estruturas sociais tradicionais', 'Revolução social completa', 'Estagnação total', 'Retorno ao passado'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-02',
                explanation: 'A industrialização via Polo de Camaçari trouxe tecnologia mas manteve desigualdades, com elites tradicionais se adaptando ao novo modelo.'
            },
            {
                id: 'soc-005',
                q: 'Qual o papel dos terreiros de candomblé como instituição social na Bahia?',
                a: ['Espaços de sociabilidade, apoio mútuo e resistência cultural afro-brasileira', 'Apenas locais religiosos', 'Centros políticos formais', 'Empresas comerciais'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-SOC-05',
                explanation: 'Além da função religiosa, terreiros funcionam como redes de solidariedade, preservação cultural e, historicamente, resistência à dominação.'
            },
            {
                id: 'soc-006',
                q: 'Como a teoria da dependência ajuda a entender a economia baiana?',
                a: ['Economia voltada para exportação de commodities com baixo valor agregado', 'Economia autossuficiente', 'Centro do capitalismo global', 'Economia planificada'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-06',
                explanation: 'Da cana-de-açúcar ao cacau, soja e petróleo, a Bahia exemplifica economia dependente, com ciclos ligados à demanda externa.'
            },
            {
                id: 'soc-007',
                q: 'Qual conceito explica a segregação urbana em Salvador?',
                a: ['Apartheid social com divisão espacial por classe e raça', 'Integração harmoniosa', 'Mistura aleatória', 'Planejamento igualitário'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-SOC-07',
                explanation: 'A geografia social de Salvador separa bairros nobres (Barra, Vitória) de periferias majoritariamente negras, reproduzindo desigualdades coloniais.'
            },
            {
                id: 'soc-008',
                q: 'Como o movimento negro baiano usa o conceito de "identidade" em sua atuação?',
                a: ['Construção política da negritude como base para reivindicações e autoestima', 'Essencialismo biológico', 'Assimilação à branquitude', 'Negação de raça'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-08',
                explanation: 'Coletivos como o Ilê Aiyê e Olodum constroem identidade negra positiva através da cultura, contra estereótipos racistas.'
            },
            {
                id: 'soc-009',
                q: 'Qual teoria das relações de gênero explica a situação das mulheres no sertão baiano?',
                a: ['Interseccionalidade considerando gênero, classe e região', 'Determinismo biológico puro', 'Igualdade já alcançada', 'Opressão uniforme'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-09',
                explanation: 'Mulheres sertanejas enfrentam opressões específicas: patriarcado rural, pobreza e falta de serviços, exigindo análise multidimensional.'
            },
            {
                id: 'soc-010',
                q: 'Como o conceito de "capital cultural" se manifesta nas desigualdades educacionais baianas?',
                a: ['Escolas privadas transmitem conhecimentos e comportamentos valorizados que perpetuam vantagens', 'Meritocracia pura', 'Sorte', 'Diferenças biológicas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-SOC-10',
                explanation: 'Filhos das elites baianas frequentam escolas que ensinam não só conteúdos, mas também posturas e redes sociais que garantem sucesso.'
            },
            {
                id: 'soc-011',
                q: 'Qual o significado sociológico do Carnaval de Salvador?',
                a: 'Espaço de expressão cultural mas também de disputas políticas e econômicas',
                a: ['Expressão cultural e arena de conflitos por recursos e visibilidade', 'Festa apolítica', 'Ritual apenas religioso', 'Evento apenas turístico'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-05',
                explanation: 'O Carnaval envolve tensões entre blocos afros e empresariais, acesso aos circuitos e representação das culturas populares.'
            },
            {
                id: 'soc-012',
                q: 'Como a teoria do colonialismo interno ajuda a entender as relações entre capital e interior na Bahia?',
                a: ['Exploração econômica do interior pelo litoral, reproduzindo padrões coloniais', 'Integração harmoniosa', 'Autonomia completa do interior', 'Invasão estrangeira'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-06',
                explanation: 'Recursos do interior (minérios, água, produtos agrícolas) beneficiam principalmente a capital e centros industriais, com pouco retorno local.'
            },
            {
                id: 'soc-013',
                q: 'Qual conceito explica a violência urbana em bairros periféricos de Salvador?',
                a: ['Violência estrutural resultante de exclusão social e ausência do Estado', 'Violência cultural natural', 'Escolha individual', 'Fatalidade'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-11',
                explanation: 'Altos índices de homicídios em bairros pobres relacionam-se com falta de oportunidades, racismo e política de segurança repressiva.'
            },
            {
                id: 'soc-014',
                q: 'Como o movimento dos sem-terra na Bahia se relaciona com o conceito de cidadania?',
                a: ['Luta por direitos básicos (terra, trabalho) como fundamento da cidadania substantiva', 'Apenas conflito por propriedade', 'Questão apenas econômica', 'Invasão criminosa'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-08',
                explanation: 'O MST reivindica acesso à terra não como privilégio, mas como direito fundamental para exercício pleno da cidadania.'
            },
            {
                id: 'soc-015',
                q: 'Qual a importância sociológica das irmandades negras na Bahia colonial?',
                a: ['Estratégia de sobrevivência e manutenção de identidades africanas dentro do sistema escravista', 'Assimilação ao catolicismo puro', 'Grupos criminosos', 'Elites escravocratas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-01',
                explanation: 'Irmandades como a de Nossa Senhora do Rosário dos Pretos permitiam compra de alforrias, enterros dignos e preservação cultural.'
            },
            {
                id: 'soc-016',
                q: 'Como o conceito de "estereótipo" atua na discriminação contra nordestinos?',
                a: ['Generalizações negativas que justificam desigualdades regionais', 'Descrições precisas', 'Elogios', 'Análises científicas'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Compreender',
                skillCode: 'DCRB-SOC-04',
                explanation: 'Estereótipos do nordestino como preguiçoso ou atrasado servem para naturalizar pobreza e concentração de recursos no Sudeste.'
            },
            {
                id: 'soc-017',
                q: 'Qual teoria explica a resistência das comunidades quilombolas baianas?',
                a: ['Agência coletiva na construção de alternativas ao capitalismo e preservação de modos de vida', 'Isolamento passivo', 'Acomodação', 'Assimilação'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-08',
                explanation: 'Quilombos contemporâneos não são resquícios do passado, mas projetos políticos de organização comunitária e relação diferente com a natureza.'
            },
            {
                id: 'soc-018',
                q: 'Como o fenômeno da Pentecostalização afeta a sociedade baiana?',
                a: ['Transformações nas relações familiares, políticas e consumo através de novas religiões', 'Manutenção do status quo', 'Desaparecimento da religião', 'Retorno ao catolicismo tradicional'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-05',
                explanation: 'Igrejas neopentecostais oferecem redes de apoio, ascensão social e novos valores, competindo com candomblé e catolicismo tradicional.'
            },
            {
                id: 'soc-019',
                q: 'Qual conceito sociológico explica o clientelismo na política baiana?',
                a: ['Troca de favores por votos em contexto de pobreza e Estado frágil', 'Democracia participativa', 'Tecnocracia', 'Revolução permanente'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-SOC-12',
                explanation: 'Políticos tradicionais mantêm poder através da distribuição de benefícios individuais (empregos, cestas básicas) em troca de lealdade eleitoral.'
            },
            {
                id: 'soc-020',
                q: 'Como a sociologia do trabalho explica a precarização no Polo de Camaçari?',
                a: ['Terceirização que transfere riscos para trabalhadores e enfraquece sindicatos', 'Empregos estáveis para todos', 'Cooperativismo', 'Autogestão'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-06',
                explanation: 'Empresas contratam através de cooperativas ou empresas terceiras, reduzindo direitos trabalhistas e poder de negociação coletiva.'
            },
            {
                id: 'soc-021',
                q: 'Qual o significado sociológico da figura da "baiana do acarajé"?',
                a: ['Símbolo cultural que mascara exploração do trabalho feminino negro informal', 'Apenas ícone turístico', 'Empresária de sucesso', 'Sacerdotisa apenas'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-09',
                explanation: 'Por trás da imagem folclórica, há mulheres negras trabalhando longas horas sem direitos trabalhistas em economia informal precária.'
            },
            {
                id: 'soc-022',
                q: 'Como o conceito de "lugar de fala" se aplica aos movimentos sociais baianos?',
                a: ['Reconhecimento que experiências específicas (negras, indígenas, LGBTQIA+) geram perspectivas únicas', 'Hierarquia de conhecimentos', 'Relativismo absoluto', 'Neutralidade possível'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-SOC-08',
                explanation: 'Movimentos ressaltam que quem vive opressão tem autoridade para falar sobre ela, questionando discursos acadêmicos ou estatais distanciados.'
            },
            {
                id: 'soc-023',
                q: 'Qual teoria explica a migração de baianos para São Paulo?',
                a: ['Êxodo rural e urbano por desigualdades regionais e atração por centros industriais', 'Aventura individual', 'Invasão planejada', 'Turismo'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-07',
                explanation: 'Falta de oportunidades no interior e até em Salvador empurra população para São Paulo, alimentando periferias paulistas com mão-de-obra barata.'
            },
            {
                id: 'soc-024',
                q: 'Como o conceito de "indústria cultural" se aplica ao turismo na Bahia?',
                a: ['Transformação de culturas locais em produtos padronizados para consumo turístico', 'Preservação autêntica', 'Intercâmbio cultural igualitário', 'Educação'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-05',
                explanation: 'Rituais do candomblé, capoeira e festas populares são adaptados para shows turísticos, perdendo contexto original e significado.'
            },
            {
                id: 'soc-025',
                q: 'Qual a importância sociológica das associações de bairro em Salvador?',
                a: ['Organização comunitária para demandas por infraestrutura e direitos urbanos', 'Grupos criminosos', 'Apenas festas', 'Extensão do Estado'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-SOC-08',
                explanation: 'Em bairros periféricos, associações são canais para reivindicar água, luz, asfalto e segurança, preenchendo lacunas do poder público.'
            },
            {
                id: 'soc-026',
                q: 'Como a teoria da ação coletiva explica os protestos por transporte em Salvador?',
                a: ['Mobilização por bem público que beneficia a todos, superando dilema do free-rider', 'Apenas interesse individual', 'Manipulação política', 'Violência gratuita'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-08',
                explanation: 'Movimentos como "Revolta do Busão" mostram como cidadãos se organizam apesar da tendência individual de não participar esperando que outros o façam.'
            },
            {
                id: 'soc-027',
                q: 'Qual conceito explica a medicalização da pobreza no sertão baiano?',
                a: ['Transformação de problemas sociais em questões médicas individuais', 'Atenção integral à saúde', 'Prevenção eficaz', 'Cura espiritual'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-10',
                explanation: 'Em vez de investir em saneamento e alimentação, oferecem remédios para doenças causadas por condições sociais, individualizando o problema.'
            },
            {
                id: 'soc-028',
                q: 'Como a sociologia da juventude explica a cultura do funk baiano?',
                a: ['Expressão identitária e crítica social de jovens periféricos', 'Degradação moral', 'Imposição cultural', 'Entretenimento alienado'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-05',
                explanation: 'O funk/arrocha permite que jovens das periferias falem de seus realities, criem códigos próprios e contestem moralidades dominantes.'
            },
            {
                id: 'soc-029',
                q: 'Qual teoria explica a persistência do coronelismo no interior baiano?',
                a: ['Poder local baseado em controle de recursos e redes de dependência pessoal', 'Democracia participativa', 'Anarquia', 'Tecnocracia'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-SOC-12',
                explanation: 'Famílias tradicionais controlam terras, comércio e até cargos públicos, mantendo influência através de favores e intimidação.'
            },
            {
                id: 'soc-030',
                q: 'Como o conceito de "ressentimento" ajuda a entender violência entre grupos marginalizados?',
                a: ['Frustração dirigida horizontalmente (entre pobres) em vez de verticalmente (contra elites)', 'Maldade natural', 'Planejamento racional', 'Ação revolucionária'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-11',
                explanation: 'Jovens de favelas, excluídos do mercado e estigmatizados, canalizam raiva para conflitos entre facções, não para mudança estrutural.'
            },
            {
                id: 'soc-031',
                q: 'Qual a importância sociológica das feiras livres nas cidades baianas?',
                a: ['Economia informal que sustenta famílias e cria sociabilidades populares', 'Comércio ilegal', 'Resquício arcaico', 'Luxo gourmet'],
                correct: 0,
                difficulty: 'easy',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-SOC-06',
                explanation: 'Feiras como a de São Joaquim em Salvador são centros econômicos e culturais, com redes de solidariedade e resistência à formalização capitalista.'
            },
            {
                id: 'soc-032',
                q: 'Como a teoria do reconhecimento explica demandas por políticas afirmativas na Bahia?',
                a: ['Luta não só por recursos, mas por valorização identitária e fim de estigmatização', 'Apenas por vantagens materiais', 'Segregação', 'Assimilação'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-04',
                explanation: 'Cotas raciais e culturais buscam não só acesso a universidades, mas reconhecimento público da contribuição negra e indígena à sociedade.'
            },
            {
                id: 'soc-033',
                q: 'Qual conceito explica a relação entre igrejas neopentecostais e mídia na Bahia?',
                a: ['Televangelismo que transforma religião em produto midiático e fonte de poder político', 'Separação entre religião e mídia', 'Comunicação alternativa', 'Arte sacra'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-05',
                explanation: 'Igrejas como Universal e Mundial usam rádio, TV e internet para angariar fiéis, fundos e influência, criando impérios midiático-religiosos.'
            },
            {
                id: 'soc-034',
                q: 'Como a sociologia da família explica as mudanças nos arranjos domésticos baianos?',
                a: ['Diversificação com famílias monoparentais (chefiadas por mulheres) e recompostas', 'Família nuclear tradicional apenas', 'Desaparecimento da família', 'Volta ao patriarcado rígido'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-09',
                explanation: 'Crescem lares chefiados por mulheres, muitas vezes avós criando netos, refletindo migração, desemprego masculino e novas dinâmicas de gênero.'
            },
            {
                id: 'soc-035',
                q: 'Qual teoria explica a "guerra às drogas" nas periferias de Salvador?',
                a: ['Guerra contra os pobres que legitima controle social e violência estatal', 'Combate ao crime organizado eficaz', 'Proteção da juventude', 'Saúde pública'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-11',
                explanation: 'Políticas repressivas focam em pequenos traficantes de periferia, não no financiamento do tráfico, criminalizando pobreza e juventude negra.'
            },
            {
                id: 'soc-036',
                q: 'Como o conceito de "sociabilidade" se manifesta nas praias baianas?',
                a: ['Espaços de encontro e mistura social, mas também de segregação sutil', 'Separação completa', 'Indiferença total', 'Conflito aberto'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-SOC-07',
                explanation: 'Praias como Porto da Barra têm zonas "nobres" e "populares", com barreiras invisíveis baseadas em classe, cor e estilo.'
            },
            {
                id: 'soc-037',
                q: 'Qual a importância sociológica das rodas de capoeira?',
                a: ['Microcosmo da sociedade brasileira com hierarquias, mas também espaço de resistência cultural', 'Apenas esporte', 'Violência disfarçada', 'Folclore turístico'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-05',
                explanation: 'A roda reproduz desigualdades (mestre-discípulo, homens-mulheres), mas também valores como malandragem e resistência herdados da escravidão.'
            },
            {
                id: 'soc-038',
                q: 'Como a teoria da secularização explica as relações religiosas na Bahia?',
                a: 'Não aplicação plena na Bahia devido força das religiões na vida pública',
                a: ['Processo incompleto com permanência forte da religião no espaço público', 'Desaparecimento da religião', 'Teocracia', 'Ateísmo geral'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-05',
                explanation: 'Ao contrário da Europa, na Bahia religiões (católica, evangélicas, afro-brasileiras) mantêm influência política e cultural, com sincretismos.'
            },
            {
                id: 'soc-039',
                q: 'Qual conceito explica a glamourização da pobreza na música e TV baianas?',
                a: ['Estetização da miséria que romantiza sofrimento para consumo das elites', 'Denúncia social', 'Realismo cru', 'Ignorância'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-05',
                explanation: 'Produções culturais mostram favelas como lugares "autênticos" e "coloridos", apagando violência e privação para entreter classes médias.'
            },
            {
                id: 'soc-040',
                q: 'Como a sociologia da saúde explica a popularidade das benzedeiras no interior baiano?',
                a: ['Cuidado culturalmente apropriado e acessível onde serviço público é deficiente', 'Superstição pura', 'Charlatanismo', 'Medicina avançada'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-10',
                explanation: 'Benzedeiras oferecem tratamento que integra corpo, mente e espírito, em linguagem familiar, preenchendo lacunas do SUS em comunidades remotas.'
            },
            {
                id: 'soc-041',
                q: 'Qual teoria explica a relação entre turismo sexual e pobreza no litoral baiano?',
                a: ['Exploração econômica de corpos em contexto de desigualdade de gênero e classe', 'Liberdade sexual', 'Escolha individual', 'Cultura local'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-09',
                explanation: 'Mulheres e adolescentes pobres recorrem ao turismo sexual como estratégia de sobrevivência, muitas vezes mascarada como "namoro" com estrangeiros.'
            },
            {
                id: 'soc-042',
                q: 'Como o conceito de "dominação simbólica" se manifesta na educação baiana?',
                a: ['Currículos que valorizam cultura europeia e ignoram contribuições africanas e indígenas', 'Neutralidade cultural', 'Pluralismo', 'Foco apenas local'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-SOC-10',
                explanation: 'Escolas ensinam história da Grécia mas não do Reino do Congo, impondo visão de mundo eurocêntrica como universal e superior.'
            },
            {
                id: 'soc-043',
                q: 'Qual a importância sociológica das festas de largo em Salvador?',
                a: ['Apropriação do espaço público pelo povo, invertendo hierarquias sociais cotidianas', 'Controle estatal', 'Eventos privados', 'Desordem criminosa'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-05',
                explanation: 'Festas como a de Santa Bárbara ocupam ruas normalmente controladas pelo comércio ou trânsito, criando temporalmente comunidade igualitária.'
            },
            {
                id: 'soc-044',
                q: 'Como a teoria dos novos movimentos sociais explica o ambientalismo baiano?',
                a: ['Lutas por qualidade de vida e identidade, não apenas por redistribuição econômica', 'Conflito de classes tradicional', 'Defesa de privilégios', 'Modismo'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-08',
                explanation: 'Movimentos como os pela preservação da Chapada Diamantina combinam defesa ambiental com questões culturais e direitos territoriais.'
            },
            {
                id: 'soc-045',
                q: 'Qual conceito explica a violência contra terreiros de candomblé?',
                a: ['Intolerância religiosa com fundo racista contra religiões de matriz africana', 'Conflito teológico', 'Vandalismo aleatório', 'Competição entre religiões'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-04',
                explanation: 'Ataques a terreiros não são apenas religiosos, mas expressam racismo contra cultura negra, frequentemente com conivência policial.'
            },
            {
                id: 'soc-046',
                q: 'Como a sociologia do consumo explica o sucesso de shopping centers em Salvador?',
                a: ['Espaços de segurança e status para classes médias em cidade percebida como perigosa', 'Democracia comercial', 'Acesso popular', 'Necessidade básica'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-06',
                explanation: 'Shoppings oferecem consumo em ambiente controlado, segregado das ruas "perigosas", tornando-se símbolos de modernidade e distinção social.'
            },
            {
                id: 'soc-047',
                q: 'Qual teoria explica a persistência do trabalho infantil no sertão baiano?',
                a: ['Ciclo de pobreza onde crianças trabalham para complementar renda familiar insuficiente', 'Falta de vontade de estudar', 'Tradição cultural valorizada', 'Exploração paterna'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-10',
                explanation: 'Em famílias agrícolas pobres, crianças trabalham na roça desde cedo, reproduzindo pobreza ao prejudicar escolarização.'
            },
            {
                id: 'soc-048',
                q: 'Como o conceito de "gentrificação" se aplica ao Pelourinho?',
                a: ['Expulsão de moradores pobres por reforma que atrai turismo e negócios', 'Preservação histórica pura', 'Degradação', 'Demolição'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-SOC-07',
                explanation: 'A restauração do Pelourinho nos anos 1990 removeu população tradicional para criar cenário "seguro" e "pittoresco" para turistas.'
            },
            {
                id: 'soc-049',
                q: 'Qual a importância sociológica das rádios comunitárias no interior baiano?',
                a: ['Comunicação alternativa que fortalece identidades locais e divulga demandas populares', 'Propaganda comercial', 'Entretenimento alienante', 'Instrumento estatal'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-SOC-08',
                explanation: 'Rádios comunitárias dão voz a grupos excluídos, divulgam cultura regional e organizam lutas por direitos, muitas vezes enfrentando perseguição.'
            },
            {
                id: 'soc-050',
                q: 'Como a teoria do Estado explica a atuação de milícias privadas no sul da Bahia?',
                a: ['Privatização da segurança por latifundiários em áreas de conflito agrário', 'Extensão do Estado', 'Autodefesa comunitária', 'Banditismo'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-SOC-11',
                explanation: 'Fazendeiros contratam seguranças privados, muitas vezes ex-policiais, para intimidar sem-terra, mostrando frágil monopólio estatal da força.'
            }
        ],
        summary: 'A sociologia baiana analisa as complexas relações sociais do estado, desde suas raízes coloniais até os movimentos contemporâneos por direitos e reconhecimento.',
        mindMap: null,
        videoPlaylist: null
    },
    {
        id: 'filosofia-ba',
        title: 'Filosofia: Pensamento Crítico',
        description: 'Reflexão filosófica sobre questões éticas, políticas e existenciais no contexto baiano.',
        iconName: 'Brain',
        category: 'Humanas',
        learningObjective: 'Desenvolver o pensamento crítico a partir de problemas filosóficos contextualizados na realidade baiana.',
        xp: 600,
        questions: [
            {
                id: 'fil-001',
                q: 'Qual conceito filosófico ajuda a entender o sincretismo religioso baiano?',
                a: ['Transculturação - processo de mistura cultural que cria novas sínteses', 'Pureza cultural', 'Assimilação unilateral', 'Isolamento cultural'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-01',
                explanation: 'O sincretismo não é simples sobreposição, mas criação original a partir do encontro entre catolicismo, religiões africanas e indígenas.'
            },
            {
                id: 'fil-002',
                q: 'Como a filosofia africana contribui para pensar questões baianas?',
                a: ['Oferece conceitos como ubuntu (humanidade compartilhada) para pensar comunidade', 'É irrelevante para Bahia', 'Cópia da filosofia europeia', 'Pensamento primitivo'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-02',
                explanation: 'Filosofias como a iorubá, com seus conceitos de axé (força vital) e ori (destino/cabeça), oferecem bases para entender visões de mundo afro-baianas.'
            },
            {
                id: 'fil-003',
                q: 'Qual problema ético está presente no turismo sexual no litoral baiano?',
                a: ['Exploração da vulnerabilidade econômica sob aparência de escolha livre', 'Liberdade sexual plena', 'Questão apenas policial', 'Tradição cultural'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-03',
                explanation: 'A aparente "escolha" de adolescentes pobres mascara falta real de alternativas, colocando questões sobre autonomia em condições de desigualdade.'
            },
            {
                id: 'fil-004',
                q: 'Como o conceito de "alteridade" ajuda a pensar relações raciais na Bahia?',
                a: ['Reconhecer o outro em sua diferença sem inferiorizá-lo ou assimilá-lo forçadamente', 'Ignorar diferenças', 'Assimilar todos a um padrão', 'Separar completamente'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-04',
                explanation: 'A alteridade exige ver negros, indígenas e outros grupos como diferentes mas iguais em dignidade, superando racismo e intolerância.'
            },
            {
                id: 'fil-005',
                q: 'Qual concepção de justiça está por trás das cotas raciais na UFBA?',
                a: ['Justiça como reparação histórica e equidade (dar mais aos que têm menos)', 'Justiça apenas como mérito individual', 'Vingança contra brancos', 'Privilégio'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-05',
                explanation: 'As cotas partem do princípio que igualdade formal é insuficiente quando há desigualdades históricas, exigindo ações afirmativas.'
            },
            {
                id: 'fil-006',
                q: 'Como a filosofia existencialista ajuda a entender migração do sertão para Salvador?',
                a: ['Escolha em situação de limites: liberdade condicionada por pobreza e seca', 'Determinismo absoluto', 'Escolha completamente livre', 'Acaso'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-06',
                explanation: 'O sertanejo migra não por capricho, mas exercendo liberdade dentro de condições extremas (facticidade) impostas pela seca e falta de oportunidades.'
            },
            {
                id: 'fil-007',
                q: 'Qual problema filosófico surge na comercialização do candomblé para turistas?',
                a: ['Coisificação do sagrado: transformação de ritual em espetáculo para consumo', 'Democratização religiosa', 'Liberdade de expressão', 'Educação cultural'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-01',
                explanation: 'Ao virar atração turística, rituais perdem significado religioso profundo, tornando-se mercadoria, o que levanta questões sobre respeito à alteridade religiosa.'
            },
            {
                id: 'fil-008',
                q: 'Como o conceito de "ideologia" explica estereótipos sobre nordestinos?',
                a: ['Representações falsas que naturalizam desigualdades regionais', 'Verdades científicas', 'Inocentes brincadeiras', 'Opiniões pessoais'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-07',
                explanation: 'Estereótipos como "nordestino preguiçoso" escondem causas históricas da pobreza (escravidão, concentração fundiária), apresentando-a como culpa individual.'
            },
            {
                id: 'fil-009',
                q: 'Qual ética está presente na relação das comunidades quilombolas com a terra?',
                a: ['Ética do cuidado e pertencimento, não apenas propriedade privada', 'Ética utilitarista pura', 'Posse individualista', 'Exploração máxima'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-03',
                explanation: 'Para quilombolas, terra é mãe, espaço sagrado e coletivo, contrastando com visão capitalista de propriedade individual e recurso a explorar.'
            },
            {
                id: 'fil-010',
                q: 'Como o conceito de "poder" de Foucault ajuda a entender políticas de segurança em Salvador?',
                a: ['Controle social através do medo e vigilância nas periferias', 'Poder apenas repressivo', 'Ausência de poder', 'Poder igualitário'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-08',
                explanation: 'A política de "guerra às drogas" cria discurso que justifica vigilância e violência em favelas, exercendo poder disciplinar sobre corpos pobres.'
            },
            {
                id: 'fil-011',
                q: 'Qual problema filosófico sobre identidade surge no debate sobre "democracia racial" brasileira?',
                a: ['Mascaramento do racismo através do mito da mestiçagem harmoniosa', 'Descrição precisa da realidade', 'Modelo a ser seguido', 'Teoria científica'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-04',
                explanation: 'A ideia de que no Brasil há mistura racial sem conflito esconde racismo estrutural e impede políticas específicas contra desigualdades raciais.'
            },
            {
                id: 'fil-012',
                q: 'Como a filosofia da tecnologia ajuda a pensar a transposição do São Francisco?',
                a: ['Técnica como poder sobre a natureza, com riscos e responsabilidades éticas', 'Progresso inevitável', 'Solução técnica pura', 'Retorno à natureza'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-09',
                explanation: 'A obra levanta questões sobre intervenção em ecossistemas complexos, benefícios vs. riscos, e quem decide sobre uso dos recursos naturais.'
            },
            {
                id: 'fil-013',
                q: 'Qual concepção de beleza está presente na estética do Carnaval de Salvador?',
                a: ['Beleza como alegria, movimento coletivo e excesso, não apenas harmonia clássica', 'Beleza apenas individual', 'Feiura consciente', 'Ausência de estética'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-10',
                explanation: 'O Carnaval baiano valoriza cor, ritmo, espontaneidade e participação coletiva, desafinando padrões europeus de beleza como equilíbrio e contenção.'
            },
            {
                id: 'fil-014',
                q: 'Como o conceito de "consciência possível" de Lukács ajuda a entender movimentos sociais baianos?',
                a: ['Capacidade de grupos oprimidos entenderem suas condições e agirem para mudá-las', 'Falsa consciência permanente', 'Consciência individual apenas', 'Determinismo econômico'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-07',
                explanation: 'Movimentos como MST e bloco afro desenvolvem, através da luta, compreensão mais profunda das causas de sua opressão do que teriam isoladamente.'
            },
            {
                id: 'fil-015',
                q: 'Qual problema ético surge na biopirataria na Mata Atlântica baiana?',
                a: ['Apropriação privada de conhecimentos tradicionais coletivos sem benefício às comunidades', 'Compartilhamento justo', 'Preservação científica', 'Progresso médico'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-03',
                explanation: 'Empresas patentiam moléculas descobertas com ajuda de pajés e raizeiros, lucrando sem retornar benefícios a detentores originais do conhecimento.'
            },
            {
                id: 'fil-016',
                q: 'Como o conceito de "fetiche da mercadoria" de Marx se aplica ao turismo cultural na Bahia?',
                a: ['Relações sociais (culturas) aparecem como relações entre coisas (produtos turísticos)', 'Valorização cultural autêntica', 'Intercâmbio igualitário', 'Preservação pura'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-07',
                explanation: 'Rituais e festas tornam-se "produtos" cujo valor de troca (dinheiro do turista) esconde relações de exploração e perda de significado original.'
            },
            {
                id: 'fil-017',
                q: 'Qual problema filosófico sobre memória surge na restauração do Pelourinho?',
                a: ['Memória seletiva que apaga sofrimento (escravidão) para criar cenário turístico agradável', 'Preservação integral', 'Destruição do passado', 'Memória objetiva'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-11',
                explanation: 'O Pelourinho "limpo" e colorido apaga marcas da escravidão (como o próprio pelourinho de castigo), criando memória edulcorada para consumo turístico.'
            },
            {
                id: 'fil-018',
                q: 'Como a filosofia do cuidado (ética do cuidado) ajuda a pensar políticas públicas na Bahia?',
                a: ['Priorizar vulneráveis e relações de interdependência, não apenas direitos individuais', 'Assistencialismo', 'Darwinismo social', 'Tecnicismo'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-03',
                explanation: 'Uma ética do cuidado priorizaria crianças, idosos, pessoas com deficiência e meio ambiente, reconhecendo que somos todos interdependentes.'
            },
            {
                id: 'fil-019',
                q: 'Qual conceito de liberdade está presente na capoeira?',
                a: ['Liberdade como arte de lidar com limites (corpo, opressão) criativamente', 'Liberdade absoluta', 'Submissão completa', 'Violência liberadora'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-06',
                explanation: 'Criada por escravizados, a capoeira transforma restrições (correntes, vigilância) em movimento artístico, mostrando liberdade mesmo na opressão.'
            },
            {
                id: 'fil-020',
                q: 'Como o conceito de "razão instrumental" de Horkheimer/Adorno ajuda a entender o Polo de Camaçari?',
                a: ['Racionalidade focada apenas em eficiência econômica, ignorando custos humanos e ambientais', 'Racionalidade integral', 'Irrationalidade', 'Tradição'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-09',
                explanation: 'O Polo maximiza produção e lucro, mas gera poluição, doenças e trabalho precário, mostrando limites da razão que só calcula meios para fins econômicos.'
            },
            {
                id: 'fil-021',
                q: 'Qual problema filosófico sobre verdade surge nos discursos políticos sobre seca no sertão?',
                a: ['Naturalização de problema social (como "castigo divino" ou "destino geográfico")', 'Análise científica completa', 'Ignorância pura', 'Conspiração'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-07',
                explanation: 'Chamar seca de "fenômeno natural" esconde que seus efeitos devastadores resultam de concentração fundiária, falta de políticas e desigualdade.'
            },
            {
                id: 'fil-022',
                q: 'Como a filosofia intercultural ajuda a pensar educação escolar na Bahia?',
                a: ['Diálogo entre diferentes saberes (acadêmico, popular, indígena, africano)', 'Imposição de um saber universal', 'Relativismo absoluto', 'Isolamento cultural'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-02',
                explanation: 'Uma educação intercultural não só incluiria história da África, mas dialogaria com conhecimentos de terreiros, comunidades indígenas e mestres populares.'
            },
            {
                id: 'fil-023',
                q: 'Qual concepção de natureza está presente no candomblé?',
                a: ['Natureza como sagrada, viva e interconectada (orixás como forças naturais)', 'Natureza como recurso a explorar', 'Natureza morta', 'Natureza hostil'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-01',
                explanation: 'No candomblé, rios (Oxum), florestas (Oxóssi), trovões (Xangô) são manifestações divinas, exigindo respeito, não dominação.'
            },
            {
                id: 'fil-024',
                q: 'Como o conceito de "banalidade do mal" de Arendt ajuda a pensar violência policial?',
                a: ['Violência rotineira e burocrática por agentes que apenas "seguem ordens"', 'Mal extraordinário', 'Apenas "maçãs podres" individuais', 'Necessidade social'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-08',
                explanation: 'A violência policial contra pobres muitas vezes não resulta de ódio individual, mas de rotinas institucionais e cumprimento de políticas discriminatórias.'
            },
            {
                id: 'fil-025',
                q: 'Qual problema filosófico sobre justiça surge nos conflitos por terra no sul da Bahia?',
                a: ['Conflito entre propriedade privada (latifúndio) e função social da terra', 'Apenas questão criminal', 'Disputa pessoal', 'Problema técnico'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-05',
                explanation: 'A Constituição diz que terra deve cumprir função social. Movimentos sem-terra argumentam que latifúndios improdutivos violam esse princípio.'
            },
            {
                id: 'fil-026',
                q: 'Como a filosofia do corpo de Merleau-Ponty ajuda a entender a capoeira?',
                a: ['Corpo como modo de conhecer e expressar o mundo, não apenas instrumento', 'Corpo máquina', 'Espírito separado do corpo', 'Corpo obstáculo'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-10',
                explanation: 'Na capoeira, o corpo "sabe" movimentos, esquiva e ritmo de modo pré-reflexivo, mostrando conhecimento corporal que precede o intelectual.'
            },
            {
                id: 'fil-027',
                q: 'Qual concepção de tempo está presente nas festas cíclicas baianas (Lavagem do Bonfim, Carnaval)?',
                a: ['Tempo circular de renovação, diferente do tempo linear do capitalismo', 'Tempo apenas cronológico', 'Ausência de tempo', 'Tempo caótico'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-01',
                explanation: 'Festas que se repetem anualmente criam tempo mítico de renovação, interrompendo o tempo produtivo linear do trabalho e consumo.'
            },
            {
                id: 'fil-028',
                q: 'Como o conceito de "epistemicídio" de Boaventura Sousa Santos ajuda a pensar educação baiana?',
                a: ['Destruição de saberes não-europeus (africanos, indígenas) pelo colonialismo', 'Progresso do conhecimento', 'Neutralidade científica', 'Escolha livre'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-02',
                explanation: 'Escolas brasileiras ensinam principalmente saberes europeus, ignorando ou desvalorizando conhecimentos africanos, indígenas e populares.'
            },
            {
                id: 'fil-029',
                q: 'Qual problema ético surge na publicidade que usa imagens de crianças pobres baianas?',
                a: ['Exploração da miséria para vender produtos ou construir imagem "socialmente responsável"', 'Denúncia social', 'Registro documental', 'Homenagem'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-03',
                explanation: 'Empresas usam imagens de crianças carentes para parecerem solidárias, sem resolver causas da pobreza, coisificando sofrimento para marketing.'
            },
            {
                id: 'fil-030',
                q: 'Como a filosofia da linguagem de Wittgenstein ajuda a entender gírias do funk baiano?',
                a: ['Linguagem como forma de vida: gírias criam identidade e comunidade juvenil', 'Linguagem corrompida', 'Código secreto', 'Ausência de significado'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-10',
                explanation: 'Termos como "vumbora" ou "zé ruela" só fazem sentido dentro da "forma de vida" das periferias, criando pertencimento e distinção.'
            },
            {
                id: 'fil-031',
                q: 'Qual concepção de comunidade está presente nos terreiros de candomblé?',
                a: ['Comunidade como família espiritual (yaô, ebomi) com obrigações mútuas', 'Associação voluntária', 'Agrupamento aleatório', 'Hierarquia rígida'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-01',
                explanation: 'No candomblé, os laços de iniciação criam parentesco espiritual, com direitos e deveres que vão além do individualismo moderno.'
            },
            {
                id: 'fil-032',
                q: 'Como o conceito de "estado de exceção" de Agamben ajuda a entender favelas baianas?',
                a: ['Espaços onde lei normal é suspensa e violência estatal age sem controle', 'Estado de direito pleno', 'Anarquia', 'Autonomia comunitária'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-08',
                explanation: 'Em operações policiais em favelas, direitos básicos são suspensos, corpos pobres são tratados como "vida nua" que pode ser eliminada.'
            },
            {
                id: 'fil-033',
                q: 'Qual problema filosófico sobre conhecimento surge na medicina popular do sertão?',
                a: ['Saberes práticos (ervas, benzeções) não reconhecidos pela ciência oficial mas eficazes', 'Superstição pura', 'Conhecimento científico completo', 'Ignorância'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-09',
                explanation: 'Raizeiros e benzedeiras têm conhecimentos validados pela experiência, mas não pelo método científico, levantando questões sobre pluralismo epistemológico.'
            },
            {
                id: 'fil-034',
                q: 'Como a filosofia da esperança de Ernst Bloch ajuda a entender migrações do sertão?',
                a: ['Busca por "princípio esperança" mesmo em condições desesperadoras', 'Ilusão', 'Cálculo racional frio', 'Desespero'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-06',
                explanation: 'O migrante sertanejo carrega utopia concreta de vida melhor, "esperança" que motiva enfrentar riscos da viagem e discriminação na cidade.'
            },
            {
                id: 'fil-035',
                q: 'Qual concepção de arte está presente nas pinturas de Carybé sobre orixás?',
                a: ['Arte como tradução visual do sagrado, não apenas representação realista', 'Arte pela arte', 'Cópia da realidade', 'Abstração pura'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-10',
                explanation: 'Carybé busca captar a força (axé) dos orixás através de traços e cores, não representá-los fotograficamente, criando arte que é também devoção.'
            },
            {
                id: 'fil-036',
                q: 'Como o conceito de "lugar de fala" de Djamila Ribeiro ajuda a pensar política baiana?',
                a: ['Importância de mulheres negras, indígenas, LGBTQIA+ falarem por si nas decisões políticas', 'Qualquer um pode falar por todos', 'Especialistas apenas', 'Homens brancos sempre'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-04',
                explanation: 'Políticas públicas são mais eficazes quando elaboradas com participação de quem vive os problemas, não apenas por técnicos distantes.'
            },
            {
                id: 'fil-037',
                q: 'Qual problema ético surge no uso de imagens de religiões afro em produtos comerciais?',
                a: ['Apropriação cultural sem respeito ou benefício às comunidades de origem', 'Divulgação religiosa', 'Liberdade empresarial', 'Homenagem'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-03',
                explanation: 'Usar imagens de orixás em camisetas, bebidas ou decoração banaliza o sagrado e lucra com símbolos cujos detentores tradicionais não são beneficiados.'
            },
            {
                id: 'fil-038',
                q: 'Como a filosofia da ciência de Feyerabend ("anything goes") ajuda a pensar medicina integrativa?',
                a: ['Pluralismo metodológico: diferentes saberes (ocidental, popular) podem ser válidos', 'Ciência única verdadeira', 'Relativismo absoluto', 'Rejeição de toda ciência'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-09',
                explanation: 'A eficácia de práticas como fitoterapia ou acupuntura sugere que o método científico não é única via para conhecimento válido sobre saúde.'
            },
            {
                id: 'fil-039',
                q: 'Qual concepção de morte está presente nos rituais fúnebres do candomblé?',
                a: ['Morte como passagem e transformação, não fim absoluto', 'Extinção completa', 'Castigo divino', 'Evento apenas biológico'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-01',
                explanation: 'No candomblé, a morte é transição onde o espírito retorna ao Orum (mundo espiritual), podendo reencarnar ou tornar-se ancestral.'
            },
            {
                id: 'fil-040',
                q: 'Como o conceito de "biopoder" de Foucault ajuda a entender campanhas de vacinação no interior baiano?',
                a: ['Controle sobre corpos da população através de políticas de saúde', 'Apenas cuidado médico', 'Liberdade individual total', 'Negligência estatal'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-08',
                explanation: 'Campanhas de vacinação, embora benéficas, também são forma de Estado exercer poder sobre corpos, decidindo quem vive saudável e como.'
            },
            {
                id: 'fil-041',
                q: 'Qual problema filosófico sobre liberdade surge no trabalho informal nas ruas de Salvador?',
                a: ['Liberdade precária: "ser patrão de si" mas sem direitos ou segurança', 'Escravidão moderna', 'Liberdade plena', 'Opção preferencial'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-06',
                explanation: 'Vendedores ambulantes têm "liberdade" de horários, mas enfrentam insegurança, perseguição e falta de direitos trabalhistas.'
            },
            {
                id: 'fil-042',
                q: 'Como a filosofia ambiental ajuda a pensar conflitos entre mineração e comunidades na Chapada Diamantina?',
                a: ['Valor intrínseco da natureza vs. visão utilitarista (recurso a explorar)', 'Progresso inevitável', 'Preservação absoluta', 'Interesse apenas econômico'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-03',
                explanation: 'Ecologia profunda defende valor próprio dos ecossistemas, não apenas seu uso humano, questionando mineração mesmo que traga empregos.'
            },
            {
                id: 'fil-043',
                q: 'Qual concepção de história está presente no bloco afro Ilê Aiyê?',
                a: ['História como reconstrução da dignidade negra contra versão eurocêntrica', 'História como progresso linear', 'História como repetição', 'Ausência de história'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-11',
                explanation: 'O Ilê Aiyê resgata história da África e diáspora, contra narrativa oficial que minimiza escravidão e contribuições negras.'
            },
            {
                id: 'fil-044',
                q: 'Como o conceito de "razão cínica" de Sloterdijk ajuda a entender corrupção na política baiana?',
                a: ['Saber que algo é errado mas fazer mesmo assim, sem ilusões ideológicas', 'Ignorância', 'Ideologia sincera', 'Necessidade estrutural'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-07',
                explanation: 'Políticos muitas vezes não acreditam em discursos moralistas, mas os usam sabendo que são hipócritas, agindo por interesse puro.'
            },
            {
                id: 'fil-045',
                q: 'Qual problema ético surge na pesquisa genética com populações quilombolas?',
                a: ['Biopirataria genética: coleta de DNA sem consentimento pleno ou benefícios', 'Progresso científico neutro', 'Preservação genética', 'Curiosidade'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-09',
                explanation: 'Cientistas coletam material genético de quilombolas para estudar ancestralidade, mas comunidades muitas vezes não entendem usos ou recebem resultados.'
            },
            {
                id: 'fil-046',
                q: 'Como a filosofia da música ajuda a entender o pagode baiano?',
                a: ['Música como expressão corporal coletiva e criação de comunidade, não apenas arte auditiva', 'Música apenas melódica', 'Ruído', 'Entretenimento individual'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-10',
                explanation: 'O pagode é feito para dançar em grupo, criar paqueras e reforçar laços comunitários, sendo mais experiência corporal coletiva que apreciação estética individual.'
            },
            {
                id: 'fil-047',
                q: 'Qual concepção de justiça distributiva está por trás do Bolsa Família na Bahia?',
                a: ['Prioritarismo: ajudar primeiro os mais pobres para reduzir desigualdades extremas', 'Igualdade absoluta', 'Dar a cada o que merece', 'Assistencialismo'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-05',
                explanation: 'O programa transfere renda aos mais pobres, priorizando redução da miséria extrema antes de preocupações com igualdade perfeita.'
            },
            {
                id: 'fil-048',
                q: 'Como o conceito de "sociedade do espetáculo" de Debord ajuda a entender o Carnaval de Salvador?',
                a: ['Transformação da vida em imagem para consumo, com blocos como marcas e turistas como espectadores', 'Festa autêntica popular', 'Ritual religioso', 'Caos'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Avaliar',
                skillCode: 'DCRB-FIL-07',
                explanation: 'O Carnaval comercializado vende experiência como espetáculo, com camarotes caros e blocos patrocinados, substituindo participação por consumo passivo.'
            },
            {
                id: 'fil-049',
                q: 'Qual problema filosófico sobre autenticidade surge na cultura baiana turistificada?',
                a: ['Busca por "autêntico" que destrói justamente o que busca ao transformá-lo em produto', 'Autenticidade preservada', 'Invenção pura', 'Cópia'],
                correct: 0,
                difficulty: 'medium',
                bloomLevel: 'Analisar',
                skillCode: 'DCRB-FIL-01',
                explanation: 'Turistas querem ver "candomblé autêntico", mas a presença deles nos terreiros altera os rituais, criando versão para turistas.'
            },
            {
                id: 'fil-050',
                q: 'Como a filosofia da educação de Paulo Freire ajuda a pensar escolas no sertão baiano?',
                a: ['Educação como diálogo que parte da realidade do aluno (seca, agricultura) para leitura crítica do mundo', 'Transmissão de conhecimentos prontos', 'Treinamento técnico', 'Doutrinação'],
                correct: 0,
                difficulty: 'hard',
                bloomLevel: 'Aplicar',
                skillCode: 'DCRB-FIL-10',
                explanation: 'Uma educação freiriana no sertão começaria com palavras geradoras como "terra", "seca", "roça", para analisar criticamente condições de vida.'
            }
        ],
    }
]
