import React from 'react';

export const User = ({ user }) => {
  return (
    <div className='user'>
      <h2>{user.id}</h2>
      <h2>{user.created_at}</h2>
      <h2>{user.username}</h2>
      <h2>{user.password}</h2>
      <h2>{user.department}</h2>
    </div>
  );
};

export default User;
