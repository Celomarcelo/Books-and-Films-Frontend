import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Navbar Component
 * 
 * This component renders the navigation bar for the application, providing 
 * links to different sections.
 * It also includes a search bar. The navbar is responsive and collapses on 
 * smaller screens, with a toggle button to expand it.
 */
function Navbar() {
    // Retrieve the authentication token from localStorage
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    /**
     * handleLogout
     * 
     * This function clears the user's authentication token and userId from localStorage.
     * It also redirects the user to the login page after logging out.
     */
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/api/login/');
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* Branding - The name of the application */}
                {token ? (
                    <Link className="navbar-brand" to="/">Books&Films</Link>
                ) : (
                    <span className="navbar-brand">Books&Films</span>
                )}

                {/* Toggle button for collapsing navbar on smaller screens */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar links and search form */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Links to different sections of the application */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* If the user is logged in (token exists), show the authenticated links */}
                        {token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/reviews/create/">Create Review</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile/">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-danger nav-link"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            // If no token (user is not logged in), only show the Login link
                            <li className="nav-item">
                                <Link className="nav-link" to="/api/login/">Login</Link>
                            </li>
                        )}
                    </ul>

                    {/* Search bar form */}
                    {/* Search bar, visible only when the user is logged in */}
                    {token && (
                        <form className="d-flex">
                            <input 
                                className="form-control me-2" 
                                type="search" 
                                placeholder="Search" 
                                aria-label="Search" 
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
