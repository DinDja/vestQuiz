// src/components/carnival/CarnivalChallenge.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  PartyPopper,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Sparkles,
  RotateCcw,
  Home,
  Music,
  Drum,
  Star,
  Zap
} from 'lucide-react';

// ─── Questões temáticas do Carnaval da Bahia ─────────────────────────────────
const CARNIVAL_QUESTIONS = [
  {
    id: 'carnaval-001',
    q: 'O Carnaval de Salvador é considerado um dos maiores do mundo. Qual trio elétrico é reconhecido como o primeiro a desfilar pelas ruas da cidade, em 1950?',
    a: ['Trio de Dodô e Osmar', 'Trio de Ivete Sangalo', 'Trio de Olodum', 'Trio de Chiclete com Banana'],
    correct: 0,
    explanation: 'Em 1950, Dodô e Osmar adaptaram instrumentos elétricos sobre uma fobica (Ford antigo) e desfilaram pelas ruas de Salvador, criando o conceito do trio elétrico.'
  },
  {
    id: 'carnaval-002',
    q: 'Os blocos afro surgiram em Salvador como forma de afirmação cultural e racial. Qual bloco foi fundado em 1979 e se tornou símbolo mundial da cultura afro-baiana?',
    a: ['Ilê Aiyê', 'Olodum', 'Muzenza', 'Malê Debalê'],
    correct: 1,
    explanation: 'O Olodum, fundado em 1979 no Pelourinho, tornou-se internacionalmente reconhecido pela fusão de ritmos africanos com samba-reggae, tendo colaborado com artistas como Michael Jackson e Paul Simon.'
  },
  {
    id: 'carnaval-003',
    q: 'O axé music é um gênero musical que nasceu em Salvador e se consolidou no Carnaval. Qual destes elementos NÃO é uma influência direta do axé?',
    a: ['Frevo pernambucano', 'Samba-reggae', 'Ijexá', 'Fandango gaúcho'],
    correct: 3,
    explanation: 'O axé music é uma fusão de ritmos afro-baianos (ijexá, samba-reggae), frevo e pop. O fandango é uma manifestação cultural do sul do Brasil sem relação direta com o gênero.'
  },
  {
    id: 'carnaval-004',
    q: 'O bloco afro Ilê Aiyê, fundado em 1974, é o mais antigo bloco afro de Salvador. Qual é o bairro de origem desse bloco?',
    a: ['Pelourinho', 'Liberdade', 'Curuzu', 'Rio Vermelho'],
    correct: 2,
    explanation: 'O Ilê Aiyê nasceu no bairro do Curuzu, na Liberdade, região de forte presença da cultura negra em Salvador. É conhecido como "O Mais Belo dos Belos".'
  },
  {
    id: 'carnaval-005',
    q: 'O Carnaval movimenta significativamente a economia baiana. Sob a perspectiva sociológica, qual conceito melhor descreve a relação entre os "camarotes" e o "pipoca" no Carnaval de Salvador?',
    a: ['Mobilidade social', 'Segregação socioespacial', 'Meritocracia cultural', 'Anomia social'],
    correct: 1,
    explanation: 'A divisão entre espaços pagos (camarotes/abadás) e o público da rua (pipoca) reflete uma segregação socioespacial, onde o acesso é determinado pelo poder aquisitivo, reproduzindo desigualdades estruturais.'
  },
  {
    id: 'carnaval-006',
    q: 'Na tradição do Carnaval de Salvador, o que é a "Lavagem do Bonfim" e qual sua relação com a festa?',
    a: [
      'É o encerramento oficial do Carnaval',
      'É uma festa religiosa sincrética que antecede o Carnaval',
      'É um desfile exclusivo de trios elétricos',
      'É a abertura do Carnaval no Pelourinho'
    ],
    correct: 1,
    explanation: 'A Lavagem do Bonfim é uma celebração sincrética que mistura catolicismo e candomblé, ocorrendo na segunda quinta-feira de janeiro. Embora não faça parte oficialmente do Carnaval, marca o início do ciclo festivo baiano.'
  },
  {
    id: 'carnaval-007',
    q: 'O conceito de "circuito" no Carnaval de Salvador organiza os desfiles em diferentes trajetos. Qual é o circuito mais tradicional?',
    a: ['Barra-Ondina (Dodô)', 'Campo Grande (Osmar)', 'Pelourinho (Batatinha)', 'Itapuã (Caymmi)'],
    correct: 1,
    explanation: 'O Circuito Osmar (Campo Grande) é o mais tradicional do Carnaval de Salvador, percorrendo a Avenida Sete de Setembro e o Campo Grande, com raízes históricas na festa.'
  },
  {
    id: 'carnaval-008',
    q: 'Sob a perspectiva da geografia urbana, qual impacto do Carnaval de Salvador na dinâmica territorial da cidade?',
    a: [
      'Redução permanente do trânsito no centro',
      'Reconfiguração temporária dos fluxos e usos do espaço urbano',
      'Deslocamento definitivo de moradores das áreas centrais',
      'Aumento permanente da área urbanizada'
    ],
    correct: 1,
    explanation: 'O Carnaval provoca uma reconfiguração temporária do espaço urbano: ruas viram circuitos, comércios se adaptam, fluxos de pessoas se alteram e territorialidades são redefinidas durante o período festivo.'
  },
  {
    id: 'carnaval-009',
    q: 'O samba-reggae, ritmo forte no Carnaval de Salvador, resulta da fusão de influências musicais. Qual movimento cultural jamaicano mais influenciou sua criação?',
    a: ['Ska', 'Dancehall', 'Reggae roots', 'Dub'],
    correct: 2,
    explanation: 'O samba-reggae surgiu da fusão do samba com o reggae roots de Bob Marley e outros artistas jamaicanos, criando uma identidade sonora própria ligada à negritude e resistência cultural afro-baiana.'
  },
  {
    id: 'carnaval-010',
    q: 'A filósofa Marilena Chauí discute a "indústria cultural" no Brasil. Como essa perspectiva se aplica ao Carnaval de Salvador contemporâneo?',
    a: [
      'O Carnaval permanece como festa popular autêntica sem interferência comercial',
      'A mercantilização da festa transforma expressões culturais em produto de consumo',
      'A indústria cultural fortaleceu igualmente todas as manifestações carnavalescas',
      'O conceito de indústria cultural não se aplica a festas populares'
    ],
    correct: 1,
    explanation: 'A perspectiva da indústria cultural mostra como o Carnaval de Salvador sofreu um processo de mercantilização, onde blocos, trios e abadás se tornaram produtos de consumo, gerando tensão entre a manifestação cultural popular e os interesses comerciais.'
  }
];

