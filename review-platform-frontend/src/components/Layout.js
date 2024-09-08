import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './NavBar';
import Categories from './Categories';
import ReviewList from './ReviewList';
import Register from './Register';
import Favorites from './Favorites';
import Login from './Login';
import Profile from './Profile';

function Layout() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/Register' || location.pathname === '/api/login/';

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    {!isAuthPage && <Categories />}
                    <Routes>
                        <Route path="/" element={<ReviewList />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/api/login/" element={<Login />} />
                        <Route path="/profile/" element={<Profile />} />
                    </Routes>
                    {!isAuthPage && <Favorites />}
                </div>
            </div>
        </div>
    );
}


export default Layout;