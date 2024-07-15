import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Lists = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Fetch Todos Error:', error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/todos`, {
        task,
        completed: false,
        userId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos([...todos, response.data]);
      setTask('');
    } catch (error) {
      console.error('Add Task Error:', error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        completed: !completed
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));
    } catch (error) {
      console.error('Toggle Complete Error:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Delete Task Error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-700">To-Do List</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <form onSubmit={addTask} className="mb-8">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Add a new task"
          required
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center bg-white shadow-md rounded mb-4 p-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, todo.completed)}
                className="mr-4"
              />
              <span className={todo.completed ? 'line-through' : ''}>
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => deleteTask(todo.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lists;