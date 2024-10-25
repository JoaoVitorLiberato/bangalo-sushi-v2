import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app"
import { getAnalytics, logEvent } from "firebase/analytics"

const FIREBASE_CONFIG:FirebaseOptions = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
}

const FIREBASE_APP = initializeApp(FIREBASE_CONFIG)
const ANALYTICS = getAnalytics(FIREBASE_APP as FirebaseApp)

logEvent(ANALYTICS, "app_start")

export function event (event:string, params?: Record<string, string|string[]|number|boolean>):void {
  logEvent(ANALYTICS, event, params || {})
}
