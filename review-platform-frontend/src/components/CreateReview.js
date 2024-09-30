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



export default CreateReview;
