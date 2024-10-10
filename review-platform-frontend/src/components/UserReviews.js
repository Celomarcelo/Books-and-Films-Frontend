import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserReviews = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(``);
                setUser(userResponse.data);

                const reviewsResponse = await axios.get(``);
                setReviews(reviewsResponse.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data.');
            }
        };

        fetchUserData();
    }, [userId]);

    return ( );
};

export default UserReviews;
