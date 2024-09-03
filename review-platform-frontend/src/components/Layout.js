import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './NavBar';
import Categories from './Categories';
import ReviewList from './ReviewList';
import Register from './Register';
import Favorites from './Favorites';

function Layout() {
    const location = useLocation();
    const isRegisterPage = location.pathname === '/register';

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    {!isRegisterPage && <Categories />}
                    <Routes>
                        <Route path="/" element={<ReviewList />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                    {!isRegisterPage && <Favorites />}
                </div>
            </div>
        </div>
    );
}


export default Layout;