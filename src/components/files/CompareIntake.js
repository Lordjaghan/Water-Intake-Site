// IntakeDifference.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import checkAuth from '../auth/CheckAuth';

function CompareIntake() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = (e) => {
    e.preventDefault();
    const intakeData = JSON.parse(localStorage.getItem('intakeData')) || {};
    if (!intakeData[user.username]) {
      setError('No intake data found');
    } else {
      const startDateIntake = intakeData[user.username][startDate];
      const endDateIntake = intakeData[user.username][endDate];
      if (!startDateIntake || !endDateIntake) {
        setError('No intake data found for one or both dates');
      } else {
        const difference = endDateIntake.intake - startDateIntake.intake;
        alert(`The difference in water intake between ${startDate} and ${endDate} is ${difference}ml`);
      }
    }
  };

  return (
    <div className='text-center'>
      <Navbar/>
      <h3>Compare Your Intake</h3>
      <div className='container'>
    <form onSubmit={handleSubmit} className=' form-group p-5 mr-5 ml-5'>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Start Date"
        className='form-control'
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="End Date"
        className='form-control'
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" className='btn btn-primary'>Calculate Difference</button><br></br><br></br>
      <Link to="/listintake" className='btn btn-primary'>Lists Intake</Link>
      <Link to="/addintake" className='btn btn-primary'>Add Intake</Link>
    </form>  

    </div>
    </div >
  );
};

export default checkAuth(CompareIntake);