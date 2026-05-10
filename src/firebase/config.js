// ============================================================
//  Firebase Configuration — StayMate
//  All values are injected from .env (never hardcode secrets!)
//  Rename .env.example → .env and fill in your Firebase keys.
// ============================================================

import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // Optional
};

// Prevent duplicate Firebase initialization (hot-reload safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default app;
