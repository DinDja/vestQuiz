import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MessageCircle,
  UserCheck,
  Star,
  Clock,
  ChevronRight,
  Send,
  X,
  Filter,
  Award
} from 'lucide-react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export const MentorshipScreen = ({
  setView,
  isDark,
  userData
}) => {
  const [tab, setTab] = useState('find-mentor'); // 'find-mentor', 'my-sessions', 'be-mentor'
  const [mentors, setMentors] = useState([]);
  const [mySessions, setMySessions] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterRating, setFilterRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const subjects = ['Matemática', 'Geografia', 'História', 'Biologia', 'Linguagens', 'Sociologia', 'Filosofia'];

  // Carregar mentores disponíveis
  useEffect(() => {
    if (tab !== 'find-mentor') return;
    setIsLoading(true);
    
    const q = query(collection(db, 'users'), where('mentorHelps', '>=', 5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mentorsList = snapshot.docs
        .map(doc => ({ uid: doc.id, ...doc.data() }))
        .filter(m => m.uid !== auth.currentUser?.uid)
        .sort((a, b) => (b.mentorHelps || 0) - (a.mentorHelps || 0));
      setMentors(mentorsList);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [tab]);

  // Carregar minhas sessões de mentoria
  useEffect(() => {
    if (tab !== 'my-sessions' || !auth.currentUser) return;
    
    const q = query(
      collection(db, 'mentorshipSessions'),
      where('studentId', '==', auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMySessions(sessions.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt)));
    });

    return () => unsubscribe();
  }, [tab]);

  // Carregar mensagens da sessão selecionada
  useEffect(() => {
    if (!selectedMentor) return;

    const sessionId = `${auth.currentUser?.uid}-${selectedMentor.uid}`;
    const q = query(collection(db, 'mentorshipChats', sessionId, 'messages'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
    });

    return () => unsubscribe();
  }, [selectedMentor]);

  const handleSelectMentor = async (mentor) => {
    setSelectedMentor(mentor);
    
    // Criar sessão de mentoria
    const sessionId = `${auth.currentUser?.uid}-${mentor.uid}`;
    try {
      const sessionRef = doc(db, 'mentorshipSessions', sessionId);
      await updateDoc(sessionRef, {
        lastMessageAt: serverTimestamp(),
        status: 'active'
      }).catch(async () => {
        await addDoc(collection(db, 'mentorshipSessions'), {
          sessionId,
          studentId: auth.currentUser.uid,
          studentName: userData.displayName,
          mentorId: mentor.uid,
          mentorName: mentor.displayName,
          subject: 'Geral',
          startedAt: serverTimestamp(),
          status: 'active'
        });
      });
    } catch (error) {
      console.error('Erro ao criar sessão:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedMentor) return;

    try {
      const sessionId = `${auth.currentUser?.uid}-${selectedMentor.uid}`;
      const messagesRef = collection(db, 'mentorshipChats', sessionId, 'messages');
      
      await addDoc(messagesRef, {
        senderId: auth.currentUser.uid,
        senderName: userData.displayName,
        senderPhoto: userData.photoURL,
        text: messageText,
        timestamp: serverTimestamp(),
        readBy: [auth.currentUser.uid]
      });

      setMessageText('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const bgColor = isDark ? 'bg-gray-900' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const cardBg = isDark ? 'bg-gray-800' : 'bg-gray-50';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';

  return (
    <motion.div
      key="mentorship"
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
            <h1 className={`text-xl font-bold ${textColor}`}>Mentoria Acadêmica</h1>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Aprenda com a comunidade
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex border-b ${borderColor}`}>
        {[
          { id: 'find-mentor', label: '🔍 Encontrar Mentor', icon: UserCheck },
          { id: 'my-sessions', label: '💬 Minhas Sessões', icon: MessageCircle },
          { id: 'be-mentor', label: '👨‍🏫 Ser Mentor', icon: Award }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-3 px-4 font-semibold text-sm border-b-2 transition ${
              tab === t.id
                ? `border-blue-600 ${isDark ? 'text-white' : 'text-gray-900'} bg-blue-600/10`
                : `border-transparent ${isDark ? 'text-gray-400' : 'text-gray-600'}`
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Lista de Mentores / Sessões */}
        <div className={`w-full md:w-96 overflow-y-auto border-r ${borderColor} ${selectedMentor ? 'hidden md:block' : ''}`}>
          {tab === 'find-mentor' && (
            <div className="p-4 space-y-4">
              {/* Filtros */}
              <div className="space-y-2">
                <label className={`text-xs font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Disciplina
                </label>
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${borderColor} ${cardBg} ${textColor}`}
                >
                  <option value="all">Todas as disciplinas</option>
                  {subjects.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Lista de Mentores */}
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin">⚙️</div>
                </div>
              ) : mentors.length === 0 ? (
                <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <p className="text-sm">Nenhum mentor disponível no momento</p>
                </div>
              ) : (
                mentors.map(mentor => (
                  <motion.button
                    key={mentor.uid}
                    onClick={() => handleSelectMentor(mentor)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl border-2 transition text-left ${
                      selectedMentor?.uid === mentor.uid
                        ? `border-blue-600 ${isDark ? 'bg-blue-600/20' : 'bg-blue-50'}`
                        : `border-transparent ${cardBg} hover:border-blue-600/50`
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {mentor.displayName?.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-sm ${textColor}`}>
                          {mentor.displayName}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {mentor.mentorHelps || 0} ajudas
                          </span>
                        </div>
                        <p className={`text-xs mt-1 line-clamp-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {mentor.bio || 'Mentor dedicado'}
                        </p>
                      </div>
                      <ChevronRight size={16} className={isDark ? 'text-gray-600' : 'text-gray-400'} />
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          )}

          {tab === 'my-sessions' && (
            <div className="p-4 space-y-3">
              {mySessions.length === 0 ? (
                <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Você ainda não tem sessões de mentoria</p>
                </div>
              ) : (
                mySessions.map(session => (
                  <motion.button
                    key={session.id}
                    onClick={() => setSelectedMentor({ uid: session.mentorId, displayName: session.mentorName })}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full p-4 rounded-xl text-left ${cardBg} hover:border-blue-600/50`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-bold ${textColor}`}>{session.mentorName}</h3>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {session.subject}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-blue-600/20 text-blue-400">
                        {session.status === 'active' ? '🟢 Ativa' : '⚪ Inativa'}
                      </span>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          )}

          {tab === 'be-mentor' && (
            <div className="p-4 space-y-4">
              <div className={`rounded-xl p-4 ${isDark ? 'bg-blue-600/20 border border-blue-600/30' : 'bg-blue-50 border border-blue-200'}`}>
                <h3 className={`font-bold mb-2 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                  Seja um Mentor
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Você pode se tornar mentor ajudando outros usuários! Já ajudou {userData.mentorHelps || 0} colegas.
                </p>
                <div className={`text-xs font-bold ${userData.mentorHelps >= 10 ? 'text-emerald-400' : isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {userData.mentorHelps >= 10 ? '✅ Você é um Mentor!' : `${userData.mentorHelps || 0}/10 ajudas para desbloquear`}
                </div>
              </div>

              <div className={`rounded-xl p-4 border ${borderColor}`}>
                <h4 className={`font-bold mb-3 ${textColor}`}>Como ser mentor:</h4>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li>✅ Ajude 10 colegas em discussões</li>
                  <li>✅ Responda perguntas na comunidade</li>
                  <li>✅ Compartilhe dicas e explicações</li>
                  <li>✅ Ganhe a badge de mentor</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Chat de Mentoria */}
        {selectedMentor && (
          <div className={`flex-1 flex flex-col ${selectedMentor ? 'flex' : 'hidden'}`}>
            {/* Header do Chat */}
            <div className={`p-4 border-b ${borderColor} flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedMentor(null)}
                  className={`p-2 rounded-lg md:hidden transition ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  <ArrowLeft size={20} className={textColor} />
                </button>
                <div>
                  <h3 className={`font-bold ${textColor}`}>{selectedMentor.displayName}</h3>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Mentor</p>
                </div>
              </div>
              <Clock size={20} className={isDark ? 'text-gray-600' : 'text-gray-400'} />
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className={`flex items-center justify-center h-full ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <p className="text-sm text-center">
                    Inicie uma conversa com {selectedMentor.displayName}
                  </p>
                </div>
              ) : (
                messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === auth.currentUser?.uid ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.senderId === auth.currentUser?.uid
                          ? 'bg-blue-600 text-white'
                          : `${cardBg} ${textColor}`
                      }`}
                    >
                      <p className={`text-xs font-bold mb-1 opacity-70`}>
                        {msg.senderName}
                      </p>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs opacity-50 mt-1`}>
                        {msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleTimeString('pt-BR') : '...'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input de Mensagem */}
            <div className={`p-4 border-t ${borderColor} flex gap-2`}>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escreva sua dúvida..."
                className={`flex-1 px-4 py-2 rounded-lg border ${borderColor} ${cardBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <motion.button
                onClick={handleSendMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                <Send size={18} />
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
