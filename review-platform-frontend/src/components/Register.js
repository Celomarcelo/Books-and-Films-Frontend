import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/register_style.css';

/**
 * Register Component
 * 
 * This component is responsible for rendering the user registration form,
 * capturing the input data, and sending the data to the server to create a new account.
 */
const Register = () => {
    // State variables for storing form input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    /**
     * Handles form submission.
     * Prevents default form behavior, sends a POST request to the registration API,
     * and navigates the user to the home page on success.
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        // Sends POST request to the server to register a new user
        axios.post('/api/register/', {
            username,
            password,
            email,
        })
            .then(response => {
                // On success, store the authentication token in local storage
                localStorage.setItem('token', response.data.access);
                // Navigate to the home page after successful registration
                navigate('/');
            })
            .catch(error => console.error(error));  // Logs any errors encountered during the request
    };

    return (
        // Renders the registration form and centers it on the screen
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <form className="w-50 p-3" onSubmit={handleSubmit}>
                <div className="w-100 h-100 custom_bg rounded p-4">
                    <div className="text-center mb-4">
                        <h2 className="fs-1">Register</h2>  {/* Form heading */}
                    </div>
                    {/* Username input field */}
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    {/* Password input field */}
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* Email input field */}
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Submit button */}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;

