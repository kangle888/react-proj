import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
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
});
