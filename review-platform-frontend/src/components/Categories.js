import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../assets/css/Category_genre_filter.css";

const FilterReviews = () => {
  const [categories, setCategories] = useState([]);
  const [genresByCategory, setGenresByCategory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchCategoriesAndGenres = async () => {
      try {
        const categoriesResponse = await axios.get('/categories/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const categoriesData = categoriesResponse.data;
        setCategories(categoriesData);

        const genresData = {};
        for (const category of categoriesData) {
          const genresResponse = await axios.get(`/categories/${category.id}/genres/`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          genresData[category.id] = genresResponse.data;
        }
        setGenresByCategory(genresData);
      } catch (error) {
        console.error('Error fetching categories and genres:', error);
      }
    };
    fetchCategoriesAndGenres();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/reviews/category/${categoryId}`);
  };

  const handleGenreClick = (categoryId, genreId) => {
    navigate(`/reviews/genre/${genreId}`);
  };

  return (
    <div className="border border-secondary rounded p-3 text-center">
      <h3>Categories</h3>
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              className="category-link"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>

            {genresByCategory[category.id] && (
              <ul className="genre-list">
                {genresByCategory[category.id].map((genre) => (
                  <li key={genre.id}>
                    <button
                      className="genre-link"
                      onClick={() => handleGenreClick(category.id, genre.id)}
                    >
                      {genre.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterReviews;

