export const SUBJECTS = [
    {
        id: 'math-1',
        title: 'Matemática: Funções e Geometria',
        description: 'Conceitos fundamentais para o ENEM.',
        iconName: 'Calculator',
        category: 'Exatas',
        xp: 600,
        questions: [
            {
                id: 'math-q1',
                q: 'Qual é o valor de x na equação 2x + 10 = 20?',
                a: ['5', '10', '15', '2'],
                correct: 0,
                difficulty: 'easy',
                explanation: 'Para resolver: 2x + 10 = 20 → 2x = 20 - 10 → 2x = 10 → x = 5',
                videoUrl: 'https://www.youtube.com/watch?v=6dcszXnkRAI'
            },
            {
                id: 'math-q2',
                q: 'A soma dos ângulos internos de um triângulo é:',
                a: ['360°', '180°', '90°', '270°'],
                correct: 1,
                difficulty: 'easy',
                explanation: 'A soma dos ângulos internos de qualquer triângulo é sempre 180°. É uma propriedade fundamental da geometria euclidiana.',
                videoUrl: 'https://www.youtube.com/watch?v=-6MYOpNQdGQ'
            },
            {
                id: 'math-q3',
                q: 'Qual a fórmula da área do círculo?',
                a: ['2πr', 'πr²', 'πd', 'b.h/2'],
                correct: 1,
                difficulty: 'medium',
                explanation: 'A área do círculo é calculada por π multiplicado pelo raio ao quadrado (A = πr²). Onde r é o raio do círculo.',
                videoUrl: 'https://www.youtube.com/watch?v=oeTd5Tng0rU'
            },
            {
                id: 'math-q4',
                q: 'O gráfico de uma função do 2º grau é uma:',
                a: ['Reta', 'Hipérbole', 'Parábola', 'Elipse'],
                correct: 2,
                difficulty: 'medium',
                explanation: 'Funções do segundo grau (ax² + bx + c) têm gráficos em forma de parábola. Se a > 0, concavidade para cima; se a < 0, para baixo.',
                videoUrl: 'https://www.youtube.com/watch?v=ZnxMdyN4Xp8'
            },
            {
                id: 'math-q5',
                q: 'Logaritmo de 100 na base 10 é:',
                a: ['1', '2', '10', '0'],
                correct: 1,
                difficulty: 'hard',
                explanation: 'Log₁₀100 = 2, pois 10 elevado a 2 é igual a 100 (10² = 100). Logaritmo é o expoente ao qual a base deve ser elevada.',
                videoUrl: 'https://www.youtube.com/watch?v=hKKfjN3nVBA'
            }
        ],
        summary: 'Funções matemáticas representam relações entre variáveis. Funções do 1º grau são lineares (reta), do 2º grau são quadráticas (parábola). Geometria estuda formas, tamanhos e propriedades do espaço. Conceitos fundamentais incluem pontos, retas, planos, ângulos, perímetro, área e volume.',
        mindMap: 'https://exemplo.com/mindmaps/mathematics.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYhACfQUtM0eL_9d6Q_nhx-q'
    },
    {
        id: 'hist-1',
        title: 'História do Brasil',
        description: 'Do período colonial à República.',
        iconName: 'History',
        category: 'Humanas',
        xp: 500,
        questions: [
            {
                id: 'hist-q1',
                q: 'Quem descobriu o Brasil?',
                a: ['Pedro Álvares Cabral', 'Cristóvão Colombo', 'Vasco da Gama', 'Dom Pedro I'],
                correct: 0,
                difficulty: 'easy',
                explanation: 'Pedro Álvares Cabral chegou ao Brasil em 22 de abril de 1500, na atual região de Porto Seguro, Bahia.',
                videoUrl: 'https://www.youtube.com/watch?v=krzOVoXGHHY'
            },
            {
                id: 'hist-q2',
                q: 'Em que ano foi assinada a Lei Áurea?',
                a: ['1822', '1889', '1888', '1930'],
                correct: 2,
                difficulty: 'easy',
                explanation: 'A Lei Áurea foi assinada em 13 de maio de 1888 pela Princesa Isabel, abolindo a escravidão no Brasil.',
                videoUrl: 'https://www.youtube.com/watch?v=H9OkxpL3nF8'
            },
            {
                id: 'hist-q3',
                q: 'Qual presidente construiu Brasília?',
                a: ['Getúlio Vargas', 'Juscelino Kubitschek', 'Lula', 'FHC'],
                correct: 1,
                difficulty: 'medium',
                explanation: 'Juscelino Kubitschek (1956-1961) foi o responsável pela construção de Brasília, inaugurada em 21 de abril de 1960.',
                videoUrl: 'https://www.youtube.com/watch?v=pgNoLV-Ddow'
            },
            {
                id: 'hist-q4',
                q: 'O que foi o ciclo do ouro?',
                a: ['Exploração em SP', 'Exploração em MG', 'Exploração no AM', 'Exploração no RS'],
                correct: 1,
                difficulty: 'medium',
                explanation: 'O Ciclo do Ouro (século XVIII) foi o período de extração intensiva de ouro principalmente em Minas Gerais, causando grande desenvolvimento da região.',
                videoUrl: 'https://www.youtube.com/watch?v=CmsVGJKiC4k'
            },
            {
                id: 'hist-q5',
                q: 'Quem proclamou a independência?',
                a: ['Dom Pedro I', 'Dom Pedro II', 'Deodoro da Fonseca', 'Tiradentes'],
                correct: 0,
                difficulty: 'hard',
                explanation: 'Dom Pedro I proclamou a independência do Brasil em 7 de setembro de 1822 às margens do rio Ipiranga, em São Paulo.',
                videoUrl: 'https://www.youtube.com/watch?v=EYlOzOw7q2E'
            }
        ],
        summary: 'História do Brasil divide-se em: Período Colonial (1500-1822), Imperial (1822-1889) e Republicano (1889-atual). Principais eventos: descobrimento, ciclo do açúcar, ciclo do ouro, independência, abolição, proclamação da república, era Vargas, ditadura militar e redemocratização.',
        mindMap: 'https://exemplo.com/mindmaps/historia-brasil.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYgZcDaMhS3yLZm0gTOqX-73'
    },
    {
        id: 'bio-1',
        title: 'Biologia: Citologia e Genética',
        description: 'Estruturas celulares e hereditariedade.',
        iconName: 'Dna',
        category: 'Biológicas',
        xp: 550,
        questions: [
            {
                id: 'bio-q1',
                q: 'Qual organela é responsável pela respiração celular?',
                a: ['Ribossomo', 'Mitocôndria', 'Lisossomo', 'Complexo de Golgi'],
                correct: 1,
                difficulty: 'easy',
                explanation: 'A mitocôndria é a organela responsável pela respiração celular, onde ocorre a produção de ATP (energia) através da fosforilação oxidativa.',
                videoUrl: 'https://www.youtube.com/watch?v=exX6EtKL6PU'
            },
            {
                id: 'bio-q2',
                q: 'O DNA é composto por uma dupla:',
                a: ['Hélice', 'Camada', 'Membrana', 'Ligação'],
                correct: 0,
                difficulty: 'easy',
                explanation: 'O DNA possui estrutura de dupla hélice, descoberta por Watson e Crick em 1953. As fitas são complementares e anti-paralelas.',
                videoUrl: 'https://www.youtube.com/watch?v=Eum9I_4bdeA'
            },
            {
                id: 'bio-q3',
                q: 'Quantos pares de cromossomos tem o ser humano?',
                a: ['23', '46', '22', '24'],
                correct: 0,
                difficulty: 'medium',
                explanation: 'O ser humano possui 23 pares de cromossomos (46 no total), sendo 22 pares autossômicos e 1 par sexual (XX ou XY).',
                videoUrl: 'https://www.youtube.com/watch?v=VkY4zZKlslw'
            },
            {
                id: 'bio-q4',
                q: 'Quem é o pai da genética?',
                a: ['Darwin', 'Lamarck', 'Mendel', 'Pasteur'],
                correct: 2,
                difficulty: 'medium',
                explanation: 'Gregor Mendel é considerado o pai da genética por seus experimentos com ervilhas que estabeleceram as leis da herança genética.',
                videoUrl: 'https://www.youtube.com/watch?v=UWSgvGIuc6M'
            },
            {
                id: 'bio-q5',
                q: 'A célula vegetal possui:',
                a: ['Parede Celular', 'Centríolos', 'Flagelos', 'Nenhuma das anteriores'],
                correct: 0,
                difficulty: 'hard',
                explanation: 'A célula vegetal possui parede celular (de celulose), cloroplastos (para fotossíntese) e vacúolo central, diferindo da animal.',
                videoUrl: 'https://www.youtube.com/watch?v=JnG0dZ1efuM'
            }
        ],
        summary: 'Citologia estuda a célula, unidade básica da vida. Tipos: procarióticas (sem núcleo) e eucarióticas (com núcleo). Genética estuda a herança biológica. DNA → RNA → Proteína. Leis de Mendel: segregação independente e dominância/recessividade.',
        mindMap: 'https://exemplo.com/mindmaps/biologia.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYiE1AXnI8ZRZ8CQ4zDq5cW0'
    },
    {
        id: 'port-1',
        title: 'Língua Portuguesa',
        description: 'Gramática, interpretação e literatura.',
        iconName: 'Languages',
        category: 'Linguagens',
        xp: 500,
        questions: [
            {
                id: 'port-q1',
                q: 'Qual é o sujeito da frase "Choveu muito ontem"?',
                a: ['Oculto', 'Inexistente', 'Composto', 'Simples'],
                correct: 1,
                difficulty: 'easy',
                explanation: 'Em "Choveu muito ontem", o verbo "chover" é impessoal, não exige sujeito. Portanto, temos sujeito inexistente (ou oração sem sujeito).',
                videoUrl: 'https://www.youtube.com/watch?v=fS5ADyi7uZM'
            },
            {
                id: 'port-q2',
                q: 'Machado de Assis fundou a:',
                a: ['Academia Brasileira de Letras', 'Semana de Arte Moderna', 'Arcadismo', 'Parnasianismo'],
                correct: 0,
                difficulty: 'easy',
                explanation: 'Machado de Assis foi um dos fundadores e primeiro presidente da Academia Brasileira de Letras, em 1897.',
                videoUrl: 'https://www.youtube.com/watch?v=qgvMyGN8Xb0'
            },
            {
                id: 'port-q3',
                q: 'A palavra "Exceção" se escreve com:',
                a: ['SS', 'Ç', 'SC', 'S'],
                correct: 1,
                difficulty: 'medium',
                explanation: '"Exceção" escreve-se com Ç, assim como "excecional", "excecionalmente". A regra é: depois de ditongo usa-se Ç (ce, ci).',
                videoUrl: 'https://www.youtube.com/watch?v=uhX87meAFY4'
            },
            {
                id: 'port-q4',
                q: 'Macunaíma é uma obra do:',
                a: ['Romantismo', 'Barroco', 'Modernismo', 'Realismo'],
                correct: 2,
                difficulty: 'medium',
                explanation: 'Macunaíma (1928) é obra de Mário de Andrade, um dos principais representantes do Modernismo brasileiro.',
                videoUrl: 'https://www.youtube.com/watch?v=thKk-x4QBf8'
            },
            {
                id: 'port-q5',
                q: 'Qual figura de linguagem expressa exagero?',
                a: ['Metáfora', 'Hipérbole', 'Eufemismo', 'Ironia'],
                correct: 1,
                difficulty: 'hard',
                explanation: 'Hipérbole é a figura de linguagem que expressa exagero intencional para dar ênfase. Ex: "Estou morrendo de fome".',
                videoUrl: 'https://www.youtube.com/watch?v=NYNarRgN1Eg'
            }
        ],
        summary: 'Gramática portuguesa: fonética, morfologia, sintaxe, semântica. Gêneros textuais: narrativo, descritivo, dissertativo-argumentativo. Literatura: escolas literárias desde o Quinhentismo até Contemporâneo. Interpretação de texto é fundamental para o ENEM.',
        mindMap: 'https://exemplo.com/mindmaps/portugues.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYhHjvQvQvQvQvQvQvQvQvQv'
    },
    {
        id: 'fis-1',
        title: 'Física: Mecânica Clássica',
        description: 'Leis de Newton e movimento.',
        iconName: 'Atom',
        category: 'Exatas',
        xp: 650,
        questions: [
            {
                id: 'fis-q1',
                q: 'Qual a unidade de força no SI?',
                a: ['Joule', 'Watt', 'Newton', 'Pascal'],
                correct: 2,
                difficulty: 'easy',
                explanation: 'A unidade de força no Sistema Internacional é o Newton (N), em homenagem a Isaac Newton. 1 N = 1 kg·m/s².',
                videoUrl: 'https://www.youtube.com/watch?v=iuPrkzJp20I'
            },
            {
                id: 'fis-q2',
                q: 'A fórmula F=ma refere-se à:',
                a: ['1ª Lei de Newton', '2ª Lei de Newton', '3ª Lei de Newton', 'Lei da Gravidade'],
                correct: 1,
                difficulty: 'easy',
                explanation: 'F = m·a é a 2ª Lei de Newton (Princípio Fundamental da Dinâmica): força resultante é igual à massa vezes aceleração.',
                videoUrl: 'https://www.youtube.com/watch?v=EvUXk6eu6Ds'
            },
            {
                id: 'fis-q3',
                q: 'Velocidade é a relação entre:',
                a: ['Espaço e Tempo', 'Força e Massa', 'Energia e Trabalho', 'Aceleração e Tempo'],
                correct: 0,
                difficulty: 'medium',
                explanation: 'Velocidade média = variação do espaço / variação do tempo (v = ΔS/Δt). Velocidade instantânea é a derivada do espaço pelo tempo.',
                videoUrl: 'https://www.youtube.com/watch?v=j0gBi-_zorg'
            },
            {
                id: 'fis-q4',
                q: 'A gravidade na Terra é aproximadamente:',
                a: ['9,8 m/s²', '100 m/s²', '1,6 m/s²', '5 m/s²'],
                correct: 0,
                difficulty: 'medium',
                explanation: 'A aceleração da gravidade na superfície terrestre é aproximadamente 9,8 m/s². Varia ligeiramente com altitude e latitude.',
                videoUrl: 'https://www.youtube.com/watch?v=w6sQ1YmyBWg'
            },
            {
                id: 'fis-q5',
                q: 'Energia cinética está ligada ao:',
                a: ['Calor', 'Movimento', 'Som', 'Altura'],
                correct: 1,
                difficulty: 'hard',
                explanation: 'Energia cinética (Ec = ½mv²) é a energia associada ao movimento de um corpo. Quanto maior a velocidade, maior a energia cinética.',
                videoUrl: 'https://www.youtube.com/watch?v=CsJUrbwxrXk'
            }
        ],
        summary: 'Mecânica clássica estuda movimento e forças. Divide-se em: Cinemática (descrição do movimento), Dinâmica (causas do movimento) e Estática (equilíbrio). Leis de Newton: Inércia, Força e Ação-Reação. Conservação de energia e momento.',
        mindMap: 'https://exemplo.com/mindmaps/fisica.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYhHjvQvQvQvQvQvQvQvQvQv'
    },
    {
        id: 'quim-1',
        title: 'Química Geral',
        description: 'Tabela periódica e estequiometria.',
        iconName: 'FlaskConical',
        category: 'Exatas',
        xp: 600,
        questions: [
            {
                id: 'quim-q1',
                q: 'O símbolo do Ferro na tabela periódica é:',
                a: ['Fe', 'F', 'Ir', 'Fr'],
                correct: 0,
                difficulty: 'easy',
                explanation: 'Fe é o símbolo do Ferro (do latim Ferrum). Número atômico 26, metal de transição, essencial para hemoglobina.',
                videoUrl: 'https://www.youtube.com/watch?v=LGkyWvtPc0Y'
            },
            {
                id: 'quim-q2',
                q: 'O pH 2 é considerado:',
                a: ['Neutro', 'Básico', 'Ácido', 'Salino'],
                correct: 2,
                difficulty: 'easy',
                explanation: 'pH < 7 indica solução ácida. Quanto menor o pH, mais ácida a solução. pH 2 é fortemente ácido.',
                videoUrl: 'https://www.youtube.com/watch?v=KvI_WyI4eyk'
            },
            {
                id: 'quim-q3',
                q: 'A água é uma molécula:',
                a: ['Apolar', 'Polar', 'Iônica', 'Metálica'],
                correct: 1,
                difficulty: 'medium',
                explanation: 'A água (H₂O) é polar devido à diferença de eletronegatividade entre oxigênio e hidrogênio, formando um dipolo.',
                videoUrl: 'https://www.youtube.com/watch?v=PReLGctg6uk'
            },
            {
                id: 'quim-q4',
                q: 'O número atômico representa a quantidade de:',
                a: ['Nêutrons', 'Elétrons', 'Prótons', 'Massa'],
                correct: 2,
                difficulty: 'medium',
                explanation: 'Número atômico (Z) = número de prótons no núcleo. Define o elemento químico. Em átomos neutros, também igual a elétrons.',
                videoUrl: 'https://www.youtube.com/watch?v=xRN_e61fLlA'
            },
            {
                id: 'quim-q5',
                q: 'Qual gás é essencial para a combustão?',
                a: ['Nitrogênio', 'Hélio', 'Oxigênio', 'Carbono'],
                correct: 2,
                difficulty: 'hard',
                explanation: 'Oxigênio (O₂) é essencial para a combustão, que é uma reação de oxidação rápida com liberação de calor e luz.',
                videoUrl: 'https://www.youtube.com/watch?v=waes8ToNqWg'
            }
        ],
        summary: 'Química estuda matéria e transformações. Estrutura atômica: prótons, nêutrons, elétrons. Tabela periódica organiza elementos por número atômico e propriedades. Ligações químicas: iônica, covalente, metálica. Reações químicas: síntese, decomposição, combustão.',
        mindMap: 'https://exemplo.com/mindmaps/quimica.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYhHjvQvQvQvQvQvQvQvQvQv'
    },
    {
        id: 'red-1',
        title: 'Redação Nota 1000',
        description: 'Estrutura dissertativa-argumentativa.',
        iconName: 'PenTool',
        category: 'Humanas',
        xp: 700,
        questions: [
            {
                id: 'red-q1',
                q: 'A introdução deve conter:',
                a: ['Argumentação', 'Tese', 'Proposta de Intervenção', 'Agradecimentos'],
                correct: 1,
                difficulty: 'easy',
                explanation: 'A introdução deve apresentar o tema e a tese (posicionamento do autor). É o parágrafo que contextualiza o leitor.',
                videoUrl: 'https://www.youtube.com/watch?v=VSLq5EhIdjk'
            },
            {
                id: 'red-q2',
                q: 'Quantos parágrafos de desenvolvimento são ideais?',
                a: ['1', '2', '4', 'Nenhum'],
                correct: 1,
                difficulty: 'easy',
                explanation: 'O ideal são 2 parágrafos de desenvolvimento, cada um com um argumento diferente, sustentando a tese apresentada.',
                videoUrl: 'https://www.youtube.com/watch?v=UcWul9zMlr4'
            },
            {
                id: 'red-q3',
                q: 'A conclusão do ENEM exige:',
                a: ['Resumo', 'Proposta de Intervenção', 'Nova Tese', 'Citação'],
                correct: 1,
                difficulty: 'medium',
                explanation: 'A conclusão da redação do ENEM deve conter proposta de intervenção para o problema, detalhada (agente, ação, meio, finalidade).',
                videoUrl: 'https://www.youtube.com/watch?v=WbAEO5OP94I'
            },
            {
                id: 'red-q4',
                q: 'O texto deve ser escrito em:',
                a: ['1ª Pessoa', '3ª Pessoa', 'Versos', 'Diálogo'],
                correct: 1,
                difficulty: 'medium',
                explanation: 'A redação dissertativa-argumentativa deve ser escrita em 3ª pessoa, mantendo impessoalidade e objetividade.',
                videoUrl: 'https://www.youtube.com/watch?v=UAOYW27Gy40'
            },
            {
                id: 'red-q5',
                q: 'Qual competência avalia a gramática?',
                a: ['Competência 1', 'Competência 5', 'Competência 3', 'Competência 2'],
                correct: 0,
                difficulty: 'hard',
                explanation: 'Competência 1 do ENEM avalia: "Demonstrar domínio da norma padrão da língua escrita" - gramática, ortografia, pontuação.',
                videoUrl: 'https://www.youtube.com/watch?v=NPQhmWOrfC8'
            }
        ],
        summary: 'Redação ENEM: estrutura dissertativa-argumentativa com 4-5 parágrafos. Competências: 1) norma culta, 2) compreensão da proposta, 3) argumentação, 4) coesão, 5) proposta de intervenção. Evitar: fugir do tema, cópia de textos, menos de 7 linhas.',
        mindMap: 'https://exemplo.com/mindmaps/redacao.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYhHjvQvQvQvQvQvQvQvQvQv'
    },
    {
        id: 'geo-1',
        title: 'Geografia: Brasil e Mundo',
        description: 'Geografia física e humana contemporânea.',
        iconName: 'Globe',
        category: 'Humanas',
        xp: 550,
        questions: [
            {
                id: 'geo-q1',
                q: 'Qual é o maior bioma brasileiro?',
                a: ['Mata Atlântica', 'Cerrado', 'Amazônia', 'Caatinga'],
                correct: 2,
                difficulty: 'easy',
                explanation: 'A Amazônia é o maior bioma brasileiro e do mundo, cobrindo cerca de 49% do território nacional.',
                videoUrl: 'https://www.youtube.com/watch?v=vg9-DLSuo7Q'
            },
            {
                id: 'geo-q2',
                q: 'O que é urbanização?',
                a: ['Crescimento das cidades', 'Industrialização', 'Agricultura familiar', 'Exportação'],
                correct: 0,
                difficulty: 'easy',
                explanation: 'Urbanização é o aumento da população urbana em relação à rural. No Brasil, acelerou-se a partir dos anos 1950.',
                videoUrl: 'https://www.youtube.com/watch?v=v15_Y7oQ9K8'
            },
            {
                id: 'geo-q3',
                q: 'Qual destes é um país desenvolvido?',
                a: ['Brasil', 'Índia', 'Japão', 'Nigéria'],
                correct: 2,
                difficulty: 'medium',
                explanation: 'Japão é país desenvolvido (alto IDH, economia avançada). Brasil, Índia e Nigéria são países em desenvolvimento.',
                videoUrl: 'https://www.youtube.com/watch?v=4AKlpSEipao'
            },
            {
                id: 'geo-q4',
                q: 'O que significa IDH?',
                a: ['Índice de Desenvolvimento Humano', 'Índice de Desigualdade Horizontal', 'Indicador Demográfico Humano', 'Índice de Desenvolvimento Habitacional'],
                correct: 0,
                difficulty: 'medium',
                explanation: 'IDH mede desenvolvimento humano com base em: expectativa de vida, educação e renda. Varia de 0 a 1.',
                videoUrl: 'https://www.youtube.com/watch?v=ExNdYuvSwGs'
            },
            {
                id: 'geo-q5',
                q: 'Qual destes é um recurso não-renovável?',
                a: ['Energia solar', 'Petróleo', 'Energia eólica', 'Biomassa'],
                correct: 1,
                difficulty: 'hard',
                explanation: 'Petróleo é recurso não-renovável (fóssil). Solar, eólica e biomassa são renováveis.',
                videoUrl: 'https://www.youtube.com/watch?v=cRjzgOMvprI'
            }
        ],
        summary: 'Geografia divide-se em física (relevo, clima, vegetação) e humana (população, economia, urbanização). Conceitos-chave: globalização, desenvolvimento sustentável, geopolítica, regionalização.',
        mindMap: 'https://exemplo.com/mindmaps/geografia.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYhHjvQvQvQvQvQvQvQvQvQv'
    },
    {
        id: 'filo-1',
        title: 'Filosofia e Sociologia',
        description: 'Pensamento crítico e sociedade.',
        iconName: 'Brain',
        category: 'Humanas',
        xp: 500,
        questions: [
            {
                id: 'filo-q1',
                q: 'Quem disse "Penso, logo existo"?',
                a: ['Sócrates', 'Platão', 'Descartes', 'Kant'],
                correct: 2,
                difficulty: 'easy',
                explanation: '"Cogito, ergo sum" (Penso, logo existo) é de René Descartes, base do racionalismo no século XVII.',
                videoUrl: 'https://www.youtube.com/watch?v=clx1m-3Gwpc'
            },
            {
                id: 'filo-q2',
                q: 'O que é alienação para Marx?',
                a: ['Loucura', 'Perda de identidade', 'Separação do produto do trabalho', 'Meditação'],
                correct: 2,
                difficulty: 'medium',
                explanation: 'Para Marx, alienação é a separação do trabalhador do produto de seu trabalho no sistema capitalista.',
                videoUrl: 'https://www.youtube.com/watch?v=TOkHZNEpFTk'
            },
            {
                id: 'filo-q3',
                q: 'Quem é considerado pai da sociologia?',
                a: ['Durkheim', 'Weber', 'Marx', 'Comte'],
                correct: 3,
                difficulty: 'medium',
                explanation: 'Auguste Comte é considerado pai da sociologia, criou o termo e propôs o positivismo.',
                videoUrl: 'https://www.youtube.com/watch?v=guFIILCxsVg'
            },
            {
                id: 'filo-q4',
                q: 'O que é Estado Laico?',
                a: ['Sem religião oficial', 'Ateu', 'Com várias religiões', 'Teocrático'],
                correct: 0,
                difficulty: 'hard',
                explanation: 'Estado laico é neutro em relação à religião, não adota religião oficial e garante liberdade religiosa.',
                videoUrl: 'https://www.youtube.com/watch?v=Nexa8DtttnE'
            },
            {
                id: 'filo-q5',
                q: 'Qual destes é um direito humano fundamental?',
                a: ['Direito à propriedade', 'Direito à educação', 'Direito ao luxo', 'Direito à fama'],
                correct: 1,
                difficulty: 'hard',
                explanation: 'Direito à educação é um direito humano fundamental (Declaração Universal dos Direitos Humanos, artigo 26).',
                videoUrl: 'https://www.youtube.com/watch?v=A34mxyfrV7M'
            }
        ],
        summary: 'Filosofia investiga questões fundamentais sobre existência, conhecimento, valores. Sociologia estuda sociedade, instituições, relações sociais. Pensadores importantes: Sócrates, Platão, Aristóteles, Descartes, Kant, Marx, Durkheim, Weber.',
        mindMap: 'https://exemplo.com/mindmaps/filosofia-sociologia.png',
        videoPlaylist: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYhHjvQvQvQvQvQvQvQvQvQv'
    },
    {
        id: 'ing-1',
        title: 'Língua Inglesa',
        description: 'Interpretação de textos em inglês.',
        iconName: 'Languages',
        category: 'Linguagens',
        xp: 450,
        questions: [
            {
                id: 'ing-q1',
                q: 'What does "environment" mean?',
                a: ['Escola', 'Ambiente', 'Transporte', 'Alimento'],
                correct: 1,
                difficulty: 'easy',
                explanation: '"Environment" significa ambiente, em português. Contextos: environmental issues (questões ambientais).',
                videoUrl: 'https://www.youtube.com/watch?v=xKcsBuhJ5R0'
            },
            {
                id: 'ing-q2',
                q: 'Choose the correct: "She _____ to school every day."',
                a: ['go', 'goes', 'going', 'went'],
                correct: 1,
                difficulty: 'easy',
                explanation: 'Presente simples com she/he/it: verb + s. "She goes to school every day." (rotina)',
                videoUrl: 'https://www.youtube.com/watch?v=-h0owEpgVeI'
            },
            {
                id: 'ing-q3',
                q: '"Sustainable development" refers to:',
                a: ['Fast growth', 'Development that lasts', 'Industrial growth', 'Technology'],
                correct: 1,
                difficulty: 'medium',
                explanation: 'Sustainable development = desenvolvimento sustentável, que atende necessidades presentes sem comprometer futuras.',
                videoUrl: 'https://www.youtube.com/watch?v=7V8oFI4GYMY'
            },
            {
                id: 'ing-q4',
                q: 'What is the past of "see"?',
                a: ['seed', 'saw', 'seen', 'seeing'],
                correct: 1,
                difficulty: 'medium',
                explanation: 'Verbo irregular: see - saw - seen. "I saw a movie yesterday." (simple past)',
                videoUrl: 'https://www.youtube.com/watch?v=PF3E4ngRo8Y'
            }
        ]
    }
];