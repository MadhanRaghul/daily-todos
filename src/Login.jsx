import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'use-local-storage'; // Correct import

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = `${import.meta.env.VITE_API_URL}`;
  const [token, setToken] = useState(localStorage.getItem('token') || '');

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    const { token } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    navigate('/lists');
  } catch (error) {
    setError('Invalid username or password');
    console.error('Login Error:', error);
  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-center text-gray-700 text-xl font-bold mb-4">
            Login
          </h2>
          {error && (
            <p className="text-red-500 text-xs italic mb-4">{error}</p>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
