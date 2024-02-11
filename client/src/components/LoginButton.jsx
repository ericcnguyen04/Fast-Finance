const { useAuth0 } = require("@auth0/auth0-react");

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <button
            onClick={() =>
                loginWithRedirect({
                    authorizationParams: {
                        redirect_uri: "http://localhost:3000/register",
                    },
                })
            }
        >
            Login
        </button>
    );
};

export default LoginButton;
