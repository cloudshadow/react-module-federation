import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './navbar.scss';

const NavbarComponent = () => {
  const history = useHistory();
  const [current, setCurrent] = useState(window.location.pathname);
  // can not use readQuery here because readQuery can not get data after user logout
  const currentUser = JSON.parse(localStorage.getItem('@CloudProject:currentUser')!);

  const ext = localStorage.getItem('@CloudProject:exp') ? parseInt(localStorage.getItem('@CloudProject:exp')!) * 1000 : 0;
  const initAuth = () => {
    localStorage.removeItem('@CloudProject:token');
    localStorage.removeItem('@CloudProject:currentUser');
    localStorage.removeItem('@CloudProject:exp');
    localStorage.removeItem('@CloudProject:iat');
    history.push('/');
  }
  
  const handleLogout = () => {
    setCurrent('/');
    initAuth();
  };

  React.useEffect(()=>{
    currentUser && ext < new Date().getTime() ? initAuth() : '';
  }, []);

  React.useEffect(()=>{
    setCurrent(window.location.pathname);
  },[window.location.pathname]);

  if (currentUser) {
    return (
      <div className="navbar-container">
        <nav className="navbar navbar-expand-lg fixed-top navbar-light navbar-bg-light">
          <Link className="navbar-brand" to="/home" onClick={() => setCurrent('/home')}>Apollo Project</Link>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className={current === '/home' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrent('/home')}>
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              {
                currentUser.role === 0 ?
                  <li className={current === '/users' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrent('/users')}>
                    <Link className="nav-link" to="/users">Users List</Link>
                  </li> : ''
              }
              <li className={current === '/profile' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrent('/profile')}>
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
            </ul>
            <span className="navbar-text">
              {`${currentUser.userName}`}
            </span>
            <span className="navbar-text logout" onClick={() => handleLogout()}>
              登出
            </span>
          </div>
        </nav>
        <div className="shadow-navbar" />
      </div>
    );
  } else {
    return <></>
  }
};

export default NavbarComponent;
