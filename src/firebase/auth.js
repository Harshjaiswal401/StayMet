// ============================================================
//  Firebase Authentication Helpers — StayMate
// ============================================================

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import app, { isFirebaseConfigured } from './config';

export const auth = app ? getAuth(app) : null;
export const googleProvider = new GoogleAuthProvider();
export { isFirebaseConfigured };

const ensureAuth = () => {
  if (!isFirebaseConfigured || !auth) {
    throw new Error(
      'Firebase Authentication is not configured. Copy .env.example to .env and provide valid Firebase credentials.'
    );
  }
};

// ── Register with Email & Password ──────────────────────────
export const registerWithEmail = async (email, password, displayName) => {
  ensureAuth();
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(userCred.user, { displayName });
  }
  return userCred.user;
};

// ── Login with Email & Password ──────────────────────────────
export const loginWithEmail = (email, password) => {
  ensureAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

// ── Login with Google Popup ──────────────────────────────────
export const loginWithGoogle = () => {
  ensureAuth();
  return signInWithPopup(auth, googleProvider);
};

// ── Sign Out ─────────────────────────────────────────────────
export const logout = () => {
  ensureAuth();
  return signOut(auth);
};

// ── Password Reset ───────────────────────────────────────────
export const resetPassword = (email) => {
  ensureAuth();
  return sendPasswordResetEmail(auth, email);
};

// ── Auth State Listener ──────────────────────────────────────
// Usage: const unsubscribe = onAuthChange(user => setUser(user))
export const onAuthChange = (callback) => {
  ensureAuth();
  return onAuthStateChanged(auth, callback);
};
