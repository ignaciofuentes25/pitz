import { userResponseModel } from "src/app/features/register/models/response/register-code-response.interface";

export interface AuthenticationResponse {
  success: boolean;
  exception: string;
  access_Token: string;
  data: userResponseModel | string;
}
