import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { isTokenValid } from './Auth';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!isTokenValid()) {
            navigate('/api/login/');
            return;
        }

        axios.get('/api/reviews/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => setReviews(response.data))
        .catch(error => {
            setError('Failed to fetch reviews. Please login again.'); 
            console.error(error);
            navigate('/api/login/'); 
        });
    }, [navigate]); 

    return (
        <div className="d-flex flex-column align-items-center pt-5 mt-5">
            <h1>Resenhas de Livros e Filmes</h1>
            {error && <p className="text-danger">{error}</p>}
            <ul>
                {reviews.map(review => (
                    <li key={review.id} className="mt-5">
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
