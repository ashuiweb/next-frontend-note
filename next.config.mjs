/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack(config) {
        // 处理 .md 文件
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
        });

        return config;
    },

    // 配置Babel
    experimental: {
        externalResolver: true,
    },
};

export default nextConfig;
