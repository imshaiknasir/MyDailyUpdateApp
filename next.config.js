/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/MyDailyUpdateApp',
    images: {
        unoptimized: true,
    },
    assetPrefix: '/MyDailyUpdateApp/',
    trailingSlash: true,
}

module.exports = nextConfig 