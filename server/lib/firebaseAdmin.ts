import admin from 'firebase-admin';
import { getApps, initializeApp } from 'firebase-admin/app';

console.log("cccc",process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
console.log("serviceAccount",serviceAccount);
if (!getApps().length) {
    initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://exploracotopaxi360.firebaseio.com"
    });
}

const adminAuth = admin.auth();

export { adminAuth };