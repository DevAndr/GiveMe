import axiosInstance from '@/lib/axiosInstance';
import {SignInData, SignUpData} from '@/api/types';

export const signIn = (data: SignInData) => {
    return axiosInstance.post('/auth/signIn', data)
}

export const signUp = (data: SignUpData) => {
    return axiosInstance.post('/auth/signUp', data)
}

export const refreshTokens = () => {

}

export const signOut = () => {

};