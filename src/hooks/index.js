import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from 'config/firebase'

const useApp = () => {
  const hasLinkId = window.location.search.indexOf('link=') > -1
  const [currentUser, setCurrentUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isLogged, setIsLogged] = useState(false)
  const [showGallery, setShowGallery] = useState(hasLinkId)

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
    showGallery,
  }
}

export default useApp