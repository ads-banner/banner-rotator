import { getAuth, signOut } from "firebase/auth";
import MyLinks from '../MyLinks'

const LoggedIn = ({ currentUser, setIsLogged }) => {
  const auth = getAuth()

  const logoff = () => {
    signOut(auth).then(() => {
      setIsLogged(false)
    }).catch((error) => {});
  }

  return <div className="rb-logged-in">
    <header>
      <ul style={{display: 'flex', listStyle: 'none', gap: '20px', padding: '10px', borderBottom: '2px solid #ddd'}}>
        <li>
          <img src={currentUser.photoURL} referrerpolicy="no-referrer" style={{borderRadius: '100px'}} />
        </li>
        <li>
          <a>HOME</a>
        </li>
        <li>
          <a className="rb-button --red" onClick={logoff}>DESLOGAR COM CARINHO</a>
        </li>
      </ul>
    </header>
    <div style={{textAlign: 'center'}}>
      <h1>Seja bem vindo, {currentUser.displayName}!</h1>

      <MyLinks user={currentUser} />
    </div>
  </div>
}

export default LoggedIn