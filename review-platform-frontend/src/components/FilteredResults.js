import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { isTokenValid } from './Auth';

const FilteredReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const { categoryId, genreId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isTokenValid()) {
            navigate('/api/login/');
            return;
        }

        const token = localStorage.getItem('token');
        let apiUrl = '/reviews/';

        if (genreId) {
            apiUrl += `?genre=${genreId}`;
        } else if (categoryId) {
            apiUrl += `?category=${categoryId}`;
        }

        axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log(response.data);
            setReviews(response.data);
        })
        .catch(error => {
            setError('Failed to load reviews.');
            console.error(error);
        });
    }, [categoryId, genreId, navigate]);

    return (
        <div className="d-flex flex-column align-items-center">
            <h2>Reviews</h2>
            {error && <p>{error}</p>}
            <ul>
                {/* Map through the reviews array and render each review */}
                {reviews.map(review => (
                    <li key={review.id} className="mt-5">
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
                                            right: '-40px',
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
                        <div>
                            {/* Link to the detailed review page */}
                            <Link to={`/reviews/${review.id}`}>{review.title}</Link> - {review.author_director}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilteredReviews;


