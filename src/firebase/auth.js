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
import app from './config';

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// ── Register with Email & Password ──────────────────────────
export const registerWithEmail = async (email, password, displayName) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(userCred.user, { displayName });
  }
  return userCred.user;
};

// ── Login with Email & Password ──────────────────────────────
export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// ── Login with Google Popup ──────────────────────────────────
export const loginWithGoogle = () =>
  signInWithPopup(auth, googleProvider);

// ── Sign Out ─────────────────────────────────────────────────
export const logout = () => signOut(auth);

// ── Password Reset ───────────────────────────────────────────
export const resetPassword = (email) =>
  sendPasswordResetEmail(auth, email);

// ── Auth State Listener ──────────────────────────────────────
// Usage: const unsubscribe = onAuthChange(user => setUser(user))
export const onAuthChange = (callback) =>
  onAuthStateChanged(auth, callback);
