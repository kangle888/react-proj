import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const target = env.VITE_API_TARGET || env.VITE_API_BASE || "";
  return {
  plugins: [
    react(),
    AutoImport({
      dts: "src/auto-imports.d.ts",
      imports: [
        {
          antd: [
            "Button",
            "Checkbox",
            "Form",
            "Input",
            "Typography",
            "ConfigProvider",
            "message",
            "Modal",
            "notification",
          ],
        },
        "react",
        "react-router-dom",
      ],
      eslintrc: { enabled: false },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: target
      ? {
          "/api": {
            target,
            changeOrigin: true,
            // rewrite only if your backend doesn't expect /project prefix
            rewrite: (p) => p.replace(/^\/api/, ""),
          },
        }
      : undefined,
  },
};
});
