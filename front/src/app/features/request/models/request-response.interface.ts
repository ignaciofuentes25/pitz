import { requestResponseModel } from "./response/request-response-model.interface";

export interface RequestResponse {
  success: boolean;
  exception: string;
  access_Token: string;
  data: requestResponseModel[];
}
