/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // 处理 .md 文件
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    
    return config;
  },
};

export default nextConfig;
