import LoggedIn from 'components/LoggedIn';
import LoggedOut from 'components/LoggedOut';
import useApp from './hooks'
import 'antd/dist/reset.css';
import './App.css';

function App() {
  const { isLoading, isLogged, setIsLogged, currentUser, setIsLoading } = useApp()

  return (
    <div className={`rb ${!isLoading ? '--hide-loading' : ''}`}>
      {
        isLoading ? null :
        isLogged ?
        <LoggedIn currentUser={currentUser} setIsLogged={setIsLogged} setIsLoading={setIsLoading} /> :
        <LoggedOut setIsLogged={setIsLogged} />
      }
    </div>
  );
}

export default App;
