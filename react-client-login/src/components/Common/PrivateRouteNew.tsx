// import * as React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import Navbar from '@/components/Common/Navbar/Navbar';

// interface IPrivateRouteNewProps {
//   children: React.ReactNode;
//   path: string;
//   // location: Location;
// }

// const PrivateRouteNew = (props: IPrivateRouteNewProps) => (
//   <Route
//     render={({ location }) =>
//       localStorage.getItem('@CloudProject:token') ? (
//         <React.Fragment>
//           <Navbar />
//           {props.children}
//         </React.Fragment>
//       ) : (
//         <React.Fragment>
//           {console.log('location', location)}
//           <Redirect
//             to={{
//               pathname: '/',
//               state: { from: location },
//             }}
//           />
//         </React.Fragment>
//       )
//     }
//   />
// );

// export default PrivateRouteNew;
