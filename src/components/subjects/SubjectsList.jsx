import { motion } from 'framer-motion';
import { ThemeToggle } from '../common/ThemeToggle';
import { SubjectCard } from './SubjectCard';

export const SubjectsList = ({
  subjects,
  userData,
  isDark,
  toggleTheme,
  setActiveSubjectId,
  setView
}) => {
  return (
    <motion.div key="subjects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Matérias</h1>
          <p className="text-slate-500 text-sm">Selecione um tópico para iniciar o desafio.</p>
        </div>
        <ThemeToggle isDark={isDark} toggle={toggleTheme} />
      </header>

      <div className="grid grid-cols-1 gap-3">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            isCompleted={userData.completed?.includes(subject.id)}
            isDark={isDark}
            onClick={() => {
              // Comportamento direto: Clicou, iniciou a batalha!
              if (!userData.completed?.includes(subject.id)) {
                setActiveSubjectId(subject.id);
                setView('quiz');
              }
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};