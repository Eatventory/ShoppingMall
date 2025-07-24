import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // eslint 오류 무시
  },
  typescript: {
    ignoreBuildErrors: true, // 타입 오류 무시
  },
  // 필요한 다른 설정도 여기 추가 가능
};

export default nextConfig;
