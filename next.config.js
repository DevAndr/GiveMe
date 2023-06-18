const path = require('path')
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    BACKEND_HOST: process.env.BACKEND_HOST,
    HOST_GRAPHQL: process.env.BACKEND_HOST,
    SECRET_CLIENT: process.env.SECRET_CLIENT,
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URL: process.env.REDIRECT_URL
  }
}

module.exports = nextConfig
