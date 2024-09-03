import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar';
import ReviewList from './components/ReviewList';
import Favorites from './components/Favorites';
import Categories from './components/Categories';
import Register from './components/Register';

function App() {

  const location = useLocation();

  const isRegisterPage = location.pathname === '/register';

  return (
    <div className="w-100 h-100">
      <Router>
        {!isRegisterPage && <Navbar />}
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
      </Router>
    </div>
  );
}

export default App;
