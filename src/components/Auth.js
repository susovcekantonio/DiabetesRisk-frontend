import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

function Auth() {
    const [isRegistering, setIsRegistering] = useState(true);

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>{isRegistering ? 'Register an account' : 'Login'}</h2>
                {isRegistering ? (
                    <>
                        <Register />
                        <p>
                            Already have an account?
                            <button className="toggle-button" onClick={toggleForm}>Login</button>
                        </p>
                    </>
                ) : (
                    <>
                        <Login />
                        <p>
                            Don't have an account?
                            <button className="toggle-button" onClick={toggleForm}>Register</button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Auth;
