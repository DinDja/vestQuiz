import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Video, Map, Download, 
  PlayCircle, ExternalLink, ChevronDown,
  Bookmark, Share2, CheckCircle2, AlertCircle, Eye
} from 'lucide-react';

export const SubjectDetails = ({ subject, isDark, onClose }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert(`Conteúdo de ${subject.title} baixado para o baú offline!`);
    }, 1500);
  };

  const handleOptionClick = (index, correctAnswerIndex) => {
    setSelectedOption(index);
    if (index === correctAnswerIndex) {
      setShowExplanation(true);
    } else {
      setShowExplanation(false);
    }
  };

  // Helper simples para garantir que o link do YouTube seja embeddable (exemplo básico)
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-x overflow-hidden flex flex-col h-[85vh] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}
    >
      {/* --- CABEÇALHO FIXO --- */}
      <div className={`shrink-0 p-5 pb-2 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="flex justify-center mb-2">
          <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl shadow-sm ${isDark ? 'bg-slate-800 text-indigo-400' : 'bg-slate-100 text-indigo-600'}`}>
              {subject.icon}
            </div>
            <div>
              <h2 className={`text-xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {subject.title}
              </h2>
              <p className="text-xs text-slate-500 font-medium">{subject.category || 'Geral'}</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}
          >
            <ChevronDown size={24} />
          </button>
        </div>

        {/* --- NAVEGAÇÃO HORIZONTAL (SCROLLABLE PILLS) --- */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {[
            { id: 'summary', label: 'Resumo', icon: <BookOpen size={18} /> },
            { id: 'videos', label: 'Aulas', icon: <Video size={18} /> },
            { id: 'mindmap', label: 'Mapa', icon: <Map size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all active:scale-95 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : isDark 
                    ? 'bg-slate-800 text-slate-400 border border-slate-700' 
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- CONTEÚDO ROLÁVEL --- */}
      <div className="flex-1 overflow-y-auto p-5 pb-20 scroll-smooth">
        
        {/* ABA: RESUMO */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
              <h3 className={`font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                <BookOpen size={18} />
                Diário de Bordo
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                {subject.summary || 'Nenhum registro encontrado no Log Pose para esta matéria.'}
              </p>
            </div>
            
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
                isDownloading
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
              }`}
            >
              {isDownloading ? (
                <span className="animate-pulse">Guardando no Baú...</span>
              ) : (
                <>
                  <Download size={20} />
                  Baixar Conteúdo Offline
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button className={`py-3 rounded-xl font-medium flex items-center justify-center gap-2 border active:scale-[0.98] ${
                isDark ? 'border-slate-700 text-slate-300 bg-slate-800' : 'border-slate-200 text-slate-600 bg-white'
              }`}>
                <Bookmark size={18} /> Salvar
              </button>
              <button className={`py-3 rounded-xl font-medium flex items-center justify-center gap-2 border active:scale-[0.98] ${
                isDark ? 'border-slate-700 text-slate-300 bg-slate-800' : 'border-slate-200 text-slate-600 bg-white'
              }`}>
                <Share2 size={18} /> Enviar
              </button>
            </div>
          </div>
        )}

        {/* ABA: VÍDEOS (COM IFRAME) */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Video size={18} className="text-rose-500" />
                Destaque
              </h3>
              
              {/* IFRAME CONTAINER */}
              {subject.videoPlaylist || subject.questions[0]?.videoUrl ? (
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black border border-slate-800 mb-4 relative group">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={getEmbedUrl(subject.videoPlaylist || subject.questions[0]?.videoUrl)}
                    title="Video Player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              ) : (
                <div className="w-full aspect-video rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 mb-4">
                    <span className="text-xs">Sem sinal de vídeo</span>
                </div>
              )}

              <a
                href={subject.videoPlaylist}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-200/50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Abrir no YouTube</span>
                <ExternalLink size={16} />
              </a>
            </div>

            {/* Lista de vídeos menores */}
            <div className="space-y-3">
               <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Trechos Específicos</h4>
               {subject.questions.filter(q => q.videoUrl).map((q, idx) => (
                  <div key={idx} className={`flex gap-3 p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <div className="w-24 h-16 bg-slate-800 rounded-lg shrink-0 overflow-hidden relative">
                         {/* Miniatura fake ou iframe pequeno */}
                         <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                            <PlayCircle size={20} className="text-white opacity-80" />
                         </div>
                         <iframe 
                            src={getEmbedUrl(q.videoUrl)} 
                            className="w-full h-full object-cover pointer-events-none" 
                            tabIndex="-1"
                         />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <span className="text-xs font-bold text-indigo-500 mb-1">Questão {idx + 1}</span>
                          <p className={`text-sm font-medium leading-tight line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            {q.q}
                          </p>
                      </div>
                  </div>
               ))}
            </div>
          </div>
        )}

        {/* ABA: MAPA MENTAL */}
        {activeTab === 'mindmap' && (
             <div className="space-y-4">
               {/* Mantido simples para mobile, foco no visual */}
                <div className={`aspect-square rounded-2xl border flex flex-col items-center justify-center gap-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <Map className="w-20 h-20 text-indigo-400 opacity-50" />
                    <p className="text-slate-500 font-medium">Visualização em Breve</p>
                </div>
                <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">
                    Baixar PDF do Mapa
                </button>
             </div>
        )}
        
      </div>
    </motion.div>
  );
};