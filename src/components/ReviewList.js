import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isTokenValid } from './Auth';
import '../assets/css/ReviewList_style.css';
import api from './Api';

/**
 * ReviewList Component
 * 
 * This component fetches and displays a list of book and movie reviews.
 * It checks for a valid token, fetches reviews, sorts them by creation date,
 * and handles any potential errors during the data fetching process.
 */
const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    /**
     * useEffect Hook
     * 
     * Runs on component mount and handles token validation, fetches reviews,
     * and sorts them by their creation date (newest first). Redirects the user
     * to the login page if token validation fails or an error occurs.
     */
    useEffect(() => {
        const token = localStorage.getItem('token');  // Retrieve the token from local storage

        // If the token is invalid, redirect to the login page
        if (!isTokenValid()) {
            navigate('/login/');
            return;
        }

        // Fetch the reviews from the API
        api.get('/reviews/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // Sort the reviews by creation date in descending order (newest first)
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const sortedReviews = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setReviews(sortedReviews);
                } else {
                    setError('There is no review at the moment.');
                }
            })
            .catch(error => {
                // Handle any errors by setting an error message and redirecting to login
                setError('Failed to fetch reviews. Please login again.');
                console.error(error);
                navigate('/login');
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
    }, [navigate]);

    if (loading) {
        return <div className="d-flex flex-column align-items-center mt-5">
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', minHeight: '150vh' }}>Loading...</h2>
        </div>;
    }

    return (
        // Render the list of reviews
        <div className="d-flex flex-column align-items-center mt-5" style={{ minHeight: '150vh' }}>
            <h1>Reviews</h1>
            {/* Display error message if there's an error */}
            {error && <p className="text-danger">{error}</p>}
            <ul>
                {/* Map through the reviews array and render each review */}
                {reviews.map(review => (
                    <li key={review.id} className="mt-5 genre-list">
                        <div className="review-container" style={{ position: 'relative', margin: 'auto' }}>
                            {/* If the review has an image, display it */}
                            {review.img && (
                                <img
                                    src={review.img}
                                    alt={review.title}
                                    className="img-fluid"
                                    style={{ maxWidth: '200px', height: 'auto', display: 'block', margin: '0 auto' }}
                                />
                            )}

                            {/* Display the user profile picture at the bottom-right corner of the review image */}
                            {review.user && review.user.profile_image && (
                                <Link to={`/user/${review.user.id}/reviewsList`}>
                                    <img
                                        src={review.user.profile_image}
                                        alt={review.user.username}
                                        className="profile-image"
                                        style={{
                                            position: 'absolute',
                                            bottom: '5px',
                                            right: '70px',
                                            width: '70px',
                                            height: '70px',
                                            borderRadius: '50%',
                                            border: '2px solid white',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Link>
                            )}
                        </div>
                        <div className='mt-2 text-center'>
                            {/* Link to the detailed review page */}
                            <Link to={`/reviews/${review.id}`}>{review.title}</Link> - {review.author_director}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;


