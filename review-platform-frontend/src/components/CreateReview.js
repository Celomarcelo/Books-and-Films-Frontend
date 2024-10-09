import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/CreateReview_style.css';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from './Auth';


const CreateReview = () => {
    const [title, setTitle] = useState('');
    const [authorDirector, setAuthorDirector] = useState('');
    const [content, setReviewContent] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [img, setImg] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        if (!isTokenValid()) {
            navigate('/api/login/');
            return;
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
    
        try {
            if (!title || !authorDirector || !content) {
                setError('Please fill in all required fields.');
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('author_director', authorDirector);
            formData.append('content', content);
            formData.append('genre', genre);
            formData.append('rating', rating);
            if (img) {
                formData.append('img', img);
            }

            await axios.post('/reviews/create/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess('Review created successfully!');
            setError('');
            setTitle('');
            setAuthorDirector('');
            setReviewContent('');
            setGenre('');
            setRating('');
            setImg(null);
            navigate('/');

        } catch (error) {
            setError('An error occurred while creating the review.');
            setSuccess('');

            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }

            console.error('Full error object:', error);
        }
    };

    return (
        <div className="container mt-5 pt-5 text-center">
            <h2>Create a New Review</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit} className="p-4 bg-light rounded mt-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="author_director" className="form-label">Author/Director</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author_director"
                        value={authorDirector}
                        onChange={(e) => setAuthorDirector(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Review</label>
                    <textarea
                        className="form-control"
                        id="content"
                        rows="4"
                        value={content}
                        onChange={(e) => setReviewContent(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <input
                        type="text"
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <input
                        type="number"
                        placeholder="Rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="img" className="btn btn-primary">Upload an Image (optional)</label>
                    <div className="custom-file-upload">
                        <input
                            type="file"
                            className="file-input"
                            id="img"
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                    </div>
                    {img && (
                        <div className="mt-2">
                            <small><strong>Selected file:</strong> {img.name}</small>
                        </div>
                    )}
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Submit Review</button>
                </div>
            </form>
        </div>
    );
};

export default CreateReview;
