import { ServicesModel } from "../services.interfacce";

export interface ServiceResponse {
  success: boolean;
  exception: string;
  data: ServicesModel[] & boolean;
}
