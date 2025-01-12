import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/css/login_style.css';
import api from './Api';

/**
 * Login Component
 * 
 * This component handles the login process for users. It captures the user's
 * username and password, sends the login request to the server, and processes
 * the response. If successful, it stores the authentication token and redirects 
 * the user to the homepage. It also provides a link for users to register if 
 * they do not have an account.
 */
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState(null);

    /**
    * Validate form inputs before submitting.
    */
    const validateForm = () => {
        if (!username || !password) {
            setPasswordError('Both fields are required.');
            return false;
        }
        setPasswordError(null);
        return true;
    };

    /**
     * handleSubmit
     * 
     * This function is triggered when the login form is submitted. It prevents the
     * default form submission behavior, sends a POST request to the server with 
     * the username and password, and handles the server response.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevents default form submission

        if (!validateForm()) return;

        // Send POST request to the login endpoint
        try {
            const response = await api.post('/login/', {
                username,  // Send username from the form input
                password,  // Send password from the form input
            });

            const token = response.data.access;
            if (token) {
                localStorage.setItem('accessToken', token);
            }

            // Store the authentication token in localStorage
            localStorage.setItem('token', response.data.access);

            // Stores the user ID in localStorage
            localStorage.setItem('userId', response.data.user.id);

            // Redirect the user to the homepage after successful login
            console.log('Backend response:', response.data);
            navigate('/');

        } catch (error) {
            // Handle login failure by displaying an error message
            console.error("Login Error:", error);
            if (error.response && error.response.data.detail) {
                setPasswordError(error.response.data.detail);
            } else {
                setPasswordError('An error occurred. Please try again.');
            }
        };
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className="row w-100">
                {/* Branding section */}
                <div className="col-12 col-md-6 text-center mb-4 mb-md-0 d-flex flex-column justify-content-center">
                    <h1>Books&Films</h1>
                    <p>Share ideas about books and films!</p>
                </div>

                {/* Login form section */}
                <div className="col-12 col-md-6 d-flex justify-content-center">
                    <form className="p-4 w-100" onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
                        <div className="custom_bg rounded p-4">
                            {/* Header section */}
                            <div className="text-center mb-4">
                                <h2 className="fs-1">Login</h2>

                                {/* Display error message if login fails */}
                                {passwordError && (
                                    <div className="alert alert-danger mt-3 text-center">
                                        {passwordError}
                                    </div>
                                )}
                            </div>

                            {/* Username input */}
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    aria-label="Username"
                                    required
                                />
                            </div>

                            {/* Password input */}
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    aria-label="Password"
                                    required
                                />
                            </div>

                            {/* Submit button */}
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Login
                                </button>
                            </div>

                            {/* Registration link for users without an account */}
                            <div className="text-center m-4">
                                <p>
                                    Don't have an account yet? You can register
                                    <Link className="text-primary" to="/register"> here</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
