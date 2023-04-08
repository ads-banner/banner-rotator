import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyASmsCwbea10HQ26loeleIPBY9m2VEVRxI",
  authDomain: "banner-rotator.firebaseapp.com",
  databaseURL: "https://banner-rotator-default-rtdb.firebaseio.com",
  projectId: "banner-rotator",
  storageBucket: "banner-rotator.appspot.com",
  messagingSenderId: "144955815839",
  appId: "1:144955815839:web:cd12d5dae665b8cd23efaa",
  measurementId: "G-167B4LBYW7"
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase()
export const auth = getAuth(app)