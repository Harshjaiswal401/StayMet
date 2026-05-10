import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  isFirebaseConfigured,
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
  const [user, setUser]           = useState(null);   // Firebase Auth user
  const [profile, setProfile]     = useState(null);   // Firestore user doc
  const [favorites, setFavorites] = useState([]);     // property IDs
  const [loading, setLoading]     = useState(true);
  const [authError, setAuthError] = useState('');
  const [firebaseError, setFirebaseError] = useState('');

  // Listen to Firebase Auth state
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setFirebaseError(
        'Firebase is not configured. Copy .env.example to .env and add valid Firebase credentials.'
      );
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthChange(async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          // Fetch Firestore profile
          const prof = await getUserProfile(firebaseUser.uid);
          setProfile(prof);
          setFavorites(prof?.favorites || []);
        } else {
          setUser(null);
          setProfile(null);
          setFavorites([]);
        }
        setLoading(false);
      });
      return unsubscribe;
    } catch (err) {
      setFirebaseError(err.message);
      setLoading(false);
    }
  }, []);

  // ── Auth Actions ────────────────────────────────────────────
  const signInWithEmail = async (email, password) => {
    setAuthError('');
    try {
      await loginWithEmail(email, password);
    } catch (err) {
      setAuthError(getFriendlyError(err.code));
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    setAuthError('');
    try {
      const result = await loginWithGoogle();
      // Auto-create profile for new Google users
      await createUserProfile(result.user.uid, {
        displayName: result.user.displayName,
        email:       result.user.email,
        photoURL:    result.user.photoURL,
      });
    } catch (err) {
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
      setAuthError(getFriendlyError(err.code));
      throw err;
    }
  };

  const signOut = async () => {
    await logout();
  };

  // ── Favorites ───────────────────────────────────────────────
  const toggleFavorite = async (propertyId) => {
    if (!user) return; // Must be logged in

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
    } catch {
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
    firebaseError,
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

// ── Friendly Firebase Error Messages ────────────────────────
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
      return 'Network error. Check your connection.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
