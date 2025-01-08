import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isTokenValid } from './Auth';
import api from './Api';

/**
 * EditReview Component
 * 
 * This component allows users to edit an existing review. It fetches the review data using
 * the review ID from the URL, and provides form inputs for modifying the review fields.
 * It also includes functionality for image upload and form submission with error handling.
 */

const EditReview = () => {
    // Extract review ID from the route parameters
    const { reviewId } = useParams();

    // State for storing review data and form input values
    const [review, setReview] = useState({});
    const [form, setForm] = useState({
        title: '',
        content: '',
        genre: '',
        rating: '',
        img: null,
    });

    const [genres, setGenres] = useState([]);  // Stores genres associated with the review's category
    const [error, setError] = useState('');  // State to store error messages
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();  // Navigation hook for redirection
    const token = localStorage.getItem('token');  // Retrieve token from local storage

    // Fetch the review details from the server when the component is mounted
    useEffect(() => {
        // Check if the token is valid, if not, redirect to login page
        if (!isTokenValid()) {
            navigate('/login/');
            return;
        }

        // Fetch the review data from the server
        const fetchReview = async () => {
            try {
                const response = await api.get(`/reviews/${reviewId}/`, {
                    headers: { Authorization: `Bearer ${token}` },  // Include the token in the request header
                });
                const reviewData = response.data;

                setReview(reviewData);  // Sets review data in the state
                setForm({
                    title: reviewData.title,
                    content: reviewData.content,
                    genre: reviewData.genre,
                    rating: reviewData.rating,
                    img: null,  // Image upload is optional and will not be fetched
                });

                // Fetches genres based on category ID if present
                const categoryId = reviewData.category_id;
                if (categoryId) {
                    const categoryResponse = await api.get(`/categories/${categoryId}/genres/`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setGenres(categoryResponse.data);  // Updates genres in state
                }
            } catch (error) {
                // Handle error in fetching the review details
                setError('An error occurred while fetching the review details.');
                console.error(error);
            }
        };

        fetchReview();
    }, [reviewId, token, navigate]);

    const validateFields = () => {
        if (form.title.length < 3 || form.title.length > 100) {
            setError("Title must be between 3 and 100 characters.");
            return false;
        }

        if (form.content.length < 20 || form.content.length > 20000) {
            setError("Content must be between 20 and 20000 characters.");
            return false;
        }

        if (!form.genre) {
            setError("Please select a genre.");
            return false;
        }

        if (form.rating < 0 || form.rating > 5) {
            setError("Rating must be between 0 and 5.");
            return false;
        }

        setError("");
        return true;
    };

    /**
     * handleInputChange
     * 
     * This function updates the form state when the user types in the form fields.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;  // Get the input name and value
        setForm({
            ...form,
            [name]: value,  // Update the corresponding form field in the state
        });
    };

    /**
     * handleImageChange
     * 
     * This function handles the change event when a user selects an image to upload.
     */
    const handleImageChange = (e) => {
        const file = e.target.files[0];  // Get the selected image file
        setForm({
            ...form,
            img: file,  // Update the img field in the form state
        });
    };

    /**
     * handleSave
     * 
     * This function is called when the user saves the edited review.
     * It sends a PUT request to update the review on the server.
     */
    const handleSave = async () => {
        if (!validateFields()) {
            return; // Stop saving if validation fails
        }
        // Create FormData to handle both text and file uploads
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('content', form.content);
        formData.append('genre', form.genre);
        formData.append('rating', form.rating);

        if (form.img) {
            formData.append('img', form.img);  // If a new image was selected, append it
        }

        try {
            // Send PUT request to update the review
            await api.put(`/reviews/${reviewId}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Review updated successfully!');
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (error) {
            setError('An error occurred while saving the review.');
            console.error(error);
        }
    };

    /**
     * handleCancel
     * 
     * This function is called when the user cancels editing. It redirects to the profile page.
     */
    const handleCancel = () => {
        navigate('/profile');
    };

    return (
        <div className="d-flex flex-column align-items-center my-5">
            {/* Display error message if there is one */}
            {successMessage && <div className="alert alert-success w-50 w-md-100 text-center">{successMessage}</div>}
            {error && <div className="alert alert-danger w-50 w-md-100 text-center">{error}</div>}
            <div className="container my-5 text-center">
                {/* Display the current review title */}
                <h1>{review.title}</h1>
                {/* Title input field */}
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleInputChange}
                        className="form-control"
                        aria-label="Edit the review title"
                    />
                </div>

                {/* Content textarea field */}
                <div className="mb-3">
                    <label>Content</label>
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleInputChange}
                        className="form-control"
                        style={{ height: '200px' }}
                        aria-label="Edit the review content"
                    ></textarea>
                </div>

                {/* Genre input field */}
                <div className="mb-3">
                    <label>Genre</label>
                    <select
                        name="genre"
                        value={form.genre}
                        onChange={handleInputChange}
                        className="form-control"
                        aria-label="Select a genre for the review"
                    >
                        <option value="">{review.genre_name || "Select a genre"}</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Rating input field */}
                <div className="mb-3">
                    <label>Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={form.rating}
                        onChange={handleInputChange}
                        className="form-control"
                        min="0"
                        max="5"  // Limits rating input between 0 and 5
                        aria-label="Rate the review between 0 and 5"
                    />
                </div>

                {/* Image upload field */}
                <div className="mb-3">
                    <label>Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="form-control"
                        aria-label="Upload an image for the review"
                    />
                </div>

                {/* Save and Cancel buttons */}
                <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
                <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditReview;