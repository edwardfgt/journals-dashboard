import React, { useState } from 'react';
import { useLogin } from '../../services/api';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await useLogin({ username, password });
            console.log('API Response:', response);
            if (response && response.token) {
                localStorage.setItem('token', response.token);
                console.log(response.message);
                onLoginSuccess();
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed, please check your credentials.');

            if (error.response) {
                console.error('Error response:', error.response);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-tremor-background dark:bg-dark-tremor-background">
            <div className="w-full max-w-md p-6 space-y-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                    Login to your account
                </h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;