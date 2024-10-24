import hyRequest from "@/service/index";
import type { IAccount } from "@/types";

export const accountLoginRequest = (account: IAccount) => {
  return hyRequest.post({
    url: "/project/login",
    data: account,
  });
};
