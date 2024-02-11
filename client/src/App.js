import logo from "./logo.svg";
import "./App.css";
import LoginButton from "./components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./components/LogoutButton";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import { StrictMode } from "react";

function AppElement() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {isAuthenticated && !isLoading ? (
                    <div>
                        <LogoutButton />
                    </div>
                ) : (
                    <LoginButton />
                )}
            </header>
        </div>
    );
}

const router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppElement />} />
                <Route path="/register" element={<Registration />} />
            </Routes>
        </BrowserRouter>
    );
};

function App() {
    return <StrictMode>{router()}</StrictMode>;
}

export default App;
