import NextAuth from 'next-auth';

type User = {
    id: string;
    name: string;
    email: string;
    image: string;
}

type Tokens = {
    accessToken: string;
    refreshToken: string;
    expireIn: number
}

declare module "next-auth" {
    interface Session {
        user: User;
        tokens: Tokens;
    }
}

import {JWT} from 'next-auth/jwt';

declare module "next-auth/jwt" {
    interface JWT {
        user: User;
        tokens: Tokens;
    }
}