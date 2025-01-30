/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: '/MyDailyUpdateApp',
    assetPrefix: '/MyDailyUpdateApp/',
}

module.exports = nextConfig 