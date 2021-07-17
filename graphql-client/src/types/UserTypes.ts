export interface IUser {
  email: string;
  userName: string;
  role: number;
  phone: string;
  position: string;
  sex: string;
  updateTime?: string;
  createTime?: string;
  __typename: string;
}

export interface IJwt{
  data: any;
  iat: string;
  exp: string;
}