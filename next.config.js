/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'vitap.ac.in', 'lh3.googleusercontent.com', 'picsum.photos'],
    },

    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
