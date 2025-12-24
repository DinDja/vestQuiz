import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Image, Palette, Check, Upload, Trash2 } from 'lucide-react';

const GRADIENTS = [
    { id: 'indigo', value: 'bg-gradient-to-br from-indigo-600 to-purple-600', name: 'Índigo', color1: '#4f46e5', color2: '#9333ea' },
    { id: 'emerald', value: 'bg-gradient-to-br from-emerald-600 to-cyan-600', name: 'Esmeralda', color1: '#059669', color2: '#0891b2' },
    { id: 'rose', value: 'bg-gradient-to-br from-rose-600 to-pink-600', name: 'Rosa', color1: '#e11d48', color2: '#db2777' },
    { id: 'amber', value: 'bg-gradient-to-br from-amber-600 to-orange-600', name: 'Âmbar', color1: '#d97706', color2: '#ea580c' },
    { id: 'cyan', value: 'bg-gradient-to-br from-cyan-600 to-blue-600', name: 'Ciano', color1: '#0891b2', color2: '#2563eb' },
    { id: 'purple', value: 'bg-gradient-to-br from-purple-600 to-indigo-600', name: 'Roxo', color1: '#9333ea', color2: '#4f46e5' },
    { id: 'teal', value: 'bg-gradient-to-br from-teal-600 to-emerald-600', name: 'Verde-azulado', color1: '#0d9488', color2: '#059669' },
    { id: 'fuchsia', value: 'bg-gradient-to-br from-fuchsia-600 to-purple-600', name: 'Fúcsia', color1: '#c026d3', color2: '#9333ea' },
];

const SOLID_COLORS = [
    { id: 'indigo', value: '#4f46e5', name: 'Índigo' },
    { id: 'emerald', value: '#059669', name: 'Esmeralda' },
    { id: 'rose', value: '#e11d48', name: 'Rosa' },
    { id: 'amber', value: '#d97706', name: 'Âmbar' },
    { id: 'cyan', value: '#0891b2', name: 'Ciano' },
    { id: 'purple', value: '#9333ea', name: 'Roxo' },
    { id: 'slate', value: '#475569', name: 'Ardósia' },
    { id: 'stone', value: '#78716c', name: 'Pedra' },
];

