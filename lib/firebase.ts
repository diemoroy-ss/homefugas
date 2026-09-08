import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBpgl2z46yn-IVpeAsmeCVmZL0_SoBqp40",
  authDomain: "homefugas-acc63.firebaseapp.com",
  projectId: "homefugas-acc63",
  storageBucket: "homefugas-acc63.firebasestorage.app",
  messagingSenderId: "788916513766",
  appId: "1:788916513766:web:6852f2708603bec3d28427",
  measurementId: "G-ZX5SBTWNE9"
};

// Authorized Emails List
export const ALLOWED_EMAILS = [
  'santisoftai@gmail.com',
  'mlelax@gmail.com',
  'spahomefugas@gmail.com'
];

// Initialize Firebase App safely for SSR
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Safe Analytics Initialization for Client Side
export const initAnalytics = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};
