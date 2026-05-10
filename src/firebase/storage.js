// ============================================================
//  Firebase Storage Helpers — StayMate
//  Handles: profile pictures | property images | ID uploads
// ============================================================

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import app from './config';

export const storage = getStorage(app);

// ─────────────────────────────────────────────────────────────
//  GENERIC UPLOAD (with progress callback)
// ─────────────────────────────────────────────────────────────

/**
 * Upload a file to Firebase Storage.
 * @param {string} path      Storage path e.g. "profilePics/uid_123.jpg"
 * @param {File}   file      The File object from an <input type="file">
 * @param {Function} onProgress   (0–100) called during upload
 * @returns {Promise<string>}  Download URL of the uploaded file
 */
export const uploadFile = (path, file, onProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      'state_changed',
      (snapshot) => {
        const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (onProgress) onProgress(pct);
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
};

// ─────────────────────────────────────────────────────────────
//  PROFILE PICTURE
// ─────────────────────────────────────────────────────────────

export const uploadProfilePicture = (uid, file, onProgress) =>
  uploadFile(`profilePics/${uid}/${Date.now()}_${file.name}`, file, onProgress);

// ─────────────────────────────────────────────────────────────
//  PROPERTY IMAGE
// ─────────────────────────────────────────────────────────────

export const uploadPropertyImage = (propertyId, file, onProgress) =>
  uploadFile(`properties/${propertyId}/${Date.now()}_${file.name}`, file, onProgress);

// ─────────────────────────────────────────────────────────────
//  ID PROOF UPLOAD (for roommate verification)
// ─────────────────────────────────────────────────────────────

export const uploadIdProof = (uid, file, onProgress) =>
  uploadFile(`idProofs/${uid}/${Date.now()}_${file.name}`, file, onProgress);

// ─────────────────────────────────────────────────────────────
//  DELETE FILE
// ─────────────────────────────────────────────────────────────

export const deleteFile = (path) =>
  deleteObject(ref(storage, path));
