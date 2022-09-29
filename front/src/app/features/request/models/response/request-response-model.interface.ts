import { ServicesModel } from "src/app/features/service/models/services.interfacce";

export interface requestResponseModel {
  seR_ID: number | ServicesModel;
  soL_ACTUALIZADO: number;
  soL_CORREO_ENVIADO: number;
  soL_CREADO: number;
  soL_DESCRIPCION: number;
  soL_ESTADO: string;
  soL_FECHA_CREACION: number;
  soL_FECHA_EXPIRACION: number;
  soL_FECHA_LECTURA: number;
  soL_FECHA_RESPUESTA: number;
  soL_ID: number;
  soL_LATITUD: number;
  soL_LONGITUD: number;
  soL_ORIGEN: number;
  soL_PRECIO: number;
  soL_RESPUESTA: string;
  soL_TITULO: number;
  suC_ID: number;
  suC_ID_RESPUESTA: number;
  usU_ID: number;
  veH_ID: number;

  fK_USU_ID: any;
}
