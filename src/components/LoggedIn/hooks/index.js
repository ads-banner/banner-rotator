import { getAuth, signOut } from 'firebase/auth'
import { useState } from 'react'

const useLoggedIn = ({ setIsLogged }) => {
  const [showAddLink, setShowAddLink] = useState(false)
  const auth = getAuth()

  const handleToggleShowAddLink = () => {
    setShowAddLink(!showAddLink)
  }

  const handleLogoff = () => {
    signOut(auth).then(() => {
      setIsLogged(false)
    }).catch((error) => {});
  }

  return {
    handleLogoff,
    handleToggleShowAddLink,
    showAddLink,
  }
}

export default useLoggedIn