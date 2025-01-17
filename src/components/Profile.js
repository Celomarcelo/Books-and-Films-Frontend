import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from './Auth';
import api from './Api';
/**
 * UserReviews Component
 * 
 * This component fetches and displays the current user's profile and their reviews.
 * It also allows the user to edit or delete their reviews and update their profile.
 */
const UserReviews = () => {
    const [user, setUser] = useState({});
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [success, setSuccess] = useState('');

    // If token is invalid, redirect to the login page
    useEffect(() => {
        if (!isTokenValid()) {
            navigate('/login/');
            return;
        }

        // Fetch user profile data
        api.get('/user/profile/', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

        // Fetch the user's reviews
        const fetchUserReviews = async () => {
            try {
                const response = await api.get('/reviews/user/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const sortedReviews = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setReviews(sortedReviews);
            } catch (error) {
                setError('An error occurred while fetching the reviews.');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchUserReviews();
    }, [token, navigate]);

    // Navigates to the profile editing page
    const handleEditProfile = () => {
        navigate('/edit_profile/');
    };

    // Deletes a review by ID and updates the review list in the UI
    const deleteReview = (reviewId) => {
        setConfirmDeleteId(reviewId);
    };

    const handleConfirmDelete = async (reviewId) => {
        try {
            await api.delete(`/reviews/${reviewId}/delete/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReviews(reviews.filter(review => review.id !== reviewId));
            setSuccess('Review deleted successfully!');
        } catch (error) {
            setError('An error occurred while deleting the review.');
            setSuccess('');
        } finally {
            setConfirmDeleteId(null);
        }
    };

    // Navigates to the review editing page with the selected review ID
    const handleEdit = (reviewId) => {
        navigate(`/reviews/edit/${reviewId}`);
    };

    if (loading) {
        return <div className="d-flex flex-column align-items-center mt-5">
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', minHeight: '150vh' }}>Loading...</h2>
        </div>;
    }

    return (
        <div className="d-flex flex-column align-items-center my-5" style={{ minHeight: '150vh' }}>
            {/* User Profile Section */}
            <div className="d-flex align-items-center mb-4 mt-5">
                {user.profile_image && (
                    <img
                        src={user.profile_image} // Displays the user's profile image if available
                        alt="User Profile"
                        className="rounded-circle"
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '15px' }}
                    />
                )}
                <button
                    className="btn btn-outline-primary"
                    onClick={handleEditProfile} // Button to edit user profile
                >
                    Edit Profile
                </button>
            </div>
            <div>
                {/* Button to navigate to Django admin panel, visible only to superusers */}
                {user.is_superuser && (
                    <button
                        className="btn btn-outline-primary mt-3"
                        onClick={() => window.open('https://books-and-films-api-12373ad9b35f.herokuapp.com/admin/', '_blank')}
                    >
                        Admin Panel
                    </button>
                )}
            </div>
            <h1>Hello {user.username}, Welcome to your reviews!</h1>
            {success && <div className="alert alert-success">{success}</div>}  {/* Display success message if any */}
            {error && <p className="text-danger">{error}</p>} {/* Displays error messages, if any */}

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
                                <p><strong>Genre:</strong> {review.genre_name}</p>
                                <p><strong>Rating:</strong> {review.rating}/5</p>
                                {/* Buttons to edit or delete the review */}
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

            {confirmDeleteId && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete this review?</p>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleConfirmDelete(confirmDeleteId)}
                        >
                            Yes
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setConfirmDeleteId(null)}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserReviews;



