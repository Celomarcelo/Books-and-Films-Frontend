import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/profile_style.css'

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
    const navigate = useNavigate();

    // Fetch user profile data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Retrieve token from local storage to authenticate the request
                const token = localStorage.getItem('token');

                // If no token, redirect to register page
                if (!token) {
                    navigate('/register');
                    return;
                }

                // API call to fetch user profile data
                const response = await axios.get('/api/user/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });


                setUserData(response.data);
                setImagePreview(response.data.profile_image);
            } catch (error) {
                // Handle errors during data fetch and log them
                setError('Failed to fetch user data.');
                console.error("Error fetching user data", error);
                navigate('/register');
            } finally {
                setLoading(false);
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
            await axios.put('/api/user/profile/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });

            // Display success message after successful update
            setSuccessMessage('Profile updated successfully!');
        } catch (error) {
            // Handle errors during profile update
            setError('Failed to update profile.');
            console.error("Error updating profile", error);
        }
    };

    // If loading, display a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // If an error occurs, display the error message
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="col-8">
            <h1 className="text-center my-5">Welcome {userData.username}</h1>

            {/* Display success message after updating profile */}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
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
                    <div className="custom-file-upload">
                        <input
                            type="file"
                            id="fileInput"
                            className="file-input"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="fileInput" className="btn btn-primary">Upload File</label>
                    </div>
                </div>

                {/* Form fields to update profile data */}
                <div className="d-flex flex-column align-items-center mt-4">
                    <div className="form-group w-50">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            value={userData.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group w-50">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            value={userData.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Textarea for biography input */}
                    <div className="form-group w-50 mt-3">
                        <label>Biography</label>
                        <textarea
                            className="form-control"
                            name="biography"
                            rows="4"
                            value={userData.biography}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Save changes button */}
                <div className="d-flex justify-content-center align-items-center m-5">
                    <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default UserProfile;

