import { CheckCircle2, AlertCircle, Circle } from 'lucide-react';

export const QuestionCard = ({ 
  option, 
  idx, 
  isDark, 
  status, // 'correct' | 'error' | null
  onClick, 
  isDisabled 
}) => {
  
  const getStyles = () => {
    // Acerto (Tesouro encontrado)
    if (status === 'correct') {
      return {
        container: 'bg-emerald-500/10 border-emerald-500 text-emerald-500',
        span: 'bg-emerald-500 text-white',
        icon: <CheckCircle2 size={20} className="text-emerald-500" />
      };
    }
    
    // Erro (Bomba)
    if (status === 'error' || status === 'wrong') {
      return {
        container: 'bg-rose-500/10 border-rose-500 text-rose-500',
        span: 'bg-rose-500 text-white',
        icon: <AlertCircle size={20} className="text-rose-500" />
      };
    }

    // Estado Padrão (Navegação tranquila)
    return {
      container: isDark
        ? `bg-slate-900 border-slate-800 text-slate-300 ${!isDisabled && 'hover:border-slate-600'}`
        : `bg-white border-slate-200 text-slate-600 ${!isDisabled && 'hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm'}`,
      span: isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400',
      icon: null
    };
  };

  const styles = getStyles();

  // Se estiver desabilitado e NÃO tiver status (não foi o clicado), diminui a opacidade
  const opacityClass = (isDisabled && !status) ? 'opacity-50 grayscale' : 'opacity-100';

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center justify-between group ${styles.container} ${opacityClass}`}
    >
      <div className="flex items-center gap-3">
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${styles.span}`}>
          {String.fromCharCode(65 + idx)}
        </span>
        <span className="leading-relaxed">{option}</span>
      </div>
      
      {/* Ícone de status ou círculo vazio (opcional) */}
      <div className="pl-2">
        {styles.icon}
      </div>
    </button>
  );
};