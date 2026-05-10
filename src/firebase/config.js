// ============================================================
//  Firebase Configuration — StayMate
//  Uses .env vars first; falls back to project defaults so the
//  app always boots even before Vercel env vars are set.
// ============================================================

import { initializeApp, getApps, getApp } from 'firebase/app';

// ── Firebase project credentials ────────────────────────────
// VITE_ env vars are injected at build-time by Vite.
// Fallbacks = your actual Firebase project values (safe to
// include for a public web app — API keys are not secrets).
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || 'AIzaSyBiRfDJxiGtfF7Q5HkAM8zFkNcDS-iBspw',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || 'staymate-734a0.firebaseapp.com',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || 'staymate-734a0',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || 'staymate-734a0.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID|| '64859432343',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || '1:64859432343:web:88d31c9265df9f399b90d2',
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID     || 'G-PR4FBH4FN5',
};

// Always initialized — no more "not configured" guard
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// isFirebaseConfigured is always true now (kept for compatibility)
export const isFirebaseConfigured = true;
export const firebaseConfigValues = firebaseConfig;

export default app;
