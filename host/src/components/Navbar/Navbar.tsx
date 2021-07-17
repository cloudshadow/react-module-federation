import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';


const NavbarComponent = () => {
  const [current, setCurrent] = useState(window.location.pathname);

  React.useEffect(() => {
    setCurrent(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg fixed-top navbar-light navbar-bg-light">
        <Link className="navbar-brand" to="/home" onClick={() => setCurrent('/home')}>
          Module Federetion
        </Link>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className={current === '/' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrent('/home')}>
              <Link className="nav-link" to="/">
                State Module
              </Link>
            </li>
            <li
              className={current === '/graphql' ? 'nav-item active' : 'nav-item'}
              onClick={() => setCurrent('/graphql')}
            >
              <Link className="nav-link" to="/graphql">
                Graphql Module
              </Link>
            </li>
            <li
              className={current === '/remote' ? 'nav-item active' : 'nav-item'}
              onClick={() => setCurrent('/remote')}
            >
              <Link className="nav-link" to="/remote">
                Inject Reducer Module
              </Link>
            </li>
          </ul>
        </div>
        <div>Host React version: {React.version}</div>
      </nav>
      <div className="shadow-navbar" />
    </div>
  );
};

export default NavbarComponent;
