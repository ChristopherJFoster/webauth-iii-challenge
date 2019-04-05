import React from 'react';
import axios from 'axios';

import { useInput } from '../utilities/useInput';

const SignIn = ({ history }) => {
  const usernameSignIn = useInput();
  const passwordSignIn = useInput();

  const signIn = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('auth/login', {
        username: usernameSignIn.value,
        password: passwordSignIn.value
      });
      localStorage.setItem('token', response.data.token);
      console.log(response.data.message);
      usernameSignIn.setValue('');
      passwordSignIn.setValue('');
      history.push('/users');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='signin'>
      <h1 className='title'>Authentication</h1>
      <form onSubmit={signIn}>
        <input
          required
          type='text'
          value={usernameSignIn.value}
          name='usernameSignIn'
          onChange={usernameSignIn.updateValue}
          placeholder='username'
        />
        <input
          required
          type='password'
          value={passwordSignIn.value}
          name='passwordSignIn'
          onChange={passwordSignIn.updateValue}
          placeholder='password'
        />
        <button type='submit' className='signin-button'>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
