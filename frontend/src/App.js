import './App.css';
import UserForm from './components/UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './components/UserList';
import { useState, useRef } from 'react';

function App() {
  const [editingUser, setEditingUser] = useState(null);
  const userListRef = useRef(null); // Add a ref to access UserList's methods

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUserSaved = () => {
    setEditingUser(null); 
    userListRef.current.fetchUsers(); // Trigger fetchUsers after save
  };

  return (
    <div className="App">
      <div className="header ">
        <h3>User Registration System</h3>
      </div>
      <UserForm selectedUser={editingUser} onSave={handleUserSaved} />
      <UserList onEditUser={handleEditUser} ref={userListRef} />
    </div>
  );
}

export default App;
