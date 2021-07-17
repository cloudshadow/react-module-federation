import React from 'react';
import { graphql } from 'react-apollo';
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import { GET_USERS_LIST, UPDATE_USER_FRAGMENT } from '@/graphql/gql';
import { IUser } from '@/types/UserTypes';
import './usersList.scss';

const UsersListComponent = () => {
  const client = useApolloClient();
  const [pageNum, setPageNum] = React.useState(1);
  const [pageSize] = React.useState(5);
  const [getUsersList, { loading, data, error }] = useLazyQuery(GET_USERS_LIST);
  React.useEffect(() => {
    getUsersList({ variables: { pageNum, pageSize } });
  }, []);

  // const renderPagination = (totalCount: number) => {
  //   const tatalPages = Math.round( totalCount / pageSize );
  // }

  const handlePagination = (currentPageNum: number) => {
    setPageNum(currentPageNum);
    getUsersList({ variables: { pageNum: currentPageNum, pageSize } });
  };
  const handleUpdate = (__typename: string, email: string) => {
    client.writeFragment({
      id: `${__typename}:${email}`,
      fragment: UPDATE_USER_FRAGMENT,
      data: {
        updateTime: new Date().toISOString().split('.')[0],
        __typename
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error...</p>;
  return (
    <div className="container-fluid">
      <table className="table">
        <thead>
          <tr>
            <td>Email</td>
            <td>User Name</td>
            <td>Role</td>
            <td>Phone</td>
            <td>Sex</td>
            <td>Update Time</td>
            <td>Create Time</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.getUsersList.userList.map((user: IUser) => (
              <tr key={user.email}>
                <td className="email">{user.email}</td>
                <td className="userName">{user.userName}</td>
                <td className="role">{user.role === 0 ? 'Admin' : 'User'}</td>
                <td className="phone">{user.phone}</td>
                <td className="sex">{user.sex}</td>
                <td className="updateTime">{user.updateTime}</td>
                <td className="createTime">{user.createTime}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleUpdate(user.__typename, user.email)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" onClick={event => handlePagination(-1)}>
              &lt;
            </a>
          </li>
          <li className={pageNum === 1 ? 'page-item active' : 'page-item'} onClick={() => handlePagination(1)}>
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className={pageNum === 2 ? 'page-item active' : 'page-item'} onClick={() => handlePagination(2)}>
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className={pageNum === 3 ? 'page-item active' : 'page-item'} onClick={() => handlePagination(3)}>
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item" onClick={event => handlePagination(+1)}>
            <a className="page-link" href="#">
              &gt;
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UsersListComponent;
