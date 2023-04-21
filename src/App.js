import LoggedIn from 'components/LoggedIn'
import LoggedOut from 'components/LoggedOut'
import Gallery from 'components/Gallery'
import useApp from './hooks'
import 'antd/dist/reset.css'
import './App.css'

function App() {
  const {
    currentUser,
    isLoading,
    isLogged,
    setIsLoading,
    setIsLogged,
    showGallery,
  } = useApp()

  const content = showGallery 
    ?
      <Gallery />
    :
      <div className={`rb ${!isLoading ? '--hide-loading' : ''}`}>
        {
          isLoading ? null :
          isLogged ?
          <LoggedIn currentUser={currentUser} setIsLogged={setIsLogged} setIsLoading={setIsLoading} /> :
          <LoggedOut setIsLoading={setIsLoading} />
        }
      </div>

  return content;
}

export default App;
