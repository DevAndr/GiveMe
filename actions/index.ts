import { redirect } from 'next/navigation'

export function redirectToHome() {
    redirect('/')
};

export function getCookieAT() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1] || '';
    console.log('cookie', cookie);
    return cookie
}