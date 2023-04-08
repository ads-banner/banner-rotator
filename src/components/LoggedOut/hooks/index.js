import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from 'config/firebase'

const useLoggedOut = ({ setIsLoading }) => {
  const provider = new GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => { setIsLoading(true) })
      .catch((error) => {});
  }

  return {
    handleLogin
  }
}

export default useLoggedOut