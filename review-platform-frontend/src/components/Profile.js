import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/profile_style.css'

const UserProfile = () => {
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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/register');
                    return;
                }

                const response = await axios.get('/api/user/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserData(response.data);
                setImagePreview(response.data.profile_image);
            } catch (error) {
                setError('Failed to fetch user data.');
                console.error("Error fetching user data", error);
                navigate('/register');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUserData({ ...userData, profile_image: file });

        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('first_name', userData.first_name);
        formData.append('last_name', userData.last_name);
        formData.append('biography', userData.biography); 
        if (userData.profile_image instanceof File) {
            formData.append('profile_image', userData.profile_image);
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/user/profile/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            setSuccessMessage('Profile updated successfully!');
        } catch (error) {
            setError('Failed to update profile.');
            console.error("Error updating profile", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="col-8">
            <h1 className="text-center my-5">Welcome {userData.username}</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group text-center">
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Profile"
                            className="img-fluid rounded-circle mb-3"
                            style={{ width: '150px', height: '150px' }}
                        />
                    )}
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
                <div className="d-flex justify-content-center align-items-center m-5">
                    <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default UserProfile;
