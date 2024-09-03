import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import ReviewList from './components/ReviewList';
import Favorites from './components/Favorites';
import Categories from './components/Categories';

function App() {
  return (
    <Router>
      <Navbar />
      <div class="container">
        <div class="row">
          <Categories />
          <Routes>
            <Route path="/" element={<ReviewList />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Favorites />
        </div>
      </div>
    </Router>
  );
}

export default App;
