/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    THIRDWEB_SECRET_KEY: process.env.THIRDWEB_SECRET_KEY,
    GIT_BRANCH: process.env.GIT_BRANCH,
    ADMIN_USER: process.env.ADMIN_USER,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

module.exports = nextConfig;
