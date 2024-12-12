import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // 추가된 부분
  build: {
    outDir: "dist", // 빌드 출력 디렉토리
    assetsDir: "assets", // 에셋 디렉토리
    sourcemap: false, // 소스맵 비활성화 (선택사항)
  },
});
