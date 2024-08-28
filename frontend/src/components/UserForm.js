import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

const UserForm = ({ selectedUser, onSave }) => {
  const [user, setUser] = useState({
    name: '',
    age: '',
    dob: '',
    password: '',
    gender: '',
    about: '',
  });
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    // Fetch genders from the backend API
    axios.get("http://localhost:8080/api/genders")
      .then(response => setGenders(response.data))
      .catch(error => console.log("Gender is not fetching:", error));

    // Check if the form is in edit mode, then prefill the selected user's data
    if (selectedUser) {
      setUser({ ...selectedUser });
    } else {
      setUser({
        name: '',
        age: '',
        dob: '',
        password: '',
        gender: '',
        about: '',
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...user };
      if (selectedUser) {
        // If the user is in edit mode
        if (!user.password) delete payload.password; // Do not include the password if it's not changed
        await axios.put(`http://localhost:8080/api/users/${user._id}`, payload);
      } else {
        // If creating a new user
        await axios.post('http://localhost:8080/api/users', payload);
      }
      onSave();
      // Reset form after save
      setUser({
        name: '',
        age: '',
        dob: '',
        password: '',
        gender: '',
        about: '',
      });
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div>
      <div className="form-div mx-auto">
        <form onSubmit={handleSubmit} className='container mt-4'>
          <div className="mb-3">
            <label htmlFor="name" className='form-label fw-bold'>Name:</label>
            <input
              type="text"
              name='name'
              value={user.name}
              onChange={handleChange}
              className='form-control'
              minLength="2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Age:</label>
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={handleChange}
              className="form-control"
              min="0"
              max="120"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={user.dob ? user.dob.split('T')[0] : ''}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="form-control"
              minLength="10"
              required={!selectedUser} // Require only if creating a new user
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Gender:</label>
            <select
              name="gender"
              value={user.gender}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Gender</option>
              {
                genders.map((gender) => (
                  <option key={gender} value={gender}>{gender}</option>
                ))
              }
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">About:</label>
            <textarea
              name="about"
              value={user.about}
              onChange={handleChange}
              className="form-control"
              maxLength="5000"
            />
          </div>
          <button type='submit' className='btn-save w-100'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default UserForm;
