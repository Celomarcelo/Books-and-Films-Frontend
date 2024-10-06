import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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