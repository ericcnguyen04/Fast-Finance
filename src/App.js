import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route  //Navigate
} from 'react-router-dom'
import { useState, useEffect } from 'react';


import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Profile from './Components/Profile'
import Register from './Components/Register'
import Table from './Components/Table'
import Welcome from './Components/Welcome'

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
              path="/register"
              element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
            />

            <Route 
              path="/login"
              element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
            />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
