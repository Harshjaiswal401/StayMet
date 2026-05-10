// ============================================================
//  Firestore Helpers — StayMate
//  Collections: users | properties | bookings | reviews
// ============================================================

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import app, { isFirebaseConfigured } from './config';

export const db = app ? getFirestore(app) : null;

const getDb = () => {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      'Firebase Firestore is not configured. Copy .env.example to .env and provide valid Firebase credentials.'
    );
  }
  return db;
};

// ─────────────────────────────────────────────────────────────
//  USER PROFILE
// ─────────────────────────────────────────────────────────────

/** Create or overwrite a user document after registration */
export const createUserProfile = async (uid, data) => {
  const ref = doc(getDb(), 'users', uid);
  await setDoc(ref, {
    ...data,
    favorites: [],
    createdAt: serverTimestamp(),
  }, { merge: true });
};

/** Get a single user profile */
export const getUserProfile = async (uid) => {
  const snap = await getDoc(doc(getDb(), 'users', uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// ─────────────────────────────────────────────────────────────
//  FAVORITES
// ─────────────────────────────────────────────────────────────

/** Add a property ID to a user's favorites array */
export const addFavorite = (uid, propertyId) =>
  updateDoc(doc(getDb(), 'users', uid), { favorites: arrayUnion(propertyId) });

/** Remove a property ID from a user's favorites array */
export const removeFavorite = (uid, propertyId) =>
  updateDoc(doc(getDb(), 'users', uid), { favorites: arrayRemove(propertyId) });

// ─────────────────────────────────────────────────────────────
//  PROPERTIES
// ─────────────────────────────────────────────────────────────

/** Fetch all properties (for production — replace dummyProperties.json) */
export const getAllProperties = async () => {
  const snap = await getDocs(collection(getDb(), 'properties'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

/** Fetch only verified properties */
export const getVerifiedProperties = async () => {
  const q = query(
    collection(getDb(), 'properties'),
    where('verified', '==', true),
    orderBy('rating', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

/** Fetch a single property by ID */
export const getPropertyById = async (id) => {
  const snap = await getDoc(doc(getDb(), 'properties', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// ─────────────────────────────────────────────────────────────
//  BOOKINGS
// ─────────────────────────────────────────────────────────────

/** Create a new booking document */
export const createBooking = async (bookingData) => {
  const ref = await addDoc(collection(getDb(), 'bookings'), {
    ...bookingData,
    status: 'pending',       // pending | confirmed | cancelled
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

/** Get all bookings for a specific user */
export const getUserBookings = async (uid) => {
  const q = query(
    collection(getDb(), 'bookings'),
    where('userId', '==', uid),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

/** Update booking status */
export const updateBookingStatus = (bookingId, status) =>
  updateDoc(doc(getDb(), 'bookings', bookingId), { status });

// ─────────────────────────────────────────────────────────────
//  REVIEWS
// ─────────────────────────────────────────────────────────────

/** Add a review to a property */
export const addReview = async (propertyId, reviewData) => {
  const ref = collection(getDb(), 'properties', propertyId, 'reviews');
  return addDoc(ref, {
    ...reviewData,
    createdAt: serverTimestamp(),
  });
};

/** Fetch reviews for a property */
export const getPropertyReviews = async (propertyId, maxItems = 10) => {
  const q = query(
    collection(getDb(), 'properties', propertyId, 'reviews'),
    orderBy('createdAt', 'desc'),
    limit(maxItems)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─────────────────────────────────────────────────────────────
//  EXPENSES (Finance Dashboard — roommate expense tracking)
// ─────────────────────────────────────────────────────────────

/** Save an expense entry for a shared flat */
export const addExpense = async (flatId, expenseData) => {
  return addDoc(collection(getDb(), 'flats', flatId, 'expenses'), {
    ...expenseData,
    addedAt: serverTimestamp(),
  });
};

/** Get all expenses for a flat */
export const getFlatExpenses = async (flatId) => {
  const q = query(
    collection(getDb(), 'flats', flatId, 'expenses'),
    orderBy('addedAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
