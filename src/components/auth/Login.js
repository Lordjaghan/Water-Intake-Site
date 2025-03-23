import React, { useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';
import checkGuest from './CheckAuth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      // localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('Login successful');
      dispatch(setUser(user));
      navigate('/addintake');
    } else {
      setError('Invalid username or password');
      navigate('/register')
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container text-center'>
        <h3>Login</h3>
      <div className='form-group  pr-5 pl-5'>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className='form-control'

        /><br></br>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className='form-control'
        /><br></br>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className='btn btn-primary'>Login</button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default checkGuest(Login);