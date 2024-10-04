import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/profile_style.css';

const UserReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); 
    useEffect(() => {
        const fetchUserReviews = async () => {
            if (!token) {
                navigate('/login'); 
                return;
            }

            try {
                const response = await axios.get('/api/reviews/user/', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });

                setReviews(response.data);
            } catch (error) {
                setError('An error occurred while fetching the reviews.');
                console.error(error);
            }
        };

        fetchUserReviews();
    }, [token, navigate]);

