import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/profile_style.css';

const UserReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', content: '', rating: '', genre: '' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserReviews = async () => {
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('/reviews/user/', {
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

    const deleteReview = async (reviewId) => {
        try {
            await axios.delete(`/reviews/${reviewId}/delete/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReviews(reviews.filter(review => review.id !== reviewId));
        } catch (error) {
            setError('An error occurred while deleting the review.');
            console.error(error);
        }
    };

    const handleEdit = (review) => {
        setEditMode(review.id);
        setEditForm({
            title: review.title,
            content: review.content,
            rating: review.rating,
            genre: review.genre,
        });
    };

    const saveEdit = async (reviewId) => {
        try {
            await axios.put(`/reviews/${reviewId}/edit/`, editForm, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReviews(
                reviews.map(review =>
                    review.id === reviewId ? { ...review, ...editForm } : review
                )
            );
            setEditMode(null);
        } catch (error) {
            setError('An error occurred while updating the review.');
            console.error(error);
        }
    };

    const cancelEdit = () => {
        setEditMode(null);
        setEditForm({ title: '', content: '', rating: '', genre: '' });
    };

    return 
