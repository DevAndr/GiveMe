import NextAuth, {NextAuthConfig} from 'next-auth';
import Credentials from '@auth/core/providers/credentials';
import axiosInstance from '@/lib/axiosInstance';
import {JWT} from 'next-auth/jwt';

async function refreshTokens(token: JWT): Promise<JWT> {
    const data = await axiosInstance.post('/auth/refresh', {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.tokens.refreshToken}`
        }
    });

    console.log('refreshed');

    return {...token, tokens: data.data};
}

const authOptions: NextAuthConfig = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'email', placeholder: 'E-mail'},
                password: {label: 'Password', type: 'password', placeholder: '********'},
            },
            authorize: async (credentials) => {
                if (!credentials.email && !credentials.password) {
                    return null;
                }

                const {email, password} = credentials;
                console.log(email, password);

                const resp = await axiosInstance.post('/auth/signIn', {email, password});

                console.log(resp.data);

                if (resp.status === 401 || resp.status === 403) {
                    console.log(resp.statusText);
                    return null;
                }

                return resp.data;
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    basePath: '/api/auth',
    callbacks: {
        jwt: async ({token, user}) => {
            if (user) {
                return {...token, ...user};
            }

            if (new Date().getTime() < token.tokens.expireIn) return token;

            return await refreshTokens(token);
        },
        session: async ({session, token}) => {

            // @ts-ignore
            session.user = token.user;
            session.tokens = token.tokens;
            return session;
        }
    }
};

export const {handlers, signIn, signOut, auth} = NextAuth(authOptions);