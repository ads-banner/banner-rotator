import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const LoggedOut = ({ setIsLogged }) => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('handleLogin', { result })
        setIsLogged(true)
      }).catch((error) => {
        console.log('handleLogin error', { error })
      });
  }

  return <div className="rb-logged-out">
    <h1>SEJA BEM VINDO AO BANNER ROTATOR v0.0.1</h1>
    <a className="rb-button" onClick={handleLogin}>ENTRA NO SISTEMA</a>
  </div>
}

export default LoggedOut