import logo from "./logo.svg";
import "./App.css";
import LoginButton from "./components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./components/LogoutButton";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import { StrictMode, useEffect, useState } from "react";

const getUser = async (user) => {
    try {
        let response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/users/${user.sub}`,
            {
                method: "GET",
                redirect: "follow",
                mode: "cors",
            }
        );

        let body = await response.json();

        return body;
    } catch (e) {
        console.log(e);
    }
};

const getAccounts = async (nessie_id) => {
    try {
        let response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/accounts/${nessie_id}`,
            {
                method: "GET",
                redirect: "follow",
                mode: "cors",
            }
        );

        let body = await response.json();

        return body;
    } catch (e) {
        console.log(e);
    }
};

const getSpend = async (account_id) => {
    try {
        let response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/accounts/spend/${account_id}`,
            {
                method: "GET",
                redirect: "follow",
                mode: "cors",
            }
        );

        let body = await response.json();

        return body;
    } catch (e) {
        console.log(e);
    }
};

function AppElement() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [accounts, setAccounts] = useState([]);
    const [spend, setSpend] = useState([]);

    useEffect(() => {
        (async () => {
            if (isAuthenticated && !isLoading) {
                let dbUser = await getUser(user);
                console.log(dbUser);
                let accs = await getAccounts(dbUser.nessie_id);
                console.log(accs);
                setAccounts(accs);

                let sps = [];

                for (let acc of accs) {
                    let sp = await getSpend(acc["_id"]);
                    sps.push(sp);
                }
                setSpend(sps);
            }
        })();
    }, [user, isAuthenticated, isLoading]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                {isAuthenticated && !isLoading ? (
                    <div>
                        <LogoutButton />
                        <br />
                        <p>{JSON.stringify(accounts, null, 4)}</p>
                        <br />
                        <p>SPEND: {JSON.stringify(spend, null, 4)}</p>
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
