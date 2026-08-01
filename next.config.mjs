/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL('https://www.themealdb.com/images/media/meals/**'),
      new URL('https://res.cloudinary.com/**'),
    ],
  },
};

export default nextConfig;
