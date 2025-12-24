import { useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInAnonymously 
} from 'firebase/auth';
import { auth } from '../firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code !== 'auth/cancelled-popup-request' && error.code !== 'auth/popup-closed-by-user') {
        console.error("Erro no login:", error);
      }
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Erro login anônimo:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro logout:", error);
    }
  };

  return {
    user,
    setUser,
    handleGoogleLogin,
    handleAnonymousLogin,
    handleLogout
  };
};