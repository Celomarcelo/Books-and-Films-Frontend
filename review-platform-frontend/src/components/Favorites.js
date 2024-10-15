import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/css/Favorites_style.css';

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
    <div className="border border-secondary rounded p-3 text-center">
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((user) => (
            <Link key={user.id} to={`/user/${user.id}/reviewsList`} className="favorite-item">
              <img
                src={user.profile_image}
                alt={user.username}
                className="profile-image"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  border: '2px solid white',
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p>You have no favorite users.</p>
      )}
    </div>
  );
};

export default FavoritesList;
