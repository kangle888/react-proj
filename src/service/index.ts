import { localCache } from "@/utils/cache";
import { BASE_URL, TIME_OUT } from "./config";
import HYRequest from "./request";
import { LOGIN_TOKEN } from "@/global/constants";
import { hideLoading, showLoading } from "../components/BasicLoading";

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      showLoading();
      // 携带token
      const token = localCache.getCache(LOGIN_TOKEN);
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // loading
      return config;
    },
    requestFailureFn: (err) => {
      hideLoading();
      return err;
    },
    responseSuccessFn: (res) => {
      hideLoading();
      return res;
    },
    responseFailureFn: (err) => {
      hideLoading();
      return err;
    },
  },
});

export default hyRequest;
