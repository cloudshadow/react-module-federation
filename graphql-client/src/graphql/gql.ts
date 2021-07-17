import { gql } from '@apollo/client';

const LOGIN = gql`
mutation loginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password){
      user{
        email
        userName
        role
        phone
        position
        sex
        updateTime
        createTime
      }
      token
    }
  }
`;

const GET_USERS_LIST = gql`
  query getUsersList($pageNum: Int, $pageSize: Int){
    getUsersList(offset: $pageNum, limit: $pageSize){
      totalCount
      userList{
        email
        userName
        role
        phone
        position
        sex
        updateTime
        createTime
      }
    }
  }
`;

const GET_CURRENT_USER = gql`
  query currentUser{
    currentUser{
      email
      userName
      role
      phone
      position
      sex
      updateTime
      createTime
    }
  }
`;

const UPDATE_USER = gql`
mutation updateUser($user: UserInput){
  updateUser(user: $user){
      email
      userName
      role
      phone
      position
      sex
      updateTime
      createTime
    }
  }
`;

const UPDATE_USER_FRAGMENT = gql`
fragment updateTime on User {
  updateTime
  __typename
}
`;

export {
  LOGIN,
  GET_CURRENT_USER,
  GET_USERS_LIST,
  UPDATE_USER,
  UPDATE_USER_FRAGMENT
}