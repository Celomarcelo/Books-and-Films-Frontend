import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('/api/reviews/')
            .then(response => setReviews(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div class="col-md-8 text-center">
            <h1>Resenhas de Livros e Filmes</h1>
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
