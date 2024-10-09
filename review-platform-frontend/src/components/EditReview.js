import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isTokenValid } from './Auth';

const EditReview = () => {
    const { reviewId } = useParams();
    const [review, setReview] = useState({});
    const [form, setForm] = useState({
        title: '',
        content: '',
        genre: '',
        rating: '',
        img: null,
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {

        if (!isTokenValid()) {
            navigate('/api/login/');
            return;
        }
        const fetchReview = async () => {
            try {
                const response = await axios.get(`/reviews/${reviewId}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setReview(response.data);
                setForm({
                    title: response.data.title,
                    content: response.data.content,
                    genre: response.data.genre,
                    rating: response.data.rating,
                    img: null,
                });
            } catch (error) {
                setError('An error occurred while fetching the review details.');
                console.error(error);
            }
        };

        fetchReview();
    }, [reviewId, token, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setForm({
            ...form,
            img: file,
        });
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('content', form.content);
        formData.append('genre', form.genre);
        formData.append('rating', form.rating);

        if (form.img) {
            formData.append('img', form.img);
        }

        try {
            await axios.put(`/reviews/${reviewId}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/profile');
        } catch (error) {
            setError('An error occurred while saving the review.');
            console.error(error);
        }
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    return (
        <div className="d-flex flex-column align-items-center my-5">
            <div className="container my-5 text-center">
                <h1>{review.title}</h1>
                {error && <p className="text-danger">{error}</p>}
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Content</label>
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleInputChange}
                        className="form-control"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label>Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={form.genre}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={form.rating}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
                <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditReview;