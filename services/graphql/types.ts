export interface ITokens {
    access_token: string;
    refresh_token: string;
}

export interface IAuthData {
    email: string;
    password: string;
}

export interface AuthData {
    email: string;
    password: string;
}

export interface RsponseAuth {
   data: {
       logIn: ITokens
   }
}

export interface ParamsAuth {
    data: IAuthData
}
