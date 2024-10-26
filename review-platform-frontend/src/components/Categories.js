import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../assets/css/Category_genre_filter.css";

const FilterReviews = () => {
  const [categories, setCategories] = useState([]);
  const [genresByCategory, setGenresByCategory] = useState({});
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState({});

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

  const handleGenreClick = (genreId) => {
    navigate(`/reviews/genre/${genreId}`);
  };

  const toggleDropdown = (categoryId) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <div className="border border-secondary rounded p-3 text-center">
      <h3>Categories</h3>
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id}>
            {/* Button to toggle dropdown for genres */}
            <button
              className="category-link"
              onClick={() => toggleDropdown(category.id)}
            >
              {category.name}
            </button>

            {/* Dropdown menu for genres */}
            {dropdownOpen[category.id] && genresByCategory[category.id] && (
              <ul className="dropdown-menu show">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    All {category.name}
                  </button>
                </li>
                {genresByCategory[category.id].map((genre) => (
                  <li key={genre.id}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleGenreClick(genre.id)}
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


