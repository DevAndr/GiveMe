import path from "node:path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// import withSass from '@zeit/next-sass';
//
// module.exports = withSass({
//     cssModules: true
// })

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    transpilePackages: ['lodash-es'],
    sassOptions: {
        includePaths: [path.join(__filename, 'styles')],
    },
    env: {
        BACKEND_HOST: process.env.BACKEND_HOST,
        HOST_GRAPHQL: process.env.BACKEND_HOST,
        SECRET_CLIENT: process.env.SECRET_CLIENT,
        CLIENT_ID: process.env.CLIENT_ID,
        REDIRECT_URL: process.env.REDIRECT_URL
    }
};

export default nextConfig;
