import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/register_style.css';
import api from './Api';

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
    const [profileImage, setProfileImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    /**
     * Validates form inputs before submission.
     */
    const validateForm = () => {
        if (!username || !password || !email) {
            setErrorMessage('All fields are required.');
            return false;
        }

        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            return false;
        }

        setErrorMessage(null);
        return true;
    };

    /**
     * Handles form submission.
     * Prevents default form behavior, sends a POST request to the registration API,
     * and navigates the user to the home page on success.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);

        if (profileImage) {
            formData.append('profile_image', profileImage);
        }

        try {
            const response = await api.post('/register/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            localStorage.setItem('token', response.data.access);
            navigate('/');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred during registration. Please try again.');
            }
        }
    };

    return (
        // Renders the registration form and centers it on the screen
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="row w-100">
                {/* Branding section */}
                <div className="col-12 col-md-6 text-center d-flex flex-column justify-content-center mb-4 mb-md-0">
                    <h1>Books&Films</h1>
                    <p>Join our community to share your thoughts on books and films!</p>
                </div>

                {/* Registration form section */}
                <div className="col-12 col-md-6 d-flex justify-content-center">
                    <form className="p-4 w-100" onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
                        <div className="custom_bg rounded p-4 shadow-lg">
                            {/* Header */}
                            <div className="text-center mb-4">
                                <h2 className="fs-1">Create Your Account</h2>
                                <p className="text-muted">Fill in the form below to join our community</p>
                            </div>

                            {/* Error message */}
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}

                            {/* Username input */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Username</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Choose a unique username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    aria-label="Username"
                                    required
                                />
                                <small className="form-text text-muted">
                                    Your username will be visible to others.
                                </small>
                            </div>

                            {/* Password input */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Create a secure password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    aria-label="Password"
                                    required
                                />
                                <small className="form-text text-muted">
                                    Must be at least 8 characters long.
                                </small>
                            </div>

                            {/* Email input */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Email</label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-label="Email"
                                    required
                                />
                                <small className="form-text text-muted">
                                    We’ll never share your email with anyone else.
                                </small>
                            </div>

                            {/* Profile image input */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Profile Image</label>
                                <input
                                    type="file"
                                    className="form-control form-control-lg"
                                    accept="image/*"
                                    onChange={(e) => setProfileImage(e.target.files[0])}
                                />
                                <small className="form-text text-muted">
                                    Upload a profile image (optional).
                                </small>
                            </div>

                            {/* Submit button */}
                            <div className="d-grid mt-4">
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Register
                                </button>
                            </div>

                            <div className="text-center mt-3">
                                <p className="text-muted">Already have an account? <Link className="text-primary" to="/login/">Login</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

