import { ServiceGroupModel } from "../service-group.interface";

export interface ServiceGroupResponse {
  success: boolean;
  exception: string;
  data: ServiceGroupModel;
}
