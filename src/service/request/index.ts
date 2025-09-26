import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { showLoading, hideLoading } from "@/components/BasicLoading";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import type { HYRequestConfig } from "./type";
import { message } from "antd";

export const checkStatus = (status: number): void => {
  switch (status) {
    case 400:
      message.error("请求失败！请您稍后重试");
      break;
    case 401:
      message.error("登录失效！请您重新登录");
      break;
    case 403:
      message.error("当前账号无权限访问！");
      break;
    case 404:
      message.error("你所访问的资源不存在！");
      break;
    case 405:
      message.error("请求方式错误！请您稍后重试");
      break;
    case 408:
      message.error("请求超时！请您稍后重试");
      break;
    case 500:
      message.error("服务异常！");
      break;
    case 502:
      message.error("网关错误！");
      break;
    case 503:
      message.error("服务不可用！");
      break;
    case 504:
      message.error("网关超时！");
      break;
    default:
      message.error("请求失败！");
  }
};

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class HYRequest {
  instance: AxiosInstance;

  // request实例 => axios的实例
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config);

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // global loading + progress
        NProgress.start();
        showLoading();
        return config;
      },
      (err) => {
        NProgress.done();
        hideLoading();
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        NProgress.done();
        hideLoading();
        return res.data;
        // 加在这
      },
      (err) => {
        NProgress.done();
        hideLoading();
        return err;
      }
    );

    // 针对特定的hyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: HYRequestConfig<T>) {
    // 确保 headers 存在
    if (!config.headers) {
      config.headers = {};
    }
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(
        config as InternalAxiosRequestConfig
      );
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }

          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "GET" });
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "POST" });
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "DELETE" });
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default HYRequest;
