import "../CSS/Form.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const AuthRedir = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    return !isLoading && !isAuthenticated && <Navigate to="/" />;
};

const AccountRedir = async (user) => {
    let API_URL = process.env.REACT_APP_API_URL;
    let response = await fetch(`${API_URL}/api/users/${user.sub}`, {
        method: "GET",
        redirect: "follow",
        mode: "cors",
    });

    let body = await response.json();

    if (!body) {
        return false;
    }

    let registered = body.registered === true ? true : false;

    return response.status === 200 && registered;
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

export default function Register() {
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
            <div className="login">
                <div className="container">
                    <div className="card">
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <h1 className="swag">Register</h1>
                                <input
                                    className="input"
                                    type="name"
                                    placeholder="Name"
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Email"
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Password"
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="address"
                                    placeholder="Address"
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="city"
                                    placeholder="City"
                                />
                                <span className="icon is-small is-left"></span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="state"
                                    placeholder="State"
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="zipcode"
                                    placeholder="Zipcode"
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button className="button is-success">
                                    Register
                                </button>
                            </p>
                        </div>
                        <a href="/login">Already have an account?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
