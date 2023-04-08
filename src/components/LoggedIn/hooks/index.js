import { auth } from 'config/firebase'
import { signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'

const useLoggedIn = ({ setIsLogged, setIsLoading }) => {
  const [showAddLink, setShowAddLink] = useState(false)
  const [link, setLink] = useState()

  const handleToggleShowAddLink = () => {
    showAddLink && setLink()

    setShowAddLink(!showAddLink)
  }

  const handleShowAddLink = () => {
    setLink({})
  }

  const handleLogoff = () => {
    signOut(auth).then(() => {
      setIsLogged(false)
      setIsLoading(true)
    }).catch((error) => {});
  }

  useEffect(() => {
    link && handleToggleShowAddLink()
  }, [link])

  return {
    handleLogoff,
    handleToggleShowAddLink,
    handleShowAddLink,
    showAddLink,
    link,
    setLink,
  }
}

export default useLoggedIn