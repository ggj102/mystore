/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // 모든 경로에 대해 CORS 정책 설정
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // 특정 도메인 또는 '*'로 모든 도메인 허용
          },
        ],
      },
    ];
  },
};

export default nextConfig;
