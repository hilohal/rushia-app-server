import admin from 'firebase-admin';
import { readFileSync } from 'fs';

if (!process.env.FIREBASE_ADMIN_SECRET_PATH) {
  throw new Error('process.env.FIREBASE_ADMIN_SECRET_PATH is empty');
}

if (!process.env.FIREBASE_DATABASE_URL) {
  throw new Error('process.env.FIREBASE_DATABASE_URL is empty');
}

const serviceAccount = JSON.parse(
  readFileSync(process.env.FIREBASE_ADMIN_SECRET_PATH, {
    encoding: 'utf-8'
  })
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

export const firestore = admin.firestore();
