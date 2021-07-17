import React from 'react';
import { GET_CURRENT_USER, UPDATE_USER } from '@/graphql/gql';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import ErrorMessage from '@/components/Common/ErrorMessage/ErrorMessage';
import './profile.scss';

const ProfileComponent = () => {
  const client = useApolloClient();
  const cacheData = client.readQuery({ query: GET_CURRENT_USER })!;
  const [userInfo, setUserInfo] = React.useState({
    email: cacheData.currentUser.email,
    userName: cacheData.currentUser.userName,
    role: cacheData.currentUser.role,
    phone: cacheData.currentUser.phone,
    position: cacheData.currentUser.position,
    sex: cacheData.currentUser.sex
  });
  const [updateUserHandle, {loading, error}] = useMutation(UPDATE_USER,{
    update(cache, { data: { updateUser } }) {
      console.log(updateUser)
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: {currentUser: updateUser},
      });
      localStorage.setItem('@CloudProject:currentUser', JSON.stringify(updateUser));
    }
  });
  console.log('loading',loading)
  console.log('error',error)
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          Profile page
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 offset-sm-2 col-form-label">Email</label>
        <div className="col-sm-6">
          <input
            disabled
            className="form-control"
            value={userInfo.email}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 offset-sm-2 col-form-label">User Name</label>
        <div className="col-sm-6">
          <input
            className="form-control"
            value={userInfo.userName}
            onChange={event => setUserInfo({ ...userInfo, userName: event.target.value })}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 offset-sm-2 col-form-label">Phone</label>
        <div className="col-sm-6">
          <input
            className="form-control"
            value={userInfo.phone}
            onChange={event => setUserInfo({ ...userInfo, phone: event.target.value })}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-4 offset-sm-4">
          <button className="btn btn-primary btn-block" onClick={() => updateUserHandle({ variables: {user: userInfo} })} disabled={loading?true:false}>
            {loading?'Loading...':'Update'}
          </button>
          
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6 offset-sm-3">
          {error ? <ErrorMessage error={error}/> : ''}
        </div>
      </div>
      
    </div>
  );
};

export default ProfileComponent;