import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/register_style.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/register/', {
            username,
            password,
            email,
        })
            .then(response => {
                localStorage.setItem('token', response.data.access);
                navigate('/');
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <form className="w-50 p-3" onSubmit={handleSubmit}>
                <div className="w-100 h-100 custom_bg rounded p-4">
                    <div className="text-center mb-4">
                        <h2 className="fs-1">Register</h2>
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
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
