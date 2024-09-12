import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
    });

    useEffect(() => {

        const token = localStorage.getItem('token');

        if (token) {
            axios.get('/api/user/profile/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error("Error", error);
                });
        } else {
            console.error("Token not found");
        }
    }, []);

    return (
        <div className="container">
            <h1 className="text-center my-5">Welcome, {user.username}!</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">User Information</h5>
                    <p className="card-text"><strong>Username:</strong> {user.username}</p>
                    <p className="card-text"><strong>Email:</strong> {user.email}</p>
                    <p className="card-text"><strong>First Name:</strong> {user.first_name}</p>
                    <p className="card-text"><strong>Last Name:</strong> {user.last_name}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;