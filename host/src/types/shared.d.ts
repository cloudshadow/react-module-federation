declare module 'graphql_client/UsersList' {
  const UsersList: React.ComponentType;
  export default UsersList;
}
declare module 'react_client/Button' {
  const Button: React.ComponentType;
  export default Button;
}
interface IRemoteHomeProps {
  store: any;
}
declare module 'react_client/Home' {
  const Home: React.ComponentType<IRemoteHomeProps>;
  export default Home;
}
interface IRemoteTableProp {
  color?: string;
}
declare module 'react_client/RemoteTable' {
  const RemoteTable: React.ComponentType<IRemoteTableProp>;
  export default RemoteTable;
}
interface IRemoteLoginProps {
  store: any;
  history: import('history').History;
}
declare module 'react_client_login/Login' {
  const Login: React.ComponentType<IRemoteLoginProps>;
  export default Login;
}
interface IRemoteEpicProps {
  store: any;
  rootEpic$: any;
}
declare module 'react_client_epic/Epic' {
  const Epic: React.ComponentType<IRemoteEpicProps>;
  export default Epic;
}
