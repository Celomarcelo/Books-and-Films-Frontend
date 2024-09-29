import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

    const stickyColumnStyle = {
        position: 'sticky',
        top: '80px',
        height: 'calc(100vh - 80px)',
    };

    const navbarStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
    };

    return (
        <div>
            <div style={navbarStyle}>
                <Navbar />
            </div>
            <div className="container">
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
                        </Routes>
                    </div>
                    {!isAuthPage && (
                        <div className="col-md-2" style={stickyColumnStyle}>
                            <Favorites />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export default Layout;