// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   i18n: {
//     locales: ["en", "es"],
//     defaultLocale: "en",
//   },
// };

// module.exports = nextConfig;


// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};

export default nextConfig;

