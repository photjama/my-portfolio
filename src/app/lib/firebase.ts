import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Global variables for compatibility with the provided code
declare global {
  var __app_id: string;
  var __firebase_config: string;
  var __initial_auth_token: string | null;
}

// Set global variables from environment
global.__app_id = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id';
global.__firebase_config = JSON.stringify(firebaseConfig);
global.__initial_auth_token = process.env.NEXT_PUBLIC_INITIAL_AUTH_TOKEN || null;

export default app;