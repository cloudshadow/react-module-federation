// import * as React from 'react';
// import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import { useApolloClient } from '@apollo/client';
// import { GET_CURRENT_USER } from '@/graphql/gql';
// import './navbar.scss';

// // interface INavBarProps {
// //   currentUser: IUser;
// // }

// const NavbarComponent: React.FC = () => {
//   const history = useHistory();
//   const client = useApolloClient();
//   const cacheData = client.readQuery({ query: GET_CURRENT_USER })!;
//   const [current, setCurrent] = React.useState(window.location.pathname);
//   // can not use readQuery here because readQuery can not get data after user logout
//   const currentUser = JSON.parse(localStorage.getItem('@CloudProject:currentUser')!);
//   console.log('nav current', current);
//   const ext = localStorage.getItem('@CloudProject:exp') ? parseInt(localStorage.getItem('@CloudProject:exp')!) * 1000 : 0;
//   const initAuth = () => {
//     localStorage.removeItem('@CloudProject:token');
//     localStorage.removeItem('@CloudProject:currentUser');
//     localStorage.removeItem('@CloudProject:exp');
//     localStorage.removeItem('@CloudProject:iat');
//     history.push('/');
//   };

//   const handleLogout = () => {
//     setCurrent('/');
//     initAuth();
//   };

//   React.useEffect(() => {
//     if (currentUser && ext < new Date().getTime()) return initAuth();
//   }, [currentUser]);
//   React.useEffect(() => {
//     console.log(window.location.pathname);
//   });

//   // React.useEffect(() => {
//   //   setCurrent(window.location.pathname);
//   // }, [window.location.pathname]);

//   // React.useEffect(() => {
//   //   console.log('cache change');
//   // }, [cacheData]);
//   console.log('render navbar');
//   if (currentUser) {
//     return (
//       <div className="navbar-container">
//         <nav className="navbar navbar-expand-lg fixed-top navbar-light navbar-bg-light">
//           <Link className="navbar-brand" to="/home" onClick={() => setCurrent('/home')}>
//             Apollo Project
//           </Link>
//           <div className="collapse navbar-collapse" id="navbarText">
//             <ul className="navbar-nav mr-auto">
//               <li className={current === '/home' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrent('/home')}>
//                 <Link className="nav-link" to="/home">
//                   Home
//                 </Link>
//               </li>
//               {currentUser.role === 0 ? (
//                 <li className={current === '/users' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrent('/users')}>
//                   <Link className="nav-link" to="/users">
//                     Users List
//                   </Link>
//                 </li>
//               ) : (
//                 ''
//               )}
//               <li className={current === '/profile' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrent('/profile')}>
//                 <Link className="nav-link" to="/profile">
//                   Profile
//                 </Link>
//               </li>
//             </ul>
//             <span className="navbar-text">{`${currentUser.userName}`}</span>
//             <span className="navbar-text logout" onClick={() => handleLogout()}>
//               Log Out
//             </span>
//           </div>
//         </nav>
//         <div className="shadow-navbar" />
//       </div>
//     );
//   } else {
//     return <div>222222</div>;
//   }
// };

// export default NavbarComponent;
