// IntakeForm.js
import React, { useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import checkAuth from '../auth/CheckAuth';
function AddIntake() {
  const [intake, setIntake] = useState('');
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
 const navigate=useNavigate()
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const intakeData = JSON.parse(localStorage.getItem('intakeData')) || {};
    const date = new Date().toISOString().split('T')[0];
    if (intakeData[user.username] && intakeData[user.username][date]) {
      setError('You have already logged your intake for today');
    } else {
      if (!intakeData[user.username]) {
        intakeData[user.username] = {};
      }
      intakeData[user.username][date] = { intake, date, time: new Date().toLocaleTimeString() };
      localStorage.setItem('intakeData', JSON.stringify(intakeData));
      alert('Intake logged successfully');
      navigate('/listintake')
    }
  };

  return (
    <div>
        <Navbar/>
        <div className='container text-center p-5 w-50'>
          <h3>Add Your Intake.</h3>
    <form onSubmit={handleSubmit} >
      <input
        type="number"
        value={intake}
        onChange={(e) => setIntake(e.target.value)}
        placeholder="Water intake (ml)"
        className='form-control'
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" className='btn btn-primary'>Log Intake</button>
    </form><br></br>
    <Link to="/listintake" className='btn btn-primary'>Lists Intake</Link>
    <Link to="/compareintake"  className='btn btn-primary'>Comparison</Link>
    </div>
    </div>
  );
};

export default checkAuth(AddIntake);