import { userWebResponseModel } from "../user-web.interfacec";

export interface AuthenticationWebResponse {
  success: boolean;
  exception: string;
  access_Token: string;
  data: userWebResponseModel | string;
}
