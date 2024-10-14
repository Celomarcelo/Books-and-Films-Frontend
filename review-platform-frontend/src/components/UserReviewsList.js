import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserReviewsList = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userResponse = await axios.get(`/user/${userId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUser(userResponse.data);

                const reviewsResponse = await axios.get(`/user/${userId}/reviews/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setReviews(reviewsResponse.data);

                const favoritesResponse = await axios.get(`/user/favorites/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setFavorites(favoritesResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const toggleFavorite = async (favoriteUserId) => {
        try {
            const response = await axios.post(`/user/${favoriteUserId}/favorite/`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            alert(response.data.message);

            const favoritesResponse = await axios.get(`/user/favorites/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setFavorites(favoritesResponse.data);
        } catch (error) {
            console.error('Error favoriting user:', error);
            setError('Failed to update favorites.');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="d-flex flex-column align-items-center my-5">
            <div className="d-flex align-items-center mb-4 mt-5">
                {user.profile_image && (
                    <img
                        src={user.profile_image} // Displays the user's profile image if available
                        alt="User Profile"
                        className="rounded-circle"
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '15px' }}
                    />
                )}
            </div>
            <h1>{user.username}</h1>
            <p>{user.biography}</p>

            <button className="btn btn-primary btn-lg mt-3" onClick={() => toggleFavorite(userId)}>
                {favorites.some(fav => fav.id === user.id) ? 'Unfavorite' : 'Favorite'}
            </button>

            <h2 className="mt-5">Reviews</h2>
            {/* Reviews List */}
            <ul className="list-unstyled">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <li key={review.id} className="mb-4 mt-5">
                            {/* Displays review image if available */}
                            {review.img && (
                                <div className="d-flex justify-content-center mb-2 mt-5">
                                    <img
                                        src={review.img}
                                        alt={review.title}
                                        className="img-fluid"
                                        style={{ maxWidth: '200px', height: 'auto' }}
                                    />
                                </div>
                            )}
                            {/* Review Details */}
                            <div className="text-center">
                                <h4>{review.title}</h4>
                                <p><strong>Author/Director:</strong> {review.author_director}</p>
                                <p>{review.content}</p>
                                <p><strong>Genre:</strong> {review.genre}</p>
                                <p><strong>Rating:</strong> {review.rating}/5</p>
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

export default UserReviewsList;

