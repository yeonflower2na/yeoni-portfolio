import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 정적 호스팅용 — out/ 디렉터리로 내보낸다
  output: "export",
  // /ax → /ax/index.html 형태로 생성해 Pages가 그대로 서빙하게 한다
  trailingSlash: true,
  // 정적 배포에는 이미지 최적화 서버가 없다
  images: { unoptimized: true },
};

export default nextConfig;
