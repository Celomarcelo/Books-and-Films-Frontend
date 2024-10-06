import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/profile_style.css';

const UserReviews = () => {
    const [user, setUser] = useState({});
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(null);
    const [editForm, setEditForm] = useState({});
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
            })

        const fetchUserReviews = async () => {

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

    const handleEdit = (review) => {
        setEditMode(review.id);
        setEditForm(review);
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
            <h1>Hello {user.username},Welcome to your reviews!</h1>
            {error && <p className="text-danger">{error}</p>}

            <ul className="list-unstyled">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <li key={review.id} className="mb-4">
                            {editMode === review.id ? (
                                <div className="text-center">
                                    <h4>Editando: {review.title}</h4>
                                    <input
                                        type="text"
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                        className="form-control my-2"
                                    />
                                    <textarea
                                        value={editForm.content}
                                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                                        className="form-control my-2"
                                    ></textarea>
                                    <input
                                        type="text"
                                        value={editForm.genre}
                                        onChange={(e) => setEditForm({ ...editForm, genre: e.target.value })}
                                        className="form-control my-2"
                                    />
                                    <input
                                        type="number"
                                        value={editForm.rating}
                                        onChange={(e) => setEditForm({ ...editForm, rating: e.target.value })}
                                        className="form-control my-2"
                                    />
                                    <div>
                                        <button className="btn btn-success me-2" onClick={() => saveEdit(review.id)}>
                                            Save
                                        </button>
                                        <button className="btn btn-danger" onClick={cancelEdit}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
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
                                        <p><strong>Autor/Diretor:</strong> {review.author_director}</p>
                                        <p>{review.content}</p>
                                        <p><strong>Gênero:</strong> {review.genre}</p>
                                        <p><strong>Avaliação:</strong> {review.rating}/10</p>
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={() => handleEdit(review)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteReview(review.id)}
                                        >
                                            Deletar
                                        </button>
                                    </div>
                                </div>
                            )}
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