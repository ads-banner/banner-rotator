import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from 'config/firebase'

const useApp = () => {
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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [isLoading])

  return {
    currentUser,
    isLoading,
    isLogged,
    setCurrentUser,
    setIsLoading,
    setIsLogged,
  }
}

export default useApp