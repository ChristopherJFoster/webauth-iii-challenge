import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Users from './Users';

const App = ({ history }) => {
  const signOut = () => {
    localStorage.removeItem('token');
    history.push('/signin');
  };

  return (
    <div className='container'>
      <header>
        <NavLink to='/'>Home</NavLink>
        &nbsp;|&nbsp;
        <NavLink to='/signup'>Sign Up</NavLink>
        &nbsp;|&nbsp;
        <NavLink to='/signin'>Sign In</NavLink>
        &nbsp;|&nbsp;
        <NavLink to='/users'>Users</NavLink>
        &nbsp;|&nbsp;
        <button onClick={signOut}>Sign Out</button>
      </header>
      <main>
        <Route path='/' exact component={Home} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path='/users' component={Users} />
      </main>
    </div>
  );
};

export default withRouter(App);
