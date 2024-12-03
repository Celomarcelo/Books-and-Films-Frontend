import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/ReviewList_style.css';

const SearchResults = ({ results }) => {

    return (
        <div className="d-flex flex-column align-items-center pt-5 mt-5" style={{ minHeight: '150vh' }}>
            <h1>Search Results</h1>
            {results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul>
                    {results.map(result => (
                        <li key={result.id} className="mt-5 genre-list">
                            <div className="review-container" style={{ position: 'relative', margin: 'auto' }}>
                                {/* If the review has an image, display it */}
                                {result.img && (
                                    <img
                                        src={result.img}
                                        alt={result.title}
                                        className="img-fluid"
                                        style={{ maxWidth: '200px', height: 'auto', display: 'block', margin: '0 auto' }}
                                    />
                                )}

                                {/* Display the user profile picture */}
                                {result.user && result.user.profile_image && (
                                    <Link to={`/user/${result.user.id}/reviewsList`}>
                                        <img
                                            src={result.user.profile_image}
                                            alt={result.user.username}
                                            className="profile-image"
                                            style={{
                                                position: 'absolute',
                                                bottom: '5px',
                                                right: '70px',
                                                width: '70px',
                                                height: '70px',
                                                borderRadius: '50%',
                                                border: '2px solid white',
                                                objectFit: 'cover',
                                                cursor: 'pointer'
                                            }}
                                        />
                                    </Link>
                                )}
                            </div>
                            <div className='mt-2 text-center'>
                                <Link to={`/reviews/${result.id}`}>{result.title}</Link> - {result.author_director}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;
