export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string; 
  email?: string;
  password?: string;
}

export interface IUserList{
  id: number;
  name: string;
  email: string;
}

