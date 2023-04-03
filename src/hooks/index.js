import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { useEffect, useState } from 'react'

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

const useApp = () => {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const [currentUser, setCurrentUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {      
    onAuthStateChanged(auth, user => {
      user && setIsLogged(true)
      user && setCurrentUser(user)

      setIsLoading(false)
    })
  }, [])

  return {
    isLoading,
    isLogged,
    setIsLogged,
    currentUser,
    setCurrentUser
  }
}

export default useApp