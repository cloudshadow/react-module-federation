import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '@/graphql/gql';

import './home.scss';

const HomeComponent = () => {
  const client = useApolloClient();
  const cacheData = client.readQuery({ query: GET_CURRENT_USER })!;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-8">
          Home page {cacheData.currentUser.userName}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;