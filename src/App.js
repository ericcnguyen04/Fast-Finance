import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route  //Navigate
} from 'react-router-dom'

import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Profile from './Components/Profile'
import Register from './Components/Register'
import Table from './Components/Table'
import Welcome from './Components/Welcome'

function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)


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

            {/*optionally conditionally render auth locked routes */}
            {/* 
            <Route 
              path="/profile" 
                    element={currentUser ? <Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />}
                  /> 
            */}

            {/* <Route 
              path="/profile"
              element={<Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
            /> */}

            {/* copy pasta with new pages */}

            <Route 
              path="/newItem"
              element={<NewItem currentUser={currentUser} />}
            />
          </Routes>

        </div>
      </Router>
    </div>
  );
}

export default App;
