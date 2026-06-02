import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, Firestore } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

let db: Firestore | null = null;
let isFirebaseActive = false;

// Gracefully initialize Firebase only if a valid project ID is configured
if (firebaseConfig && firebaseConfig.projectId && firebaseConfig.apiKey) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    isFirebaseActive = true;
    console.log('Firebase Firestore successfully connected for persistent storage.');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
} else {
  console.log('Firebase is not configured yet. Falling back to robust Local Storage state engine.');
}

export { db, isFirebaseActive };

export interface LearnerProgressData {
  userId: string;
  bookmarks: string[];
  completedTopics: string[];
  scores: Record<string, number>;
  updatedAt: string;
}

/**
 * Saves learner progress to Firestore if active, and always to Local Storage.
 */
export async function saveLearnerProgress(
  userId: string,
  bookmarks: string[],
  completedTopics: string[],
  scores: Record<string, number>
) {
  const progress: LearnerProgressData = {
    userId,
    bookmarks,
    completedTopics,
    scores,
    updatedAt: new Date().toISOString(),
  };

  // Always save to Local Storage first for instant availability & offline resilience
  localStorage.setItem(`bookmarks_${userId}`, JSON.stringify(bookmarks));
  localStorage.setItem(`completed_${userId}`, JSON.stringify(completedTopics));
  localStorage.setItem(`scores_${userId}`, JSON.stringify(scores));

  // Sync to Firestore if Firebase database is successfully configured
  if (isFirebaseActive && db) {
    try {
      const docRef = doc(db, 'learner_progress', userId);
      await setDoc(docRef, progress);
    } catch (err) {
      console.warn('Could not sync to cloud Firestore:', err);
    }
  }
}

/**
 * Loads learner progress, merging cloud data (if active) and Local Storage.
 */
export async function loadLearnerProgress(userId: string): Promise<Omit<LearnerProgressData, 'userId'>> {
  // Read local cache first
  const localBookmarks = JSON.parse(localStorage.getItem(`bookmarks_${userId}`) || '[]');
  const localCompleted = JSON.parse(localStorage.getItem(`completed_${userId}`) || '[]');
  const localScores = JSON.parse(localStorage.getItem(`scores_${userId}`) || '{}');

  const defaultProgress = {
    bookmarks: localBookmarks,
    completedTopics: localCompleted,
    scores: localScores,
    updatedAt: new Date().toISOString(),
  };

  if (isFirebaseActive && db) {
    try {
      const docRef = doc(db, 'learner_progress', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const cloudData = docSnap.data() as LearnerProgressData;
        
        // Merge cloud data with local data (taking union/accumulated keys) to prevent any data loss
        const mergedBookmarks = Array.from(new Set([...localBookmarks, ...(cloudData.bookmarks || [])]));
        const mergedCompleted = Array.from(new Set([...localCompleted, ...(cloudData.completedTopics || [])]));
        
        const mergedScores = { ...localScores };
        if (cloudData.scores) {
          for (const k of Object.keys(cloudData.scores)) {
            mergedScores[k] = Math.max(localScores[k] || 0, cloudData.scores[k] || 0);
          }
        }

        return {
          bookmarks: mergedBookmarks,
          completedTopics: mergedCompleted,
          scores: mergedScores,
          updatedAt: cloudData.updatedAt || new Date().toISOString(),
        };
      }
    } catch (err) {
      console.warn('Could not pull from cloud Firestore, loading local cache:', err);
    }
  }

  return defaultProgress;
}
