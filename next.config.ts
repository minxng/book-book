import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dfd3hx72e/image/upload/v1746592572/**",
        search: "",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
