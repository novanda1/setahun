/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  async rewrites() {
    return [
      {
        source: "/server/:path*",
        destination: process.env.NEXT_PUBLIC_SUPABASE_URL + "/:path*",
      },
    ];
  },
};
