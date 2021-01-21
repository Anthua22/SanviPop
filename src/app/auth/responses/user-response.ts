import { User } from 'src/app/users/interfaces/user';

export interface EmailResponse {
  email:string
}

export interface UserResponse{
  user:User
}

export interface TokenResponse {
  accessToken: string;
}
