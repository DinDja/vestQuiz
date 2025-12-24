import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

export const LoginScreen = ({ 
  onGoogleLogin, 
  onAnonymousLogin, 
  isDark, 
  toggleTheme 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex flex-col justify-center min-h-[80vh] space-y-8"
  >
    <div className="absolute top-6 right-6">
      <ThemeToggle isDark={isDark} toggle={toggleTheme} />
    </div>

    <div className="flex flex-col items-center text-center space-y-4">
      <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-3xl rotate-3 flex items-center justify-center shadow-2xl ring-4 ring-indigo-500/20 mb-4">
        <Brain className="text-white w-12 h-12" />
      </div>
      <div>
        <h1 className={`text-4xl font-bold tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>QuizVest</h1>
        <p className="text-slate-500">Sua jornada rumo à aprovação começa aqui.</p>
      </div>
    </div>

    <div className="space-y-4 mt-8">
      <button
        onClick={onGoogleLogin}
        className="w-full py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-3"
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
        Entrar com Google
      </button>

      <button
        onClick={onAnonymousLogin}
        className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
      >
        Embarcar Anonimamente
      </button>
    </div>
  </motion.div>
);