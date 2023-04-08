import { auth } from 'config/firebase'
import { signOut } from 'firebase/auth'
import { useState } from 'react'

const useLoggedIn = ({ setIsLogged, setIsLoading }) => {
  const [showAddLink, setShowAddLink] = useState(false)

  const handleToggleShowAddLink = () => {
    setShowAddLink(!showAddLink)
  }

  const handleLogoff = () => {
    signOut(auth).then(() => {
      setIsLogged(false)
      setIsLoading(true)
    }).catch((error) => {});
  }

  return {
    handleLogoff,
    handleToggleShowAddLink,
    showAddLink,
  }
}

export default useLoggedIn