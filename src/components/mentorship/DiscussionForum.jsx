import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MessageSquare,
  Heart,
  Reply,
  Search,
  Plus,
  X,
  TrendingUp,
  Filter
} from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp, updateDoc, doc, increment } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export const DiscussionForum = ({
  setView,
  isDark,
  userData
}) => {
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [newTopicText, setNewTopicText] = useState('');
  const [newTopicSubject, setNewTopicSubject] = useState('Geral');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const subjects = ['Geral', 'Matemática', 'Geografia', 'História', 'Biologia', 'Linguagens', 'Sociologia', 'Filosofia'];

  // Carregar discussões
  useEffect(() => {
    setIsLoading(true);
    const q = query(
      collection(db, 'discussions'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const discussionList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDiscussions(discussionList);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Carregar respostas da discussão selecionada
  useEffect(() => {
    if (!selectedDiscussion) return;

    const q = query(
      collection(db, 'discussions', selectedDiscussion.id, 'replies'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const repliesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReplies(repliesList);
    });

    return () => unsubscribe();
  }, [selectedDiscussion]);

  const handleCreateTopic = async () => {
    if (!newTopicText.trim()) return;

    try {
      await addDoc(collection(db, 'discussions'), {
        title: newTopicText.substring(0, 100),
        description: newTopicText,
        subject: newTopicSubject,
        authorId: auth.currentUser.uid,
        authorName: userData.displayName,
        authorPhoto: userData.photoURL,
        createdAt: serverTimestamp(),
        views: 0,
        replies: 0,
        likes: 0,
        isPinned: false,
        tags: []
      });

      setNewTopicText('');
      setNewTopicSubject('Geral');
      setShowNewTopic(false);
    } catch (error) {
      console.error('Erro ao criar tópico:', error);
    }
  };

  const handleReply = async () => {
    if (!replyText.trim() || !selectedDiscussion) return;

    try {
      await addDoc(collection(db, 'discussions', selectedDiscussion.id, 'replies'), {
        text: replyText,
        authorId: auth.currentUser.uid,
        authorName: userData.displayName,
        authorPhoto: userData.photoURL,
        createdAt: serverTimestamp(),
        likes: 0,
        helpful: false
      });

      // Incrementar contador de replies
      await updateDoc(doc(db, 'discussions', selectedDiscussion.id), {
        replies: increment(1)
      });

      setReplyText('');
    } catch (error) {
      console.error('Erro ao responder:', error);
    }
  };

  const handleLikeDiscussion = async () => {
    if (!selectedDiscussion) return;

    try {
      await updateDoc(doc(db, 'discussions', selectedDiscussion.id), {
        likes: increment(1)
      });

      setSelectedDiscussion(prev => prev ? { ...prev, likes: (prev.likes || 0) + 1 } : null);
    } catch (error) {
      console.error('Erro ao gostar:', error);
    }
  };

  const filteredDiscussions = discussions.filter(d => {
    const matchesSearch = d.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         d.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === 'all' || d.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const bgColor = isDark ? 'bg-gray-900' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const cardBg = isDark ? 'bg-gray-800' : 'bg-gray-50';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';

  return (
    <motion.div
      key="discussion"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className={`fixed inset-0 ${bgColor} overflow-hidden`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${borderColor}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('dashboard')}
            className={`p-2 rounded-lg transition ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <ArrowLeft size={20} className={textColor} />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${textColor}`}>Fórum de Discussão</h1>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Compartilhe dúvidas e conhecimentos
            </p>
          </div>
        </div>
        <motion.button
          onClick={() => setShowNewTopic(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          title="Novo tópico"
        >
          <Plus size={20} />
        </motion.button>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Lista de Discussões */}
        <div className={`w-full md:w-96 overflow-y-auto border-r ${borderColor} ${selectedDiscussion ? 'hidden md:flex md:flex-col' : 'flex flex-col'}`}>
          {/* Busca e Filtros */}
          <div className="p-4 space-y-3 border-b border-gray-700 flex-shrink-0">
            <div className={`relative flex items-center px-3 py-2 rounded-lg border ${borderColor} ${cardBg}`}>
              <Search size={16} className={isDark ? 'text-gray-600' : 'text-gray-400'} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar discussões..."
                className={`flex-1 ml-2 bg-transparent outline-none ${textColor} placeholder-gray-500`}
              />
            </div>

            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${borderColor} ${cardBg} ${textColor} text-sm`}
            >
              <option value="all">Todas disciplinas</option>
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Discussões */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin">⚙️</div>
              </div>
            ) : filteredDiscussions.length === 0 ? (
              <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhuma discussão encontrada</p>
              </div>
            ) : (
              filteredDiscussions.map(discussion => (
                <motion.button
                  key={discussion.id}
                  onClick={() => setSelectedDiscussion(discussion)}
                  whileHover={{ scale: 1.02 }}
                  className={`w-full p-4 rounded-xl text-left border-2 transition ${
                    selectedDiscussion?.id === discussion.id
                      ? `border-blue-600 ${isDark ? 'bg-blue-600/20' : 'bg-blue-50'}`
                      : `border-transparent ${cardBg}`
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-sm line-clamp-2 ${textColor}`}>
                        {discussion.title}
                      </h3>
                    </div>
                    {discussion.isPinned && <span className="ml-2">📌</span>}
                  </div>

                  <div className="flex items-center gap-2 text-xs mb-2">
                    <span className="px-2 py-1 rounded bg-indigo-600/20 text-indigo-400">
                      {discussion.subject}
                    </span>
                  </div>

                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p className="line-clamp-1 mb-2">{discussion.description}</p>
                    <div className="flex justify-between items-center">
                      <span>{discussion.authorName}</span>
                      <div className="flex gap-3">
                        <span className="flex items-center gap-1">
                          <MessageSquare size={12} />
                          {discussion.replies || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={12} />
                          {discussion.likes || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))
            )}
          </div>
        </div>

        {/* Detalhe da Discussão */}
        {selectedDiscussion && (
          <div className={`flex-1 flex flex-col ${selectedDiscussion ? 'flex' : 'hidden'}`}>
            {/* Header */}
            <div className={`p-4 border-b ${borderColor} flex-shrink-0`}>
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => setSelectedDiscussion(null)}
                  className={`p-2 rounded-lg md:hidden transition ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  <ArrowLeft size={20} className={textColor} />
                </button>
                <div className="flex gap-2">
                  <motion.button
                    onClick={handleLikeDiscussion}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-lg transition ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                  >
                    <Heart size={20} className={selectedDiscussion.liked ? 'fill-red-500 text-red-500' : textColor} />
                  </motion.button>
                </div>
              </div>

              <h2 className={`text-lg font-bold ${textColor}`}>
                {selectedDiscussion.title}
              </h2>
              <div className={`flex items-center gap-2 mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span>{selectedDiscussion.authorName}</span>
                <span>•</span>
                <span className="px-2 py-1 rounded bg-indigo-600/20 text-indigo-400">
                  {selectedDiscussion.subject}
                </span>
              </div>
            </div>

            {/* Conteúdo Original */}
            <div className={`p-4 border-b ${borderColor}`}>
              <p className={textColor}>{selectedDiscussion.description}</p>
            </div>

            {/* Respostas */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {replies.length === 0 ? (
                <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <p className="text-sm">Nenhuma resposta ainda. Seja o primeiro!</p>
                </div>
              ) : (
                replies.map(reply => (
                  <div
                    key={reply.id}
                    className={`p-3 rounded-lg ${cardBg}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-sm font-bold ${textColor}`}>
                        {reply.authorName}
                      </span>
                      {reply.helpful && <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded">✓ Útil</span>}
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {reply.text}
                    </p>
                    <div className={`flex justify-between items-center mt-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      <span>
                        {reply.createdAt ? new Date(reply.createdAt.toDate()).toLocaleDateString('pt-BR') : '...'}
                      </span>
                      <button className="flex items-center gap-1 hover:text-red-500 transition">
                        <Heart size={14} />
                        {reply.likes || 0}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input de Resposta */}
            <div className={`p-4 border-t ${borderColor} flex-shrink-0`}>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escreva sua resposta..."
                rows="3"
                className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${cardBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
              />
              <motion.button
                onClick={handleReply}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Responder
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Novo Tópico */}
      <AnimatePresence>
        {showNewTopic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`w-full max-w-2xl rounded-lg shadow-2xl ${bgColor} p-6`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${textColor}`}>Novo Tópico</h2>
                <button
                  onClick={() => setShowNewTopic(false)}
                  className={`p-1 rounded transition ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  <X size={20} className={textColor} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-bold mb-2 ${textColor}`}>
                    Disciplina
                  </label>
                  <select
                    value={newTopicSubject}
                    onChange={(e) => setNewTopicSubject(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${cardBg} ${textColor}`}
                  >
                    {subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${textColor}`}>
                    Sua Dúvida ou Discussão
                  </label>
                  <textarea
                    value={newTopicText}
                    onChange={(e) => setNewTopicText(e.target.value)}
                    placeholder="Escreva sua dúvida detalhadamente..."
                    rows="5"
                    className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${cardBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                  />
                </div>

                <div className="flex gap-2">
                  <motion.button
                    onClick={handleCreateTopic}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                  >
                    Criar Tópico
                  </motion.button>
                  <motion.button
                    onClick={() => setShowNewTopic(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 px-4 py-2 rounded-lg border ${borderColor} ${textColor} font-bold transition`}
                  >
                    Cancelar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
