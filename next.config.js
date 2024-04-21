/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        pathname: "/avatars/**",
      },
    ],
  },
}

module.exports = nextConfig
