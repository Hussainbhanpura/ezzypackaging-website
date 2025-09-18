const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "1.imimg.com" },
      { protocol: "https", hostname: "2.imimg.com" },
      { protocol: "https", hostname: "3.imimg.com" },
      { protocol: "https", hostname: "4.imimg.com" },
      { protocol: "https", hostname: "5.imimg.com" },
      { protocol: "https", hostname: "6.imimg.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "indiamart.com" },
    ],
  },
};

export default nextConfig;
