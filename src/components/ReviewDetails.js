import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/css/ReviewDetails_style.css'
import { isTokenValid } from './Auth';
import api from './Api';

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
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');

    /**
     * useEffect Hook
     * 
     * This hook is used to fetch the review details when the component mounts.
     */
    useEffect(() => {
        // Redirect to login if the token is invalid
        if (!isTokenValid()) {
            navigate('/login/');
            return;
        }
        const fetchReviewDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                // Fetch review data from the API
                const response = await api.get(`/reviews-details/${reviewId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setReview(response.data);
                setLikes(response.data.likes || 0); // Initialize likes count
                setComments(response.data.comments || []); // Initialize comments
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            } catch (err) {
                console.error("Error fetching review details:", err);
                setError('Failed to load review details.');
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchReviewDetails();
    }, [reviewId, navigate]);

    const handleLike = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.post(`/reviews/${reviewId}/like/`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setLikes(response.data.likes); // Update likes count from response
            console.log("Likes:", likes);
        } catch (error) {
            console.error("Error liking review:", error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!newComment.trim()) return;

        try {
            const response = await api.post(`/reviews/${reviewId}/comments/`,
                { content: newComment },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setComments([...comments, response.data]); // Add new comment to the list
            setNewComment(''); // Clear comment input
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/comments/${commentId}/delete/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleUpdateComment = async (commentId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.put(`/comments/${commentId}/update/`,
                { content: editingCommentContent },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setComments(comments.map(comment =>
                comment.id === commentId ? { ...comment, content: response.data.content } : comment
            ));
            setEditingCommentId(null);
            setEditingCommentContent('');
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center  mt-5" style={{ minHeight: '150vh' }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error) {
        return <div className="d-flex flex-column align-items-center mt-5">{error}</div>;
    }

    return (
        <div className="d-flex flex-column align-items-center pt-5 mt-5 mb-5">
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
                    <p><strong>Genre:</strong> {review.genre_name}</p>
                    <p><strong>Rating:</strong> {review.rating}/5</p>
                    <p>{review.content}</p>

                    {/* Like Button */}
                    <div>
                        <button onClick={handleLike} className="btn btn-primary">
                            👍 Like {likes}
                        </button>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-4">
                        <h3>Comments</h3>
                        <ul className="comment-list">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <li key={comment.id}>
                                        {editingCommentId === comment.id ? (
                                            <>
                                                <textarea
                                                    value={editingCommentContent}
                                                    onChange={(e) => setEditingCommentContent(e.target.value)}
                                                    className="form-control"
                                                />
                                                <button
                                                    onClick={() => handleUpdateComment(comment.id)}
                                                    className="btn btn-success mt-1"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingCommentId(null);
                                                        setEditingCommentContent('');
                                                    }}
                                                    className="btn btn-secondary mt-1"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <strong>{comment.user_name}:</strong> {comment.content}
                                                {comment.user_id === parseInt(userId) && (
                                                    <>
                                                        <button
                                                            onClick={() => {
                                                                setEditingCommentId(comment.id);
                                                                setEditingCommentContent(comment.content);
                                                            }}
                                                            style={{
                                                                marginLeft: '20px',
                                                                color: 'blue',
                                                                borderRadius: '8px'
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteComment(comment.id)}
                                                            style={{
                                                                marginLeft: '10px',
                                                                color: 'red',
                                                                borderRadius: '8px'
                                                            }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <p>No comments yet.</p>
                            )}
                        </ul>


                        {/* Add new comment */}
                        <form onSubmit={handleCommentSubmit} className="mt-3">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="form-control"
                                placeholder="Add a comment..."
                            />
                            <button type="submit" className="btn btn-secondary mt-2">Post Comment</button>
                        </form>
                    </div>
                </>
            ) : (
                <p>Review not found.</p>
            )}
        </div>
    );
}

export default ReviewDetails;


