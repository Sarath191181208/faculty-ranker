/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'vitap.ac.in', 'lh3.googleusercontent.com', 'picsum.photos', 'vitap-backend.s3.ap-south-1.amazonaws.com'],
  },

  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
