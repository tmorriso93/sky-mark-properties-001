import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "firebasestorage.googleapis.com",
      //   port: "",
      //   pathname: "/**"
      // },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // port: "",
        // pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
