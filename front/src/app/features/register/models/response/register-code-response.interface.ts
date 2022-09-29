export interface RegisterCodeResponse {
  success: boolean;
  exception: string;
  data: userResponseModel;
}

export interface userResponseModel {
  paI_ID: number;
  usU_ACTUALIZADO: Date;
  usU_BADGE: number;
  usU_BADGE_O: number;
  usU_BADGE_S: number;
  usU_COD_VERIFICACION: string;
  usU_CONTRASENA: string;
  usU_CREADO: Date;
  usU_DEVICE_TOKEN: string;
  usU_DIRECCION: string;
  usU_EMAIL: string;
  usU_FCB: number;
  usU_FCB_ID: number;
  usU_GENERO: string;
  usU_ID: number;
  usU_LATITUD: number;
  usU_LONGITUD: number;
  usU_NOMBRE: string;
  usU_ORIGEN: string;
  usU_RUT: string;
  usU_SESION: number;
  usU_TELEFONO: string;
  usU_WAZE: number;
}
