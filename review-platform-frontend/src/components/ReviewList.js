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
    <div>
      <h1>Resenhas de Livros e Filmes</h1>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <Link to={`/reviews/${review.id}`}>{review.title}</Link> - {review.author_director}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
