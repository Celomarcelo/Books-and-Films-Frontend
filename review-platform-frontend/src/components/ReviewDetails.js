import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

/**
 * ReviewDetails Component
 * 
 * This component fetches and displays the details of a review based on the review ID.
 * It retrieves the review ID from the URL parameters, makes an API request to 
 * fetch the review data, and then renders the details on the page.
 */
function ReviewDetails() {
    // Retrieve the reviewId from the URL using useParams
    const { reviewId } = useParams();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * useEffect Hook
     * 
     * This hook is used to fetch the review details when the component mounts.
     */
    useEffect(() => {
        const fetchReviewDetails = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    setError('Token not found.');
                    setLoading(false);
                    return;
                }

                // Fetch review data from the API
                const response = await axios.get(`/reviews-details/${reviewId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setReview(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching review details:", err);
                setError('Failed to load review details.');
                setLoading(false);
            }
        };

        fetchReviewDetails();
    }, [reviewId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="d-flex flex-column align-items-center pt-5 mt-5">
            {/* Check if review data is available */}
            {review ? (
                <>
                    {/* Associated image */}
                    {review.img && (
                        <div className="my-4">
                            <img
                                src={review.img}
                                alt={review.title}
                                className="img-fluid"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                    )}
                    <h1>{review.title}</h1>
                    <p><strong>Author/Director:</strong> {review.author_director}</p>
                    <p><strong>Genre:</strong> {review.genre}</p>
                    <p><strong>Rating:</strong> {review.rating}/5</p>
                    <p>{review.content}</p>

                </>
            ) : (
                <p>Review not found.</p>
            )}
        </div>
    );
}

export default ReviewDetails;
