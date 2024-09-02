import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import ReviewList from './components/ReviewList';
import Favorites from './components/Favorites';

function App() {
  return (
    <Router>
      <Navbar />
      <div class="container">
        <div class="row">
          <Favorites />
          <Routes>
            <Route path="/" element={<ReviewList />} />
          </Routes>
          <Favorites />
        </div>
      </div>
    </Router>
  );
}

export default App;