// ─── Componente Principal ────────────────────────────────────────────────────
export const CarnivalChallenge = ({ setView, isDark, userData, updateProgress, unlockBadge }) => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Embaralha as questões uma vez
  const questions = useMemo(() => {
    const shuffled = [...CARNIVAL_QUESTIONS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const currentQ = questions[step];
  const totalQuestions = questions.length;
  const progress = ((step + (finished ? 1 : 0)) / totalQuestions) * 100;

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === currentQ.correct) {
      setScore(prev => prev + 1);
    }
    // Mostra a explicação automaticamente após 600ms
    setTimeout(() => setShowExplanation(true), 600);
  };

  const handleNext = () => {
    if (step + 1 < totalQuestions) {
      setStep(prev => prev + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
      // Se acertou 7+ questões, desbloqueia a conquista e dá XP
      const finalScore = score + (selected === currentQ.correct ? 0 : 0); // score já foi atualizado
      if (finalScore >= 7) {
        unlockBadge('badge-carnaval');
      }
      updateProgress(score * 15, null); // 15 XP por acerto
    }
  };

  const handleRestart = () => {
    setStep(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setFinished(false);
  };

  const getOptionStyle = (idx) => {
    if (selected === null) {
      return isDark
        ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-pink-500/50 hover:bg-pink-500/5'
        : 'bg-white border-slate-200 text-slate-700 hover:border-pink-400 hover:bg-pink-50';
    }
    if (idx === currentQ.correct) {
      return 'bg-emerald-500/15 border-emerald-500 text-emerald-400';
    }
    if (idx === selected && idx !== currentQ.correct) {
      return 'bg-rose-500/15 border-rose-500 text-rose-400';
    }
    return isDark
      ? 'bg-slate-900/50 border-slate-800 text-slate-600 opacity-50'
      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
  };

  // ─── Tela de Resultado ──────────────────────────────────────────────────
  if (finished) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = score >= 7;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 pb-8"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => setView('dashboard')} className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
            <ArrowLeft size={20} className={isDark ? 'text-slate-400' : 'text-slate-500'} />
          </button>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500">Resultado</p>
            <h1 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Desafio de Carnaval
            </h1>
          </div>
        </div>

        {/* Resultado Card */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className={`relative overflow-hidden rounded-3xl p-8 text-center ${
            passed
              ? 'bg-gradient-to-br from-pink-600 via-purple-600 to-yellow-500'
              : isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700' : 'bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300'
          }`}
        >
          {passed && (
            <>
              <Sparkles className="absolute top-4 left-6 text-yellow-300/30 w-8 h-8 animate-pulse" />
              <Sparkles className="absolute bottom-6 right-8 text-pink-300/30 w-6 h-6 animate-pulse" />
              <Star className="absolute top-8 right-12 text-white/10 w-12 h-12 rotate-12" />
            </>
          )}

          <div className="relative z-10 space-y-4">
            <div className="text-6xl mb-2">{passed ? '🎭' : '😢'}</div>
            <h2 className={`text-2xl font-black uppercase tracking-tight ${passed ? 'text-white' : isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {passed ? 'Axé! Você arrasou!' : 'Quase lá, folião!'}
            </h2>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              passed ? 'bg-white/20 text-white' : isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-300 text-slate-600'
            }`}>
              <Trophy size={16} />
              <span className="font-black text-lg">{score}/{totalQuestions}</span>
              <span className="text-sm font-medium">({percentage}%)</span>
            </div>

            <p className={`text-sm ${passed ? 'text-white/80' : isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {passed
                ? 'Conquistou a medalha "Folioso Estudioso"! 🎉'
                : 'Acerte pelo menos 7 questões para desbloquear a conquista. Tente novamente!'}
            </p>

            <div className={`text-xs font-bold ${passed ? 'text-yellow-200' : isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <Zap size={12} className="inline mr-1" />
              +{score * 15} XP ganhos
            </div>
          </div>
        </motion.div>

        {/* Botões */}
        <div className="space-y-3">
          {!passed && (
            <button
              onClick={handleRestart}
              className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg shadow-pink-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              Tentar Novamente
            </button>
          )}
          <button
            onClick={() => setView('dashboard')}
            className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
              isDark
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
          >
            <Home size={16} />
            Voltar ao Início
          </button>
        </div>
      </motion.div>
    );
  }

  // ─── Tela de Questão ────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5 pb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setView('dashboard')} className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
            <ArrowLeft size={20} className={isDark ? 'text-slate-400' : 'text-slate-500'} />
          </button>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500">
              🎭 Desafio Especial
            </p>
            <h1 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Carnaval da Bahia
            </h1>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black ${
          isDark ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' : 'bg-pink-50 text-pink-600 border border-pink-200'
        }`}>
          <Star size={12} />
          {score} pts
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
          <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Questão {step + 1} de {totalQuestions}</span>
          <span className="text-pink-500">{Math.round(progress)}%</span>
        </div>
        <div className={`h-2 w-full rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 rounded-full"
          />
        </div>
      </div>

      {/* Card da Questão */}
      <div className={`rounded-3xl p-5 border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-start gap-3 mb-4">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow">
            <Music size={14} className="text-white" />
          </div>
          <p className={`text-sm font-semibold leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            {currentQ.q}
          </p>
        </div>

        {/* Alternativas */}
        <div className="space-y-2.5">
          {currentQ.a.map((option, idx) => (
            <motion.button
              key={idx}
              whileTap={selected === null ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center gap-3 ${getOptionStyle(idx)}`}
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                selected !== null && idx === currentQ.correct
                  ? 'bg-emerald-500 text-white'
                  : selected === idx && idx !== currentQ.correct
                    ? 'bg-rose-500 text-white'
                    : isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 leading-relaxed">{option}</span>
              {selected !== null && idx === currentQ.correct && <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />}
              {selected === idx && idx !== currentQ.correct && <AlertCircle size={18} className="text-rose-500 flex-shrink-0" />}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Explicação */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`rounded-2xl p-4 border ${
              isDark ? 'bg-purple-500/10 border-purple-500/20' : 'bg-purple-50 border-purple-200'
            }`}
          >
            <div className="flex items-start gap-2">
              <Drum size={16} className="text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className={`text-xs font-black uppercase tracking-widest mb-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  Explicação
                </p>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Avançar */}
      <AnimatePresence>
        {showExplanation && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleNext}
            className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest text-white bg-gradient-to-r from-pink-600 via-purple-600 to-yellow-500 hover:from-pink-500 hover:via-purple-500 hover:to-yellow-400 transition-all shadow-lg shadow-pink-500/20 active:scale-[0.98]"
          >
            {step + 1 < totalQuestions ? 'Próxima Questão' : 'Ver Resultado'}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
