import React, { useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((user) => user.username === username || user.email === email);
    if (existingUser) {
      setError('Username or email already exists');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else if (!email.includes('@')) {
      setError('Invalid email address');
    } else {
      users.push({ username, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful');
      navigate('/login');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container p-5 text-center'>
        <h3>Register</h3>
        <div className='form-group form-center pr-5 pl-5'>
      <form onSubmit={handleSubmit} className='align-center' >
      
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className='form-control'
          
        /><br></br>
     
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className='form-control'
         
        /><br></br>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className='form-control'
        /><br></br>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className='form-control'
        /><br></br>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className='btn btn-primary'>Register</button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Register;