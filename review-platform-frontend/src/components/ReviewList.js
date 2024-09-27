import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get('/api/reviews/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => setReviews(response.data))
                .catch(error => {
                    setError('Failed to fetch reviews. Please login again.');
                    console.error(error);
                });
        } else {
            setError('Please login.');
        }
    }, []);

    return (
        <div className="col-md-8 text-center">
            <h1>Resenhas de Livros e Filmes</h1>
            {error && <p className="text-danger">{error}</p>}
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        {review.img && (
                            <img
                                src={review.img}
                                alt={review.title}
                                className="img-fluid mb-2"
                                style={{ maxWidth: '200px', height: 'auto' }}
                            />
                        )}
                        <div>
                            <Link to={`/reviews/${review.id}`}>{review.title}</Link> - {review.author_director}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;
