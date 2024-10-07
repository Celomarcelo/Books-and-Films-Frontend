import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserReviews = () => {
    const [user, setUser] = useState({});
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('/api/user/profile/', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

        const fetchUserReviews = async () => {

            try {
                const response = await axios.get('/reviews/user/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                console.log("Reviews Response:", response.data);
                setReviews(response.data);
            } catch (error) {
                setError('An error occurred while fetching the reviews.');
                console.error(error);
            }
        };

        fetchUserReviews();
    }, [token, navigate]);

    const handleEditProfile = () => {
        navigate('/edit_profile/');
    };

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

    const handleEdit = (reviewId) => {
        console.log('Edit review with ID:', reviewId);
        navigate(`/reviews/edit/${reviewId}`);
    };

    return (
        <div className="d-flex flex-column align-items-center my-5">
            <div className="d-flex align-items-center mb-4 mt-5">
                {user.profile_image && (
                    <img
                        src={user.profile_image}
                        alt="User Profile"
                        className="rounded-circle"
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '15px' }}
                    />
                )}
                <button
                    className="btn btn-outline-primary"
                    onClick={handleEditProfile}
                >
                    Edit Profile
                </button>
            </div>
            <h1>Hello {user.username}, Welcome to your reviews!</h1>
            {error && <p className="text-danger">{error}</p>}

            <ul className="list-unstyled">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <li key={review.id} className="mb-4">
                            {review.img && (
                                <div className="d-flex justify-content-center mb-2">
                                    <img
                                        src={review.img}
                                        alt={review.title}
                                        className="img-fluid"
                                        style={{ maxWidth: '200px', height: 'auto' }}
                                    />
                                </div>
                            )}
                            <div className="text-center">
                                <h4>{review.title}</h4>
                                <p><strong>Author/Director:</strong> {review.author_director}</p>
                                <p>{review.content}</p>
                                <p><strong>Genre:</strong> {review.genre}</p>
                                <p><strong>Rating:</strong> {review.rating}/10</p>
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => handleEdit(review.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteReview(review.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No reviews found.</p>
                )}
            </ul>
        </div>
    );
};

export default UserReviews;


