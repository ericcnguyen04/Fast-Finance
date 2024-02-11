import '../css/Welcome.css'
import React from 'react';
import Typewriter from 'typewriter-effect'
const { useAuth0 } = require("@auth0/auth0-react");



// import fintech from '/'

export default function Welcome() {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className='welcome'>
            <div class="context">
                <div>
                    <h1>Fast Finance</h1>
                </div>
                <div className='contextBio'>
                    <Typewriter 
                        onInit={(typewriter) => {
                            typewriter
                                .typeString("Give meaning to your cash")
                                .pauseFor(200)
                                .start();
                        }}
                    />

                    <button className="button" onClick={() =>
                        loginWithRedirect({
                            authorizationParams: {
                                redirect_uri: "http://localhost:3000/register",
                            },
                        })}>Log In
                    </button>
                </div>
            </div>

            <div className="area" >
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        
            <div>
                <button></button>
            </div>

        </div>
    );
}
