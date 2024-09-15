import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div>No user data available</div>;
    }

    return (
        <div className="container">
            <h1 className="text-center my-5">Welcome, {userData.username}!</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">User Information</h5>
                    {userData.profile_image && (
                        <img
                            src={userData.profile_image}
                            alt="Profile"
                            className="img-fluid rounded-circle mb-3"
                            style={{ width: '150px', height: '150px' }}
                        />
                    )}
                    <p className="card-text"><strong>Username:</strong> {userData.username}</p>
                    <p className="card-text"><strong>Email:</strong> {userData.email}</p>
                    <p className="card-text"><strong>First Name:</strong> {userData.first_name}</p>
                    <p className="card-text"><strong>Last Name:</strong> {userData.last_name}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
