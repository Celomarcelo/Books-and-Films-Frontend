import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [passwordError, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/login/', {
            username,
            password,
        })
            .then(response => {
                console.log("Login Response:", response.data);
                localStorage.setItem('token', response.data.access);
                navigate('/profile/');
            })
            .catch(error => console.error("Login Error:", error));
            setError('Enter with a valid ID or password.');
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="text-center" style={{ marginRight: '150px' }}>
                <h1>Books&Films</h1>
                <p>Share ideas about books and films!</p>
            </div>
            <form className="p-3" onSubmit={handleSubmit}>
                <div className="w-100 bg-secondary rounded p-4">
                    <div className="text-center mb-4">
                        <h2 className="fs-1">Login</h2>
                        {passwordError && <div className="alert alert-danger mt-3 text-center">{passwordError}</div>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Login
                        </button>
                    </div>
                    <div className="text-center m-4">
                        <p>
                            Don't have an account yet? You can register <Link  className="text-primary" to="/Register">here</Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;