export const INITIAL_USER_STATE = {
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
  createdAt: '',
  lastLogin: '',
  points: 0,
  xp: 0,
  weeklyXp: 0,
  weeklyXpResetAt: '',
  completed: [],
  badges: [],
  correctQuestions: [],
  streak: 1, // dias consecutivos
  correctStreak: 0, // acertos consecutivos (global)
  fastAnswersCount: 0, // respostas rápidas (placeholder)
  viewedExplanations: [], // ids de questões cujas explicações foram vistas
  sharesCount: 0, // contador de compartilhamentos
  bio: 'Em busca da aprovação.',
  isAnonymous: false,
  // Campos para badges comunitárias
  mentorHelps: 0,
  questionsSubmitted: [],
  feedbacksCount: 0
};