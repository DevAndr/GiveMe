

export function getCookieAT() {
    return document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1] || ''
}

export function getCookieUID() {
    return document.cookie.split('; ').find(row => row.startsWith('uid='))?.split('=')[1] || '';
}
