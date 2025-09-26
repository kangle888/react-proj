import { createRoot } from "react-dom/client";
import React from "react";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import "./base-ui/index.less";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.start();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            fontFamily:
              '"PingFang SC", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            colorPrimary: "#6a85f1",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);

window.addEventListener("load", () => {
  NProgress.done();
});
