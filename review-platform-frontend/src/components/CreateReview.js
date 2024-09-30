import React, { useState } from 'react';
import axios from 'axios';

const CreateReview = () => {
  const [title, setTitle] = useState('');
  const [authorDirector, setAuthorDirector] = useState('');
  const [content, setReviewContent] = useState('');
  const [img, setImg] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!title || !authorDirector || !reviewText) {
      setError('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author_director', authorDirector);
    formData.append('content', content);
    if (img) {
      formData.append('img', img);
    }

    axios.post('/api/reviews/create/', formData)
      .then(response => {
        setSuccess('Review created successfully!');
        setError('');
        setTitle('');
        setAuthorDirector('');
        setReviewContent('');
        setImg(null);
      })
      .catch(error => {
        setError('An error occurred while creating the review.');
        setSuccess('');
        console.error('Error creating review:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Review</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="p-4 bg-light rounded">
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
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="img" className="form-label">Upload an Image (optional)</label>
          <input
            type="file"
            className="form-control"
            id="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Submit Review</button>
        </div>
      </form>
    </div>
  );
};

export default CreateReview;
