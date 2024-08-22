import React, { useState } from 'react';
import { useLogin } from '../services/api';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const login = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login.mutateAsync({ username, password });
            localStorage.setItem('token', data.token);
            onLoginSuccess();
        } catch (error) {
            setError('Login failed, please check your credentials.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 md:p-10 max-w-7xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;