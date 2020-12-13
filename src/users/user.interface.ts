import { User } from "./entities/user.entity";
export interface UserLoginResponse {
    accessToken: string;
}

export interface UserRegisterResponse {
    accessToken: string;
    user: UserData
}
export interface UserData {
    id: number;
    name: string;
    username: string;
    isActive: boolean;
}



