import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './NavBar';
import Categories from './Categories';
import ReviewList from './ReviewList';
import Register from './Register';
import Favorites from './Favorites';
import Login from './Login';
import Profile from './Profile';
import CreateReview from './CreateReview';
import UserProfile from './EditProfile';
import EditReview from './EditReview';
import UserReviewsList from './UserReviewsList';
import ReviewDetails from './ReviewDetails';
import FilteredReviews from './FilteredResults';
import SearchResults from './SearchResults';
import PasswordResetRequest from './PasswordResetRequest';
import PasswordResetConfirm from './PasswordResetConfirm';
import Footer from './Footer';
import '../assets/css/Layout_style.css'

/**
 * Layout Component
 * 
 * This component serves as the main layout for the application, managing navigation and structure.
 * It includes the Navbar, main content area, and sidebars for categories and favorites.
 * 
 */

function Layout() {
    const location = useLocation();  // Access the current URL location
    const navigate = useNavigate();  // Navigate between routes
    const isAuthPage = location.pathname === '/register' || location.pathname === '/login/';  // Check if current page is an auth page
    const [searchResults, setSearchResults] = useState([]);  // State to store search results



    // Handle search results and redirect to the search results page
    const handleSearchResults = (results) => {
        setSearchResults(results);
        navigate('/search-results');
    };

    // Clear search results and navigate back to the homepage
    const clearSearch = () => {
        setSearchResults([]);
        navigate('/');
    };

    return (
        <div className="background-container">
            {/* Navbar */}
            <div>
                <Navbar onSearch={handleSearchResults} clearSearch={clearSearch} />
            </div>

            {/* Mobile Top Bar */}
            {!isAuthPage && (
                <div className="mobile-top-bar d-md-none">
                    <button
                        className="btn btn-primary me-2"
                        data-bs-toggle="collapse"
                        data-bs-target="#categoriesDropdown"
                    >
                        Categories
                    </button>
                    <button
                        className="btn btn-secondary"
                        data-bs-toggle="collapse"
                        data-bs-target="#favoritesDropdown"
                    >
                        Favorites
                    </button>

                    {/* Dropdown for Categories */}
                    <div id="categoriesDropdown" className="collapse">
                        <Categories />
                    </div>

                    {/* Dropdown for Favorites */}
                    <div id="favoritesDropdown" className="collapse">
                        <Favorites />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="container-fluid mt-5">
                <div className="row">
                    {/* Sidebar for Categories for larger screens */}
                    {!isAuthPage && (
                        <div className="col-md-2 d-none d-md-block">
                            <Categories />
                        </div>
                    )}

                    {/* Main Content Area */}
                    <div className={isAuthPage ? 'col-12' : 'col-md-8'}>
                        <Routes>
                            <Route path="/" element={<ReviewList />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login/" element={<Login />} />
                            <Route path="/profile/" element={<Profile />} />
                            <Route path="/edit_profile/" element={<UserProfile />} />
                            <Route path="/reviews/create/" element={<CreateReview />} />
                            <Route path="/reviews/edit/:reviewId/" element={<EditReview />} />
                            <Route path="/user/:userId/reviewsList" element={<UserReviewsList />} />
                            <Route path="/reviews/:reviewId" element={<ReviewDetails />} />
                            <Route path="/reviews/category/:categoryId" element={<FilteredReviews />} />
                            <Route path="/reviews/genre/:genreId" element={<FilteredReviews />} />
                            <Route path="/search-results" element={<SearchResults results={searchResults} />} />
                            <Route path="/password_reset" element={<PasswordResetRequest />} />
                            <Route path="/reset/:uidb64/:token" element={<PasswordResetConfirm />} />
                        </Routes>
                    </div>

                    {/* Sidebar for Favorites for larger screens */}
                    {!isAuthPage && (
                        <div className="col-md-2 d-none d-md-block">
                            <Favorites />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Layout;

