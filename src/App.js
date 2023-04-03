import LoggedIn from './components/LoggedIn';
import LoggedOut from './components/LoggedOut';
import useApp from './hooks'
import './App.css';

function App() {
  const { isLoading, isLogged, setIsLogged, currentUser, setCurrentUser } = useApp()

  return (
    <div className={`rb ${!isLoading ? '--hide-loading' : ''}`}>
      {
        isLoading ? 'loading ...' :
        isLogged ? <LoggedIn currentUser={currentUser} setIsLogged={setIsLogged} /> : <LoggedOut setIsLogged={setIsLogged} />
      }
    </div>
  );
}

export default App;
