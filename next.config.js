/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/MyDailyUpdateApp',
    images: {
        unoptimized: true,
    },
    assetPrefix: '/MyDailyUpdateApp/',
    trailingSlash: true,
}

module.exports = nextConfig 