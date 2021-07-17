export interface IServer {
  address: string;
  apiPath: string;
}
export interface IJwt {
  data: any;
  iat: string;
  exp: string;
}