export const EditBackgroundModal = ({ isOpen, onClose, onSave, currentBackground, isDark }) => {
    const [selectedTab, setSelectedTab] = useState('gradient'); // 'gradient', 'solid', 'image'
    const [selectedGradient, setSelectedGradient] = useState(currentBackground?.profileGradient || GRADIENTS[0].value);
    const [selectedColor, setSelectedColor] = useState(currentBackground?.coverColor || SOLID_COLORS[0].value);
    const [imageUrl, setImageUrl] = useState(currentBackground?.coverImage || '');
    const [customColor, setCustomColor] = useState('#4f46e5');

    if (!isOpen) return null;

    const handleSave = () => {
        let backgroundData = {};

        if (selectedTab === 'gradient') {
            const gradient = GRADIENTS.find(g => g.value === selectedGradient);
            backgroundData = {
                profileGradient: selectedGradient,
                coverColor: gradient?.color1 || '#4f46e5',
                coverImage: ''
            };
        } else if (selectedTab === 'solid') {
            backgroundData = {
                profileGradient: '', // LIMPAR gradiente quando for cor sólida
                coverColor: selectedColor,
                coverImage: ''
            };
        } else if (selectedTab === 'image') {
            backgroundData = {
                profileGradient: '', // LIMPAR gradiente quando for imagem
                coverColor: '', // LIMPAR cor quando for imagem
                coverImage: imageUrl
            };
        }

        console.log('Salvando fundo:', backgroundData); // Para debug
        onSave(backgroundData);
        onClose();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageUrl(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Função para obter estilos de fundo baseado na tab selecionada
    const getPreviewStyle = () => {
        if (selectedTab === 'image' && imageUrl) {
            return {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            };
        } else if (selectedTab === 'gradient') {
            const gradient = GRADIENTS.find(g => g.value === selectedGradient);
            return {
                background: gradient
                    ? `linear-gradient(135deg, ${gradient.color1}, ${gradient.color2})`
                    : 'linear-gradient(135deg, #4f46e5, #9333ea)'
            };
        } else {
            return {
                backgroundColor: selectedColor
            };
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">Personalizar Perfil</h3>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setSelectedTab('gradient')}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${selectedTab === 'gradient'
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            <Palette size={16} /> Gradiente
                        </button>
                        <button
                            onClick={() => setSelectedTab('solid')}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${selectedTab === 'solid'
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            <Palette size={16} /> Cor Sólida
                        </button>
                        <button
                            onClick={() => setSelectedTab('image')}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${selectedTab === 'image'
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            <Image size={16} /> Imagem
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {/* Preview */}
                    <div
                        className="h-32 rounded-xl mb-6 relative overflow-hidden"
                        style={getPreviewStyle()}
                    >
                        <div className="absolute bottom-4 left-4 text-white text-sm font-medium drop-shadow">
                            Pré-visualização
                        </div>
                    </div>

                    {/* Gradient Selection */}
                    {selectedTab === 'gradient' && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-300">Escolha um Gradiente</h4>
                            <div className="grid grid-cols-4 gap-3">
                                {GRADIENTS.map((gradient) => (
                                    <button
                                        key={gradient.id}
                                        onClick={() => setSelectedGradient(gradient.value)}
                                        className={`aspect-square rounded-xl overflow-hidden relative ${selectedGradient === gradient.value ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''
                                            }`}
                                        style={{
                                            background: `linear-gradient(135deg, ${gradient.color1}, ${gradient.color2})`
                                        }}
                                        title={gradient.name}
                                    >
                                        {selectedGradient === gradient.value && (
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                <Check className="text-white" size={20} />
                                            </div>
                                        )}
                                        <div className="absolute bottom-1 left-1 right-1 text-center">
                                            <span className="text-[10px] font-bold text-white drop-shadow">{gradient.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Solid Color Selection */}
                    {selectedTab === 'solid' && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-300">Escolha uma Cor</h4>
                            <div className="grid grid-cols-8 gap-2">
                                {SOLID_COLORS.map((color) => (
                                    <button
                                        key={color.id}
                                        onClick={() => setSelectedColor(color.value)}
                                        className={`aspect-square rounded-lg ${selectedColor === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''
                                            }`}
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    >
                                        {selectedColor === color.value && (
                                            <Check className="text-white m-auto" size={16} />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Color Picker */}
                            <div className="mt-4">
                                <label className="text-sm font-bold text-slate-300 mb-2 block">Cor Personalizada</label>
                                <div className="flex gap-3">
                                    <input
                                        type="color"
                                        value={customColor}
                                        onChange={(e) => {
                                            setCustomColor(e.target.value);
                                            setSelectedColor(e.target.value);
                                        }}
                                        className="w-12 h-12 cursor-pointer rounded-lg"
                                    />
                                    <input
                                        type="text"
                                        value={selectedColor}
                                        onChange={(e) => setSelectedColor(e.target.value)}
                                        className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                                        placeholder="#4f46e5"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Image Upload */}
                    {selectedTab === 'image' && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-300">Imagem de Fundo</h4>

                            {/* Upload Button */}
                            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center">
                                <Upload className="w-12 h-12 mx-auto text-slate-500 mb-3" />
                                <p className="text-slate-400 mb-4">Arraste uma imagem ou clique para fazer upload</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="background-upload"
                                />
                                <label
                                    htmlFor="background-upload"
                                    className="inline-block px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium cursor-pointer transition-colors"
                                >
                                    Escolher Imagem
                                </label>
                            </div>

                            {/* Image URL Input */}
                            <div className="mt-4">
                                <label className="text-sm font-bold text-slate-300 mb-2 block">Ou insira uma URL</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://exemplo.com/imagem.jpg"
                                        className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                                    />
                                    {imageUrl && (
                                        <button
                                            onClick={() => setImageUrl('')}
                                            className="p-3 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Image Suggestions */}
                            <div className="mt-4">
                                <p className="text-sm text-slate-400 mb-2">Sugestões (URLs públicas):</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600',
                                        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w-600',
                                        'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=600'
                                    ].map((url, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setImageUrl(url)}
                                            className="aspect-video rounded-lg overflow-hidden"
                                        >
                                            <img
                                                src={url}
                                                alt={`Sugestão ${idx + 1}`}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-800 p-6">
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <Check size={18} /> Aplicar
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};