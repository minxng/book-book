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
      {
        protocol: "https",
        hostname: "image.aladin.co.kr",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
