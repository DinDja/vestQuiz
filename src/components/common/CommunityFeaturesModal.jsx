import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

export const CommunityFeaturesModal = ({
  isOpen,
  onClose,
  onSubmitQuestion,
  onSubmitFeedback,
  userData
}) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('question');
  const [questionData, setQuestionData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    subject: '',
    difficulty: 'medium'
  });
  const [feedbackData, setFeedbackData] = useState({
    questionId: '',
    feedbackText: '',
    rating: 5
  });


  const handleSubmitQuestion = () => {
    if (questionData.question && questionData.options.every(o => o.trim()) && questionData.subject) {
      onSubmitQuestion(questionData);
      setQuestionData({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
        subject: '',
        difficulty: 'medium'
      });
      alert('📝 Pergunta submetida para análise! Obrigado por contribuir!');
    } else {
      alert('⚠️ Preencha todos os campos da pergunta');
    }
  };

  const handleSubmitFeedback = () => {
    if (feedbackData.questionId && feedbackData.feedbackText.trim()) {
      onSubmitFeedback(feedbackData.questionId, feedbackData.feedbackText, feedbackData.rating);
      setFeedbackData({
        questionId: '',
        feedbackText: '',
        rating: 5
      });
      alert('📢 Feedback enviado! Muito obrigado pela sua contribuição!');
    } else {
      alert('⚠️ Preencha o ID da questão e seu comentário');
    }
  };

  const bgColor = isDark ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-blue-50 to-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const inputBg = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300';
  const tabBg = isDark ? 'bg-gray-800' : 'bg-gray-200';

  return (
    <AnimatePresence>
      {isOpen && (
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
            className={`w-full max-w-2xl rounded-lg shadow-2xl ${bgColor}`}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h2 className={`text-2xl font-bold ${textColor}`}>
                🤝 Comunidade Acadêmica
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-300 transition"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-4 border-b border-gray-700">
              {[
                { id: 'question', label: '❓ Perguntas', badge: 'badge-pergunta-boa' },
                { id: 'feedback', label: '💬 Feedback', badge: 'badge-feedback' }
              ].map(tab => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : `${tabBg} ${textColor} hover:opacity-80`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {/* Question Submission Tab */}
              {activeTab === 'question' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>
                      Sugira Uma Pergunta!
                    </h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Tem uma pergunta criativa sobre a cultura baiana? Submeta para análise!
                      Se selecionada, você ganha: <span className="font-bold">❓ Questionador Crítico</span>
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                      Pergunta
                    </label>
                    <textarea
                      value={questionData.question}
                      onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
                      placeholder="Digite sua pergunta..."
                      rows="3"
                      className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textColor}`}>
                      Opções de Resposta
                    </label>
                    {questionData.options.map((option, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...questionData.options];
                          newOptions[idx] = e.target.value;
                          setQuestionData({ ...questionData, options: newOptions });
                        }}
                        placeholder={`Opção ${idx + 1}`}
                        className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                        Resposta Correta
                      </label>
                      <select
                        value={questionData.correctAnswer}
                        onChange={(e) => setQuestionData({ ...questionData, correctAnswer: parseInt(e.target.value) })}
                        className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        {[0, 1, 2, 3].map(idx => (
                          <option key={idx} value={idx}>
                            Opção {idx + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                        Dificuldade
                      </label>
                      <select
                        value={questionData.difficulty}
                        onChange={(e) => setQuestionData({ ...questionData, difficulty: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="easy">Fácil</option>
                        <option value="medium">Médio</option>
                        <option value="hard">Difícil</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                      Disciplina
                    </label>
                    <select
                      value={questionData.subject}
                      onChange={(e) => setQuestionData({ ...questionData, subject: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Selecione uma disciplina</option>
                      <option value="matematica">Matemática</option>
                      <option value="geografia">Geografia</option>
                      <option value="historia">História</option>
                      <option value="biologia">Biologia</option>
                      <option value="linguagens">Linguagens</option>
                      <option value="sociologia">Sociologia</option>
                      <option value="filosofia">Filosofia</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                      Explicação/Justificativa
                    </label>
                    <textarea
                      value={questionData.explanation}
                      onChange={(e) => setQuestionData({ ...questionData, explanation: e.target.value })}
                      placeholder="Explique por que essa é a resposta correta..."
                      rows="2"
                      className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <button
                    onClick={handleSubmitQuestion}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    Submeter Pergunta
                  </button>
                </motion.div>
              )}

              {/* Feedback Tab */}
              {activeTab === 'feedback' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>
                      Deixe Seu Feedback!
                    </h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Ajude a melhorar as questões deixando um feedback construtivo!
                      Envie 20 feedbacks e desbloqueie: <span className="font-bold">📝 Contribuidor Ativo</span>
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                      ID da Questão
                    </label>
                    <input
                      type="text"
                      value={feedbackData.questionId}
                      onChange={(e) => setFeedbackData({ ...feedbackData, questionId: e.target.value })}
                      placeholder="Ex: mat-001, geo-005..."
                      className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                      Seu Feedback
                    </label>
                    <textarea
                      value={feedbackData.feedbackText}
                      onChange={(e) => setFeedbackData({ ...feedbackData, feedbackText: e.target.value })}
                      placeholder="Deixe sugestões, comentários ou melhorias..."
                      rows="4"
                      className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                      Avaliação ⭐
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <motion.button
                          key={star}
                          onClick={() => setFeedbackData({ ...feedbackData, rating: star })}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`text-2xl transition ${
                            star <= feedbackData.rating ? 'text-yellow-400' : 'text-gray-500'
                          }`}
                        >
                          ⭐
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p>📝 Feedbacks registrados: <span className="font-bold text-blue-400">{userData?.feedbacksCount || 0}/20</span></p>
                  </div>

                  <button
                    onClick={handleSubmitFeedback}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    Enviar Feedback
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
