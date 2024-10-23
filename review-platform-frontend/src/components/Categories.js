import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../assets/css/Category_genre_filter.css"

const FilterReviews = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [genresByCategory, setGenresByCategory] = useState({});

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
    onFilterChange(categoryId, null);
  };


  const handleGenreClick = (categoryId, genreId) => {
    onFilterChange(categoryId, genreId);
  };

  return (
    <div className="border border-secondary rounded p-3 text-center">
      <h3>Categories</h3>
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id}>
            <a
              href="#"
              className="category-link"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(category.id);
              }}
            >
              {category.name}
            </a>

            {genresByCategory[category.id] && (
              <ul className="genre-list">
                {genresByCategory[category.id].map((genre) => (
                  <li key={genre.id}>
                    <a
                      href="#"
                      className="genre-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleGenreClick(category.id, genre.id);
                      }}
                    >
                      {genre.name}
                    </a>
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
