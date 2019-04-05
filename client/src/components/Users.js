import React, { useEffect, useState } from 'react';
import axios from 'axios';

import requiresAuth from '../utilities/requiresAuth';
import User from './User';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const users = await axios.get('users');
        setUsers(users.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
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

export default requiresAuth(Users);
