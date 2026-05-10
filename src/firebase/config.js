// ============================================================
//  Firebase Configuration — StayMate
//  All values are injected from .env (never hardcode secrets!)
//  Rename .env.example → .env and fill in your Firebase keys.
// ============================================================

import { initializeApp, getApps, getApp } from 'firebase/app';

const requiredConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const isValid = (value) =>
  typeof value === 'string' && value.trim() !== '' && !/^your[_-]/i.test(value);

export const isFirebaseConfigured = Object.values(requiredConfig).every(isValid);

export const firebaseConfig = {
  ...requiredConfig,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
};

// Prevent duplicate Firebase initialization (hot-reload safe)
const app = isFirebaseConfigured
  ? getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp()
  : null;

if (!isFirebaseConfigured && import.meta.env.DEV) {
  console.warn(
    'Firebase is not configured. Copy .env.example to .env and fill in your Firebase credentials.'
  );
}

export default app;
