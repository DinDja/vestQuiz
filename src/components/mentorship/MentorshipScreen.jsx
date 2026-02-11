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
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, setDoc, deleteDoc } from 'firebase/firestore';
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

  const subjects = ['Matemática', 'Geografia', 'História', 'Biologia', 'Linguagens', 'Sociologia', 'Filosofia', 'Teologia', 'Religião Iorubá'];

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

  // Carregar minhas sessões de mentoria (busca onde o usuário é student OU mentor)
  useEffect(() => {
    if (tab !== 'my-sessions' || !auth.currentUser) return;

    const uid = auth.currentUser.uid;
    const qStudent = query(collection(db, 'mentorshipSessions'), where('studentId', '==', uid));
    const qMentor = query(collection(db, 'mentorshipSessions'), where('mentorId', '==', uid));

    let sessionsStudent = [];
    let sessionsMentor = [];

    const getTime = (s) => {
      const t = s.lastMessageAt || s.startedAt;
      if (!t) return 0;
      if (typeof t.toDate === 'function') return t.toDate().getTime();
      if (t._seconds) return t._seconds * 1000;
      return new Date(t).getTime?.() || 0;
    };

    const mergeAndSet = () => {
      const map = new Map();
      sessionsStudent.concat(sessionsMentor).forEach(s => map.set(s.id, s));
      const merged = Array.from(map.values()).sort((a, b) => getTime(b) - getTime(a));
      setMySessions(merged);
    };

    const unsubS = onSnapshot(qStudent, (snap) => {
      sessionsStudent = snap.docs.map(d => ({ id: d.id, ...d.data(), _role: 'student' }));
      mergeAndSet();
    });

    const unsubM = onSnapshot(qMentor, (snap) => {
      sessionsMentor = snap.docs.map(d => ({ id: d.id, ...d.data(), _role: 'mentor' }));
      mergeAndSet();
    });

    return () => {
      unsubS();
      unsubM();
    };
  }, [tab]);

  // Carregar mensagens da sessão selecionada (escuta ambas variantes de sessionId e faz merge)
  // Também tenta recriar o documento de sessão canônica quando o estudante abre o chat —
  // se o mentor havia apagado o documento, o estudante recria a sessão; se o usuário
  // for mentor a tentativa será rejeitada pelo security rules e ignorada.
  useEffect(() => {
    if (!selectedMentor || !auth.currentUser) return;

    const studentId = auth.currentUser.uid;
    const mentorId = selectedMentor.uid;
    const sessionA = `${studentId}-${mentorId}`; // canonical (studentId-mentorId)
    const sessionB = `${mentorId}-${studentId}`; // possible inverted

    const getMsgTime = (m) => {
      if (!m.timestamp) return 0;
      if (typeof m.timestamp.toDate === 'function') return m.timestamp.toDate().getTime();
      if (m.timestamp._seconds) return m.timestamp._seconds * 1000;
      return 0;
    };

    const qA = query(collection(db, 'mentorshipChats', sessionA, 'messages'));
    const qB = query(collection(db, 'mentorshipChats', sessionB, 'messages'));

    let latestA = [];
    let latestB = [];

    const mergeAndSet = () => {
      const map = new Map();
      latestA.concat(latestB).forEach(m => map.set(m.id, m));
      const merged = Array.from(map.values()).sort((a, b) => getMsgTime(a) - getMsgTime(b));
      setMessages(merged);
    };

    const unsubA = onSnapshot(qA, (snapshot) => {
      latestA = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      mergeAndSet();
    });

    const unsubB = onSnapshot(qB, (snapshot) => {
      latestB = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      mergeAndSet();
    });

    // Tenta recriar/upsert o documento de sessão canônica — permitido somente quando
    // o currentUser é o estudante (rules exigem studentId == request.auth.uid).
    (async () => {
      try {
        await setDoc(doc(db, 'mentorshipSessions', sessionA), {
          sessionId: sessionA,
          studentId: studentId,
          studentName: userData.displayName,
          mentorId: mentorId,
          mentorName: selectedMentor.displayName,
          lastMessageAt: serverTimestamp(),
          status: 'active'
        }, { merge: true });
      } catch (err) {
        // Se o usuário for mentor a gravação será negada pelas rules — ignoramos.
        // Mantemos as subscriptions de mensagens para continuar mostrando chat.
        // eslint-disable-next-line no-console
        console.debug('upsert mentorshipSessions (ignored if not student):', err?.code || err?.message || err);
      }
    })();

    return () => {
      unsubA();
      unsubB();
    };
  }, [selectedMentor]);

  const handleSelectMentor = async (mentor) => {
    // marca selectedMentor com informações da sessão canônica (usuário atual é estudante)
    const studentId = auth.currentUser?.uid;
    const mentorId = mentor.uid;
    const sessionId = `${studentId}-${mentorId}`;

    setSelectedMentor({ uid: mentor.uid, displayName: mentor.displayName, sessionId, isStudent: true });

    // Criar/upsert sessão de mentoria (usa ID canônico studentId-mentorId)
    try {
      const sessionRef = doc(db, 'mentorshipSessions', sessionId);
      await setDoc(sessionRef, {
        sessionId,
        studentId,
        studentName: userData.displayName,
        mentorId,
        mentorName: mentor.displayName,
        subject: 'Geral',
        startedAt: serverTimestamp(),
        lastMessageAt: serverTimestamp(),
        status: 'active'
      }, { merge: true });
    } catch (error) {
      console.error('Erro ao criar sessão:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedMentor || !auth.currentUser) return;

    try {
      const studentId = auth.currentUser.uid;
      const mentorId = selectedMentor.uid;
      const sessionA = `${studentId}-${mentorId}`;
      const sessionB = `${mentorId}-${studentId}`;

      const payload = {
        senderId: studentId,
        senderName: userData.displayName,
        senderPhoto: userData.photoURL,
        text: messageText,
        timestamp: serverTimestamp(),
        readBy: [studentId]
      };

      const refA = collection(db, 'mentorshipChats', sessionA, 'messages');
      const refB = collection(db, 'mentorshipChats', sessionB, 'messages');

      // grava em ambas paths para garantir visibilidade caso o outro usuário use a ordem invertida
      await Promise.allSettled([addDoc(refA, payload), addDoc(refB, payload)]);

      // atualiza/garante sessão canônica tenha última interação
      await setDoc(doc(db, 'mentorshipSessions', sessionA), {
        lastMessageAt: serverTimestamp(),
        status: 'active'
      }, { merge: true });

      setMessageText('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  // Deleta a sessão canônica (apenas estudante, regras Firestore aplicam)
  const deleteSession = async (sessionId) => {
    if (!sessionId || !auth.currentUser) return;

    const confirm = window.confirm('Confirma excluir esta sessão? As mensagens não serão exibidas na lista após a exclusão.');
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'mentorshipSessions', sessionId));
      setMySessions(prev => prev.filter(s => s.id !== sessionId));

      // se a sessão aberta for a mesma, fecha o chat
      if (selectedMentor?.sessionId === sessionId) {
        setSelectedMentor(null);
        setMessages([]);
      }
    } catch (err) {
      console.error('Erro ao excluir sessão:', err);
      alert('Não foi possível excluir a sessão. Tente novamente.');
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
            <div className="p-4 space-y-3" style={{maxHeight: "690px"}}>
              {mySessions.length === 0 ? (
                <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Você ainda não tem sessões de mentoria</p>
                </div>
              ) : (
                mySessions.map(session => {
                  const isMentor = session.mentorId === auth.currentUser?.uid;
                  const isStudent = session.studentId === auth.currentUser?.uid;
                  const otherId = isMentor ? session.studentId : session.mentorId;
                  const otherName = isMentor ? session.studentName : session.mentorName;

                  return (
                    <motion.button
                      key={session.id}
                      onClick={() => setSelectedMentor({ uid: otherId, displayName: otherName, sessionId: session.id, isMentor, isStudent })}
                      whileHover={{ scale: 1.02 }}
                      className={`w-full p-4 rounded-xl text-left ${cardBg} hover:border-blue-600/50`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-bold ${textColor}`}>{otherName}</h3>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {session.subject}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded bg-blue-600/20 text-blue-400">
                            {session.status === 'active' ? '🟢 Ativa' : '⚪ Inativa'}{isMentor ? ' • Você (mentor)' : ''}
                          </span>

                          {isStudent && (
                            <button
                              onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                              className={`p-2 rounded-md text-sm text-red-500 hover:bg-red-50 transition ${isDark ? 'hover:bg-red-900/20' : ''}`}
                              aria-label="Excluir sessão"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })
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
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedMentor?.isMentor ? 'Aluno' : selectedMentor?.isStudent ? 'Mentor' : 'Usuário'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {selectedMentor?.sessionId && (selectedMentor?.isStudent || selectedMentor?.isMentor) && (
                  <button
                    onClick={() => deleteSession(selectedMentor.sessionId)}
                    className={`p-2 rounded-md text-sm text-red-500 hover:bg-red-50 transition ${isDark ? 'hover:bg-red-900/20' : ''}`}
                    aria-label="Excluir sessão"
                  >
                    <X size={16} />
                  </button>
                )}

                <Clock size={20} className={isDark ? 'text-gray-600' : 'text-gray-400'} />
              </div>
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
