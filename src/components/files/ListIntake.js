import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import checkAuth from '../auth/CheckAuth';

function ListIntake() {
  const [intakeData, setIntakeData] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [editDate, setEditDate] = useState(null);
  const [editIntake, setEditIntake] = useState('');
  const user = JSON.parse(localStorage.getItem('user')) || { username: '' };
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('intakeData')) || {};
    setIntakeData(storedData[user.username] || {});
  }, [user.username]);

  const handleDelete = (date) => {
    if (window.confirm('Are you sure you want to delete this intake?')) {
      const updatedData = { ...intakeData };
      delete updatedData[date];
      localStorage.setItem('intakeData', JSON.stringify({ [user.username]: updatedData }));
      setIntakeData(updatedData);
      alert('Intake deleted successfully. Redirecting to add a new intake.');
      navigate('/addintake');
    }
  };

  const handleEdit = (date, intake) => {
    setEditDate(date);
    setEditIntake(intake);
  };

  const handleSaveEdit = (date) => {
    const updatedData = { ...intakeData, [date]: { ...intakeData[date], intake: editIntake,time: new Date().toLocaleTimeString()} };
    localStorage.setItem('intakeData', JSON.stringify({ [user.username]: updatedData }));
    setIntakeData(updatedData);
    setEditDate(null);
  };

  const handleCancelEdit = () => {
    setEditDate(null);
    setEditIntake('');
  };

  const entries = Object.entries(intakeData);
  const pages = entries.length;
  const paginatedData = entries.slice(pageNumber, pageNumber + 1); // Show only one entry per page

  return (
    <div className='text-center'>
      <Navbar />
      <h2>Intake List</h2>
      {paginatedData.length > 0 ? (
        <table className='table container table-bordered'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Intake (ml)</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(([date, { intake, time }]) => (
              <tr key={date}>
                <td>{date}</td>
                <td>
                  {editDate === date ? (
                    <input 
                      type="number" 
                      value={editIntake} 
                      onChange={(e) => setEditIntake(e.target.value)} 
                    />
                  ) : (
                    intake
                  )}
                </td>
                <td>{time}</td>
                <td>
                  <div className=''>
                    {editDate === date ? (
                      <>
                        <button onClick={() => handleSaveEdit(date)} className='btn btn-success'>Save</button>
                        <button onClick={handleCancelEdit} className='btn btn-danger'>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(date, intake)} className='btn btn-success'>Edit</button>
                        <button onClick={() => handleDelete(date)} className='btn btn-danger'>Delete</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No intake records available.</p>
      )}

      <div>
        {pageNumber > 0 && <button onClick={() => setPageNumber(pageNumber - 1)} className='btn btn-warning'>Previous</button>}
        {pageNumber < pages - 1 && <button onClick={() => setPageNumber(pageNumber + 1)} className='btn btn-warning'>Next</button>}
      </div>

      <Link to="/addintake" className='btn btn-primary'>Add Intake</Link>
      <Link to="/compareintake" className='btn btn-primary'>Comparison</Link>
    </div>
  );
}

export default checkAuth(ListIntake);
