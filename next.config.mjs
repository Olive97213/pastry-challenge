/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://www.themealdb.com/images/media/meals/**"),
    ],
  },
}

export default nextConfig
