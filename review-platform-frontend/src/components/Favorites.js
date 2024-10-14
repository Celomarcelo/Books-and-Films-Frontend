import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/user/favorites/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setFavorites(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setError('Failed to load favorites.');
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (loading) {
        return <div>Loading favorites...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="border border-secondary rounded p-3">
            <h2>Favorites</h2>
            <ul className="list-unstyled">
                {favorites.length > 0 ? (
                    favorites.map((user) => (
                        <li key={user.id} className="d-flex align-items-center mb-3">
                            <Link to={`/user/${user.id}/reviewsList`}>
                                    <img
                                        src={user.profile_image}
                                        alt={user.username}
                                        className="profile-image"
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            border: '2px solid white',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Link>
                        </li>
                    ))
                ) : (
                    <p>You have no favorite users.</p>
                )}
            </ul>
        </div>
    );
};

export default FavoritesList;
