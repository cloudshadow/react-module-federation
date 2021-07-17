import * as React from 'react';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
// import JWT from 'jwt-decode';
import UsersListPage from './containers/UsersListPage';
// import NotfoundPage from './containers/NotfoundPage';
import './index.scss';

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
        <div className="index-container">
          <div className="switch-container">
              <UsersListPage />
          </div>
        </div>
    </ApolloProvider>
  );
};

export default App;
