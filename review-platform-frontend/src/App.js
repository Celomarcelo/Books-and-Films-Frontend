import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReviewList from './components/ReviewList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReviewList />} />
      </Routes>
    </Router>
  );
}

export default App;
