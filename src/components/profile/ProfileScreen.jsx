import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { ProfileHeader } from './ProfileHeader';
import { ProfileStats } from './ProfileStats';
import { BadgesCollection } from './BadgesCollection';
import { CategoryStats } from './CategoryStats';

export const ProfileScreen = ({
    userData,
    isDark,
    toggleTheme,
    handleLogout,
    handleUpdateProfile,
    handleUpdateBackground, // ← VERIFIQUE SE ESTÁ AQUI
    globalLeaderboard,
    subjects,
    badges
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(userData.displayName || '');
    const [editBio, setEditBio] = useState(userData.bio || '');

    return (
        <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="absolute top-4 left-4">
                <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            </div>

            {/* ProfileHeader com todas as props */}
            <ProfileHeader
                userData={userData}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editName={editName}
                setEditName={setEditName}
                editBio={editBio}
                setEditBio={setEditBio}
                handleUpdateProfile={handleUpdateProfile}
                handleUpdateBackground={handleUpdateBackground} // ← CERTIFIQUE-SE QUE ESTÁ AQUI
                isDark={isDark}
            />

            <ProfileStats
                userData={userData}
                globalLeaderboard={globalLeaderboard}
                subjects={subjects}
                isDark={isDark}
            />

            <BadgesCollection
                badges={badges}
                userBadges={userData.badges}
                isDark={isDark}
            />

            <CategoryStats
                subjects={subjects}
                correctQuestions={userData.correctQuestions}
                isDark={isDark}
            />

            <button
                onClick={handleLogout}
                className="w-full py-5 text-rose-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-rose-500/5 rounded-3xl transition-all border border-transparent hover:border-rose-500/10 flex items-center justify-center gap-3"
            >
                <LogOut size={16} /> Abandonar Navio
            </button>
        </motion.div>
    );
};