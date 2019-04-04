import React, { useEffect, useState } from 'react';
import axios from 'axios';

import User from './User';

const Users = ({ history }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchUsers = await axios.get('http://localhost:5000/api/users');
        setUsers(fetchUsers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='users-list'>
      {users.length > 0 && (
        <div>
          <h1>Authentication Users</h1>
          {users.map(user => (
            <User key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
