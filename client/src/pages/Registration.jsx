import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import fetch from "node-fetch";

const AuthRedir = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    return !isLoading && !isAuthenticated && <Navigate to="/" />;
};

const AccountRedir = async (navigate, user) => {
    let API_URL = process.env.REACT_APP_API_URL;
    let response = await fetch(`${API_URL}/api/users/${user.sub}`, {
        method: "GET",
        redirect: "follow",
        mode: "cors",
    });
    return response.status === 200;
};

function CreateUser(user) {
    (async () => {
        let API_URL = process.env.REACT_APP_API_URL;
        await fetch(`${API_URL}/api/users`, {
            method: "POST",
            body: JSON.stringify({
                auth0_uid: user.sub,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            mode: "cors",
        });
    })();
}

function UpdateUser(form_data) {
    (async () => {
        console.log(form_data);
        let address = form_data.street_number
            ? form_data.street_number.split(" ")
            : "";
        if (address instanceof Array && address.length > 0) {
            form_data.street_number = address.shift();
            form_data.street_name = address.join(" ");
        }
        console.log(form_data);
        await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
            method: "PUT",
            body: JSON.stringify(form_data),
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            mode: "cors",
        });
    })();
}

function UpdateUsr(e) {
    // e["auth0_uid"] = user.sub.auth0_uid;
    console.log(e);
    UpdateUser(e);
}

const RegistrationForm = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [usr, setUsr] = useState();

    console.log(`Loading: ${isLoading} | User: ${user.sub}`);

    useEffect(() => {
        if (!isLoading && user) {
            setUsr(user.sub);
            console.log("setting");
            console.log(usr);
        }
    }, [user, setUsr, isLoading, usr]);

    return (
        <form
            onSubmit={UpdateUsr.bind(this, {
                first_name: fname,
                last_name: lname,
                street_number: address,
                street_name: "",
                city: city,
                state: state,
                zip: zip,
                auth0_uid: user.sub,
            })}
        >
            <input
                type="text"
                id="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="First Name"
            />
            <br />
            <input
                type="text"
                id="lname"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                placeholder="Last Name"
            />
            <br />

            <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
            />
            <br />
            <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
            />
            <br />
            <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
            />
            <br />
            <input
                type="text"
                id="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Zip Code"
            />
            <br />
            <input type="submit" />
        </form>
    );
};

function Registration() {
    const { user, isLoading } = useAuth0();
    const navigate = useNavigate();
    return (
        <div>
            <AuthRedir />
            <p>{JSON.stringify(user, undefined, 4)}</p>
            {React.useEffect(() => {
                (async () => {
                    if (!isLoading && user) {
                        let redir = AccountRedir(user, navigate);
                        if (redir) {
                            navigate("/content");
                        }
                        CreateUser(user);
                    }
                })();
            }, [user, isLoading, navigate])}
            {!isLoading && user && <RegistrationForm />}
        </div>
    );
}

export default Registration;
