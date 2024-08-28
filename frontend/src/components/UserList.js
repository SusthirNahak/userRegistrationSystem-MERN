import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const UserList = forwardRef(({ onEditUser }, ref) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchUsers,
  }));

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      fetchUsers(); // Refresh the list after deletion
    } catch (error) {
      console.log('Error while deleting user:', error);
    }
  };

  return (
    <div className='container mt-4'>
      <h2>User List</h2>
      <table className='table table-bordered table-hover table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>About</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{new Date(user.dob).toLocaleDateString()}</td>
              <td>{user.gender}</td>
              <td>{user.about}</td>
              <td>
                <button
                  className='btn btn-secondary btn-sm me-2'
                  onClick={() => onEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className='btn btn-danger btn-sm me-2'
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default UserList;
