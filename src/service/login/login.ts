import hyRequest from "@/service/index";
import type { IAccount } from "@/types";

export const accountLoginRequest = (account: IAccount) => {
  return hyRequest.post({
    url: "/project/login",
    data: account,
  });
};

//  /user/info get 请求 还要传入参数userId 
export const userInfoRequest = (userId: string) => {
  return hyRequest.get({
    // Use the same '/project' prefix as login so Vite proxy forwards it in dev
    url: "/user/info",
    params: {
      userId,
    },
  });
};