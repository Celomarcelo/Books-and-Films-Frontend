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

function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthPage = location.pathname === '/register' || location.pathname === '/api/login/';
    const [searchResults, setSearchResults] = useState([]);

    const stickyColumnStyle = {
        position: 'sticky',
        top: '100px',
        height: 'calc(100vh - 100px)',
    };

    const navbarStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
    };

    const handleSearchResults = (results) => {
        setSearchResults(results);
        navigate('/search-results');
    };

    const clearSearch = () => {
        setSearchResults([]);
        navigate('/');
    };

    return (
        <div>
            <div style={navbarStyle}>
                <Navbar onSearch={handleSearchResults} clearSearch={clearSearch} />
            </div>
            <div className="container mt-5">
                <div className="row">
                    {!isAuthPage && (
                        <div className="col-md-2" style={stickyColumnStyle}>
                            <Categories />
                        </div>
                    )}
                    <div className={isAuthPage ? 'col-md-12' : 'col-md-8'}>
                        <Routes>
                            <Route path="/" element={<ReviewList />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/api/login/" element={<Login />} />
                            <Route path="/profile/" element={<Profile />} />
                            <Route path="/edit_profile/" element={<UserProfile />} />
                            <Route path="/reviews/create/" element={<CreateReview />} />
                            <Route path="/reviews/edit/:reviewId/" element={<EditReview />} />
                            <Route path="/user/:userId/reviewsList" element={<UserReviewsList />} />
                            <Route path="/reviews/:reviewId" element={<ReviewDetails />} />
                            <Route path="/reviews/category/:categoryId" element={<FilteredReviews />} />
                            <Route path="/reviews/genre/:genreId" element={<FilteredReviews />} />
                            <Route path="/search-results" element={<SearchResults results={searchResults} />} />
                        </Routes>
                    </div>
                    {!isAuthPage && (
                        <div className="col-md-2" style={stickyColumnStyle}>
                            <Favorites />
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default Layout;
