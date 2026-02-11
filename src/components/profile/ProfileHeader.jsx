import { useState } from 'react';
import { Edit3, X, Save, Palette, Upload, Trash2 } from 'lucide-react';
import { EditBackgroundModal } from './EditBackgroundModal';

export const ProfileHeader = ({ 
  userData, 
  isEditing, 
  setIsEditing, 
  editName, 
  setEditName, 
  editBio, 
  setEditBio, 
  handleUpdateProfile, 
  handleUpdateBackground,
  isDark 
}) => {
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Função para separar as classes do gradiente
  const getGradientClasses = (gradientString) => {
    if (!gradientString) return '';
    
    // Exemplo: "from-emerald-600 to-cyan-600" vira "bg-gradient-to-br from-emerald-600 to-cyan-600"
    const gradientParts = gradientString.split(' ');
    if (gradientParts.length === 3 && gradientParts[0] === 'from' && gradientParts[2] === 'to') {
      // Está faltando a classe de direção do gradiente
      return `bg-gradient-to-br ${gradientString}`;
    }
    
    // Se já tiver a direção, usar como está
    return gradientString;
  };

  // Determinar qual tipo de fundo está ativo
  const hasImage = !!userData.coverImage;
  const hasGradient = !!userData.profileGradient && !hasImage;
  const hasSolidColor = !hasImage && !hasGradient;

  // Classes do gradiente (se houver)
  const gradientClasses = hasGradient ? getGradientClasses(userData.profileGradient) : '';

  return (
    <>
      <div className={`relative rounded-3xl overflow-hidden ${isDark ? 'bg-slate-900 border border-slate-800 shadow-2xl' : 'bg-white border border-slate-200 shadow-xl'}`}>
        {/* Header com fundo personalizado */}
        <div className="h-24 relative">
          {/* Background container */}
          <div className="absolute inset-0">
            {/* Imagem de fundo */}
            {hasImage && (
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${userData.coverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            )}
            
            {/* Gradiente */}
            {hasGradient && (
              <div className={`absolute inset-0 ${gradientClasses}`} />
            )}
            
            {/* Cor sólida */}
            {hasSolidColor && (
              <div 
                className="absolute inset-0"
                style={{ backgroundColor: userData.coverColor || '#4f46e5' }}
              />
            )}
            
            {/* Overlay escuro para melhor contraste dos botões */}
            <div className={`absolute inset-0 ${hasImage ? 'bg-black/30' : ''}`} />
          </div>
          
          {/* Botão de editar fundo */}
          <button
            onClick={() => setIsBackgroundModalOpen(true)}
            className="absolute top-4 right-16 p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-xl transition-all shadow-lg border border-white/20 z-10"
            title="Personalizar fundo"
          >
            <Palette size={20} />
          </button>

          {/* Botão de editar perfil */}
          {!isEditing ? (
            <button 
              onClick={() => {
                setEditName(userData.displayName || '');
                setEditBio(userData.bio || '');
                setIsEditing(true);
              }}
              className="absolute top-4 right-4 p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-xl transition-all shadow-lg border border-white/20 z-10"
            >
              <Edit3 size={20} />
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 p-2.5 bg-rose-500/20 hover:bg-rose-500/30 backdrop-blur-md text-rose-200 rounded-xl transition-all shadow-lg border border-rose-500/20 z-10"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="px-6 pb-6 text-center">
          <div className="relative -mt-12 mb-4 inline-block">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl ring-4 ring-slate-950 relative">
              {/* Background do avatar */}
              <div className="absolute inset-0">
                {/* Imagem de fundo do avatar */}
                {hasImage && (
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${userData.coverImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                )}
                
                {/* Gradiente do avatar */}
                {hasGradient && (
                  <div className={`absolute inset-0 ${gradientClasses}`} />
                )}
                
                {/* Cor sólida do avatar */}
                {hasSolidColor && (
                  <div 
                    className="absolute inset-0"
                    style={{ backgroundColor: userData.coverColor || '#4f46e5' }}
                  />
                )}
              </div>
              
              {/* Foto do usuário ou inicial */}
              {userData.photoURL ? (
                <img 
                  src={userData.photoURL} 
                  className="w-full h-full object-cover relative z-10" 
                  alt="Profile" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-4xl font-black text-white uppercase relative z-10">
                  {userData.displayName?.charAt(0) || 'P'}
                </span>
              )}

              {/* UPLOAD (apenas quando editando) */}
              {isEditing && (
                <div className="absolute inset-0 flex items-end justify-end p-2 gap-2 z-20">
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      // validação simples
                      const maxMB = 3;
                      if (file.size > maxMB * 1024 * 1024) {
                        alert(`Imagem muito grande — máximo ${maxMB}MB.`);
                        e.target.value = '';
                        return;
                      }

                      try {
                        setUploadingAvatar(true);
                        const reader = new FileReader();
                        reader.onload = async (ev) => {
                          const dataUrl = ev.target.result;
                          // salva diretamente no user doc (Data URL) — evita mudar Storage
                          await handleUpdateProfile({ photoURL: dataUrl });
                        };
                        reader.readAsDataURL(file);
                      } catch (err) {
                        console.error('Erro ao fazer upload do avatar:', err);
                        alert('Não foi possível enviar a imagem. Tente novamente.');
                      } finally {
                        setUploadingAvatar(false);
                        e.target.value = '';
                      }
                    }}
                  />

                  <label
                    htmlFor="avatar-upload"
                    className={`p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-xl transition-all shadow-lg border border-white/20 flex items-center justify-center ${uploadingAvatar ? 'opacity-60 pointer-events-none' : ''}`}
                    title="Alterar foto"
                  >
                    <Upload size={16} />
                  </label>

                  {userData.photoURL && (
                    <button
                      onClick={async () => {
                        if (!confirm('Remover foto do perfil?')) return;
                        try {
                          setUploadingAvatar(true);
                          await handleUpdateProfile({ photoURL: '' });
                        } catch (err) {
                          console.error('Erro ao remover avatar:', err);
                          alert('Não foi possível remover a foto.');
                        } finally {
                          setUploadingAvatar(false);
                        }
                      }}
                      className="p-2 bg-rose-500/20 hover:bg-rose-500/30 backdrop-blur-md text-rose-200 rounded-xl transition-all shadow-lg border border-rose-500/20"
                      title="Remover foto"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4 max-w-xs mx-auto">
              <div className="text-left">
                <label className="text-[10px] font-black uppercase text-indigo-400 ml-1 tracking-widest">
                  Alcunha do Pirata
                </label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-sm font-bold transition-all outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                />
              </div>
              <div className="text-left">
                <label className="text-[10px] font-black uppercase text-indigo-400 ml-1 tracking-widest">
                  O seu Sonho (Bio)
                </label>
                <textarea 
                  value={editBio}
                  rows={2}
                  onChange={(e) => setEditBio(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                />
              </div>
              <button 
                onClick={() => {
                  handleUpdateProfile({ displayName: editName, bio: editBio });
                  setIsEditing(false);
                }}
                className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Save size={16} /> Salvar no Log
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <h1 className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {userData.displayName || 'Pirata'}
              </h1>
              <p className="text-slate-500 text-xs font-bold leading-relaxed px-4 line-clamp-2 italic">
                "{userData.bio || 'Em busca da aprovação!'}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de edição de fundo */}
      <EditBackgroundModal
        isOpen={isBackgroundModalOpen}
        onClose={() => setIsBackgroundModalOpen(false)}
        onSave={handleUpdateBackground}
        currentBackground={userData}
        isDark={isDark}
      />
    </>
  );
};