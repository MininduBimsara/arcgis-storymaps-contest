import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "www.arcgis.com",
      "services.arcgis.com",
      "utility.arcgis.com",
      "storymaps.arcgis.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
        port: "",
        pathname: "/**",
      },
      // Add other image domains you might use
      {
        protocol: "https",
        hostname: "arcgis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.arcgis.com",
        port: "",
        pathname: "/**",
      },
      // For local development
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Enable webpack 5 for better performance
  webpack: (config) => {
    // Handle ArcGIS JavaScript API
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
  // Environment variables
  env: {
    ARCGIS_API_KEY: process.env.ARCGIS_API_KEY,
    BACKEND_URL: process.env.BACKEND_URL,
  },
};

export default nextConfig;
