export interface IServer {
  address: string;
  apiPath: string;
}

export interface IRefreshToken{
  exp: number
}
export interface IRefreshRequest{
  refreshToken: string;
}
export interface IRefreshResponse{
  accessToken: string;
  refreshToken: string;
}