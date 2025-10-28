export interface LoginResponse {
  access_token: string,
  cliente: {
    idCliente: string,
    nombre: string,
    telefono: string,
    email: string;
  };
}
