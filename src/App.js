import {
  BrowserRouter as Router,
  Routes,
  Route,  //Navigate
  BrowserRouter
} from 'react-router-dom'
import { useState, useEffect } from 'react';



import Login from './Components/Login'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Whatif from './Components/What-if'
import Profile from './Components/Profile'
import Register from './Components/Register'
import Welcome from './Components/Welcome'
import Auth0ProviderWithHistory from './Views/auth0Provider';

function App() {
  
  
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)
  
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }
  }

  return (
    // <BrowserRouter>
    //   <Auth0ProviderWithHistory>
      <div className="App">
        <Router>
          <header>
            <Navbar 
              currentUser={currentUser}
              handleLogout={handleLogout}
            />
          </header>

          <div className="App">
            <Routes>
              <Route 
                path="/"
                element={<Welcome />}
              />

              <Route 
                path="/home"
                element={<Home />}
              />

              <Route 
                path="/whatif"
                element={<Whatif />}
              />

              <Route 
                path="/register"
                element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
              />

              <Route 
                path="/login"
                element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
              />

              <Route 
                path="/profile"
                element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />}
              />

            </Routes>
          </div>
        </Router>
      </div>
  //   </Auth0ProviderWithHistory>
  // </BrowserRouter>
  );
}

export default App;
