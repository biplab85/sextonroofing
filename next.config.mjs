/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [480, 768, 1024, 1280, 1920],
  },
};

export default nextConfig;
