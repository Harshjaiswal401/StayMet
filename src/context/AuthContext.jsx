import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthChange,
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
  logout,
} from '../firebase/auth';
import { createUserProfile, getUserProfile, addFavorite, removeFavorite } from '../firebase/firestore';

// ── Context ──────────────────────────────────────────────────
const AuthContext = createContext(null);

// ── Hook ─────────────────────────────────────────────────────
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

// ── Provider ─────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser]           = useState(null);
  const [profile, setProfile]     = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [authError, setAuthError] = useState('');

  // ── Listen to Firebase Auth state ───────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const prof = await getUserProfile(firebaseUser.uid);
          setProfile(prof);
          setFavorites(prof?.favorites || []);
        } catch (e) {
          console.error('Error fetching user profile:', e);
        }
      } else {
        setUser(null);
        setProfile(null);
        setFavorites([]);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ── Auth Actions ─────────────────────────────────────────────

  const signInWithEmail = async (email, password) => {
    setAuthError('');
    try {
      await loginWithEmail(email, password);
    } catch (err) {
      console.error('Login error:', err);
      setAuthError(getFriendlyError(err.code));
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    setAuthError('');
    try {
      const result = await loginWithGoogle();
      await createUserProfile(result.user.uid, {
        displayName: result.user.displayName,
        email:       result.user.email,
        photoURL:    result.user.photoURL,
      });
    } catch (err) {
      console.error('Google sign-in error:', err);
      setAuthError(getFriendlyError(err.code));
      throw err;
    }
  };

  const signUp = async (email, password, displayName) => {
    setAuthError('');
    try {
      const newUser = await registerWithEmail(email, password, displayName);
      await createUserProfile(newUser.uid, {
        displayName,
        email,
        photoURL: null,
      });
    } catch (err) {
      console.error('Signup error:', err);
      setAuthError(getFriendlyError(err.code));
      throw err;
    }
  };

  const signOut = async () => {
    await logout();
  };

  // ── Favorites ─────────────────────────────────────────────────
  const toggleFavorite = async (propertyId) => {
    if (!user) return;

    const isFav = favorites.includes(propertyId);
    // Optimistic update
    setFavorites(prev =>
      isFav ? prev.filter(id => id !== propertyId) : [...prev, propertyId]
    );

    try {
      if (isFav) {
        await removeFavorite(user.uid, propertyId);
      } else {
        await addFavorite(user.uid, propertyId);
      }
    } catch (e) {
      console.error('Favorite toggle error:', e);
      // Revert on error
      setFavorites(prev =>
        isFav ? [...prev, propertyId] : prev.filter(id => id !== propertyId)
      );
    }
  };

  const value = {
    user,
    profile,
    favorites,
    loading,
    authError,
    firebaseError: null, // Kept for backwards compat — no longer needed
    setAuthError,
    signInWithEmail,
    signInWithGoogle,
    signUp,
    signOut,
    toggleFavorite,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ── Friendly Firebase Error Messages ─────────────────────────
function getFriendlyError(code) {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please try again.';
    case 'auth/email-already-in-use':
      return 'This email is already registered. Try signing in.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled.';
    case 'auth/network-request-failed':
      return 'Network error. Check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
