import "bulma/css/bulma.min.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import fetch from "node-fetch";

const AuthRedir = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    return !isLoading && !isAuthenticated && <Navigate to="/" />;
};

const AccountRedir = async (user) => {
    try {
        let API_URL = process.env.REACT_APP_API_URL;
        let response = await fetch(`${API_URL}/api/users/${user.sub}`, {
            method: "GET",
            redirect: "follow",
            mode: "cors",
        });

        let body = await response.json();

        console.log(body);

        if (!body) {
            return false;
        }

        let registered = body.registered === true ? true : false;

        return response.status === 200 && registered;
    } catch (e) {
        console.log(e);
        return false;
    }
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
        let address = form_data.street_number
            ? form_data.street_number.split(" ")
            : "";
        if (address instanceof Array && address.length > 0) {
            form_data.street_number = address.shift();
            form_data.street_name = address.join(" ");
        }
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
    UpdateUser(e);
}

const RegistrationForm = () => {
    const { user, isLoading } = useAuth0();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [usr, setUsr] = useState();

    useEffect(() => {
        if (!isLoading && user) {
            setUsr(user.sub);
        }
    }, [user, setUsr, isLoading, usr]);

    return (
        <div>
            <h1>Register</h1>
            <div className="box ">
                <form
                    className="field"
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
                    <div className="field">
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                id="fname"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                placeholder="First Name"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                id="lname"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Address"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                id="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="State"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                id="zip"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                placeholder="Zip Code"
                            />
                        </div>
                    </div>
                    <input className="button is-primary" type="submit" />
                </form>
            </div>
        </div>
    );
};

function Registration() {
    const { user, isLoading } = useAuth0();
    const navigate = useNavigate();
    return (
        <div>
            <AuthRedir />
            {React.useEffect(() => {
                (async () => {
                    if (!isLoading && user) {
                        let redir = await AccountRedir(user);
                        if (redir === true) {
                            navigate("/");
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
