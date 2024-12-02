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
import '../assets/css/Layout_style.css';

function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthPage = location.pathname === '/register' || location.pathname === '/login/';
    const [searchResults, setSearchResults] = useState([]);

    // Handle search results
    const handleSearchResults = (results) => {
        setSearchResults(results);
        navigate('/search-results');
    };

    // Clear search results
    const clearSearch = () => {
        setSearchResults([]);
        navigate('/');
    };

    return (
        <div className="layout-container">
            {/* Navbar */}
            <Navbar onSearch={handleSearchResults} clearSearch={clearSearch} />

            <div className="content-container">
                {!isAuthPage && (
                    <>
                        {/* Mobile-First Buttons */}
                        <div className="mobile-sidebar-buttons d-lg-none d-flex justify-content-between my-3">
                            <button
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#categoriesModal"
                            >
                                Categories
                            </button>
                            <button
                                className="btn btn-secondary"
                                data-bs-toggle="modal"
                                data-bs-target="#favoritesModal"
                            >
                                Favorites
                            </button>
                        </div>
                    </>
                )}

                {/* Main Content */}
                <div className="row">
                    {/* Categories Sidebar for Larger Screens */}
                    {!isAuthPage && (
                        <div className="col-lg-2 d-none d-lg-block">
                            <Categories />
                        </div>
                    )}

                    {/* Main Content Area */}
                    <div className={isAuthPage ? 'col-12' : 'col-lg-8 col-md-12'}>
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

                    {/* Favorites Sidebar for Larger Screens */}
                    {!isAuthPage && (
                        <div className="col-lg-2 d-none d-lg-block">
                            <Favorites />
                        </div>
                    )}
                </div>
            </div>

            {/* Modals for Categories and Favorites on Mobile */}
            <div className="modal fade" id="categoriesModal" tabIndex="-1" aria-labelledby="categoriesModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="categoriesModalLabel">Categories</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="favoritesModal" tabIndex="-1" aria-labelledby="favoritesModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="favoritesModalLabel">Favorites</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Favorites />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Layout;

