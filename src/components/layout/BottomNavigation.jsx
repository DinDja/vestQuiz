import { Layout, BookOpen, BarChart3, User, FileText } from 'lucide-react';
import { NavButton } from '../common/NavButton';

export const BottomNavigation = ({ view, setView, isDark }) => (
    <nav className={`fixed bottom-0 left-0 right-0 backdrop-blur-md border-t z-50 flex justify-around px-2 transition-colors duration-300 ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-lg'}`}>
        <NavButton
            id="dashboard"
            icon={Layout}
            label="Painel"
            view={view}
            onClick={() => setView('dashboard')}
        />
        <NavButton
            id="subjects"
            icon={BookOpen}
            label="Matérias"
            view={view}
            onClick={() => setView('subjects')}
        />
        <NavButton
            id="ranking"
            icon={BarChart3}
            label="Ranking"
            view={view}
            onClick={() => setView('ranking')}
        />
        <NavButton
            id="profile"
            icon={User}
            label="Perfil"
            view={view}
            onClick={() => setView('profile')}
        />

    </nav>
);