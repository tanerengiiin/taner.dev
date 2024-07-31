/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["shiki"],
  },
  compiler:{
    styledComponents: true
  }
};

export default nextConfig;
