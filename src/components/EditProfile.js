import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/profile_style.css';
import { isTokenValid } from './Auth';
import api from './Api';


/**
 * UserProfile Component
 * 
 * This component displays and allows users to update their profile information, including 
 * username, email, name, biography, and profile picture. Additionally, it provides a form 
 * to change the user's password.
 *
 */

const UserProfile = () => {
    // State to hold user profile data, including biography and profile image
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        profile_image: null,
        biography: ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        new_password: '',
        confirm_new_password: ''
    });
    const [passwordError, setPasswordError] = useState(null);
    const [passwordSuccessMessage, setPasswordSuccessMessage] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const navigate = useNavigate();

    // Fetch user profile data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Retrieve token from local storage to authenticate the request
                const token = localStorage.getItem('token');

                // If no token, redirect to login page
                if (!isTokenValid()) {
                    navigate('/login/');
                    return;
                }

                // API call to fetch user profile data
                const response = await api.get('/user/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const user = {
                    ...response.data,
                    biography: response.data.biography && response.data.biography.trim() !== "null" && response.data.biography.trim() !== ""
                        ? response.data.biography
                        : "No biography available"
                };


                setUserData(user);
                setImagePreview(response.data.profile_image);
            } catch (error) {
                // Handle errors during data fetch and log them
                setError('Failed to fetch user data.');
                console.error("Error fetching user data", error);
                navigate('/register');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        // Call the function to fetch user data
        fetchUserData();
    }, [navigate]);

    // Handle changes in input fields (e.g., username, email, biography, etc.)
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    // Handle profile image file input change and generate preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUserData({ ...userData, profile_image: file });

        // Generate a URL for the image preview if a file is selected
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Handle form submission to update profile
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to send the profile data as multipart/form-data
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('first_name', userData.first_name);
        formData.append('last_name', userData.last_name);
        formData.append('biography', userData.biography);

        // Check if a new image file is selected and append it
        if (userData.profile_image instanceof File) {
            formData.append('profile_image', userData.profile_image);
        }

        try {
            // Get token from localStorage for authentication
            const token = localStorage.getItem('token');

            // API call to update user profile
            await api.put('/user/profile/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });

            // Display success message after successful update
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            // Handle errors during profile update
            setError('Failed to update profile.');
            console.error("Error updating profile", error);
        }
    };

    // Handle password change input
    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
    };

    // Handle password change form submission
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordData.new_password.length < 8) {
            setPasswordError('New password must be at least 8 characters long.');
            return;
        }

        if (passwordData.new_password !== passwordData.confirm_new_password) {
            setPasswordError('New passwords do not match.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userData.email || !emailRegex.test(userData.email)) {
            setError("Please provide a valid email address.");
            return false;
        }

        try {
            const token = localStorage.getItem('token');
            await api.post('/user/change-password/', {
                current_password: passwordData.current_password,
                new_password: passwordData.new_password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPasswordSuccessMessage('Password changed successfully!');
            setPasswordError(null); // Clear any previous errors
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            setPasswordError('Failed to change password.');
        }
    };

    const handleDeleteProfile = async () => {
        try {
            const token = localStorage.getItem('token');

            await api.delete('/user/profile/delete/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setDeleteSuccess(true);
            localStorage.removeItem('token'); // Remove token after deletion
            setTimeout(() => {
                navigate('/login'); // Redirect to login page
            }, 2500);
        } catch (error) {
            setError("Failed to delete profile.");
            console.error("Error deleting profile", error);
        }
    };

    const confirmDeleteProfile = () => {
        setShowDeleteModal(true);
    };


    // If loading, display a loading message
    if (loading) {
        return <div className="d-flex flex-column align-items-center mt-5">
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', minHeight: '150vh' }}>Loading...</h2>
        </div>;
    }

    if (deleteSuccess) {
        return <div className="d-flex flex-column align-items-center mt-5">
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', minHeight: '150vh' }}>Profile deleted successfully. Redirecting to login...</h2>
        </div>;
    }

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <h1 className="text-center my-5">Welcome {userData.username}</h1>

            {/* Display success or error message after updating profile */}
            {successMessage && <div className="alert alert-success w-50 w-md-100 text-center">{successMessage}</div>}
            {error && <div className="alert alert-danger w-50 w-md-100 text-center">{error}</div>}

            <form onSubmit={handleSubmit} className="w-50 w-md-100">
                <div className="form-group text-center">
                    {/* Display profile image preview if available */}
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Profile"
                            className="img-fluid rounded-circle mb-3"
                            style={{ width: '150px', height: '150px' }}
                        />
                    )}

                    {/* Custom file upload button */}
                    <div className="custom-file-upload mb-5">
                        <input
                            type="file"
                            id="fileInput"
                            className="file-input"
                            onChange={handleImageChange}
                            aria-label="Button to select another profile image"
                        />
                        <label htmlFor="fileInput" className="btn btn-primary">Upload File</label>
                    </div>
                </div>

                {/* Form fields to update profile data */}
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        aria-label="Edit username"
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        aria-label="Edit email"
                    />
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        value={userData.first_name}
                        onChange={handleChange}
                        aria-label="Edit first name"
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        value={userData.last_name}
                        onChange={handleChange}
                        aria-label="Edit last name"
                    />
                </div>

                {/* Textarea for biography input */}
                <div className="form-group mt-3">
                    <label>Biography</label>
                    <textarea
                        className="form-control"
                        name="biography"
                        rows="4"
                        value={userData.biography || ""}
                        onChange={(e) =>
                            setUserData((prevState) => ({
                                ...prevState,
                                biography: e.target.value,
                            }))
                        }
                        aria-label="Field to add or edit biography"
                    />
                </div>

                {/* Save changes button */}
                <div className="d-flex justify-content-center align-items-center m-5">
                    <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
                </div>
            </form>

            {/* Password change form */}
            <div className="w-50 w-md-100 mt-5">
                <h2 className="text-center mt-5">Change Password</h2>
                {passwordSuccessMessage && <div className="alert alert-success mt-3 text-center">{passwordSuccessMessage}</div>}
                {passwordError && <div className="alert alert-danger mt-3 text-center">{passwordError}</div>}
            </div>
            <form onSubmit={handlePasswordSubmit} className="w-50 w-md-100">
                <div className="mt-4">
                    <div className="form-group">
                        <label>Current Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="current_password"
                            value={passwordData.current_password}
                            onChange={handlePasswordChange}
                            aria-label="Filed for current password"
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="new_password"
                            value={passwordData.new_password}
                            onChange={handlePasswordChange}
                            aria-label="Filed for new password"
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirm_new_password"
                            value={passwordData.confirm_new_password}
                            onChange={handlePasswordChange}
                            aria-label="Filed for confirm new password"
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center align-items-center m-5">
                    <button type="submit" className="btn btn-primary mt-3">Change Password</button>
                </div>
            </form>
            <div className="text-center mt-4 mb-4">
                <button className="btn btn-danger" onClick={confirmDeleteProfile}>
                    Delete Profile
                </button>
            </div>

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Profile Deletion</h3>
                        <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
                        <div className="d-flex justify-content-around mt-4">
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    handleDeleteProfile();
                                    setShowDeleteModal(false);
                                }}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;