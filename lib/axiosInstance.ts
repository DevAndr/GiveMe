import axios from "axios";

const baseURL = 'http://localhost:3030';

const api = axios.create({baseURL, withCredentials: true});

export const apiAuth = axios.create({
    baseURL, withCredentials: true, headers: {
        'Content-Type': 'application/json',
    }
});


// const requestRefreshTokens = (request: any) => {
//     console.log("requestRefreshTokens", request.cookies);
//
//     return new Promise((resolve, reject) => {
//         api.post('/auth/refresh')
//             .then((response) => {
//                 console.log("response");
//                 resolve(response.data);
//             }).catch((error) => {
//             console.log("ERROR");
//             reject(error);
//             // redirect('/auth/sign-in');
//         });
//     });
// };
//
// createAuthRefreshInterceptor(api, requestRefreshTokens, {statusCodes: [401, 403]});


export default api;