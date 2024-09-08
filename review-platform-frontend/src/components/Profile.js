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
    }, []);

    return (
        <div className="container">
            <h2 className="mt-4">User Profile</h2>
            <div className="card mt-4">
                <div className="card-body">
                    <h5 className="card-title">{user.firstName}{user.lastName}</h5>
                    <p><strong>User name:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;