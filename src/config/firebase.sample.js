import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIaaAaAAaaAaaaa00AA00aaaaaAAAA0a0AAAAaA",
  authDomain: "domain-auth.firebaseapp.com",
  databaseURL: "https://url-realtime-database.firebaseio.com",
  projectId: "project-id-name",
  storageBucket: "host-storage.com",
  messagingSenderId: "00000000000",
  appId: "0:00000000000:web:aa00a0aaa000a0ad00aaaa",
  measurementId: "A-000A0AAAA0"
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase()
export const auth = getAuth(app)
export const storage = getStorage(app);