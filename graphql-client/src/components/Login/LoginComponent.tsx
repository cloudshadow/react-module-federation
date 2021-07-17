import React from 'react';
import JWT from 'jwt-decode';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import { LOGIN } from '@/graphql/gql';
import { IJwt } from '@/types/UserTypes';
import './login.scss';

interface ILoginFrom{
  email: string;
  password: string;
}

const LoginComponent = () => {
  const history = useHistory();
  const client = useApolloClient();
  const [userInfo, setUserInfo] = React.useState({} as ILoginFrom);
  const [login, { loading, error, data }] = useMutation(LOGIN);
  
  React.useEffect(() => {
    if (data && data.loginUser) {
      const { user, token } = data.loginUser;
      const jwtToken:IJwt = JWT(token);
      localStorage.setItem('@CloudProject:exp', jwtToken.exp);
      localStorage.setItem('@CloudProject:iat', jwtToken.iat);
      localStorage.setItem('@CloudProject:token', token);
      localStorage.setItem('@CloudProject:currentUser', JSON.stringify(user));
      client.writeData({ data: {currentUser: user} });
      history.push('/home');
    }
  }, [data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="login-container">
      <div className="login-form">
        <div>
          <label >Email</label>
          <input type="text" className="form-control" placeholder={`Email`} onChange={(event) => setUserInfo({ ...userInfo, email: event.target.value })} />
        </div>
        <div>
          <label >Password</label>
          <input type="password" className="form-control" placeholder="Password" onChange={(event) => setUserInfo({ ...userInfo, password: event.target.value })} />
        </div>
        <div>
          <button className="btn btn-primary btn-block" onClick={() => login({ variables: { email: userInfo.email, password: userInfo.password } })} >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;