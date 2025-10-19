export interface IPedidos {
  id?: number;
  fechaPedido: Date;
  datosEntrega : {
    cliente: string;
    telefono: string;
    direccion: string;
  };
  items: {
    producto: string;
    cantidad: number;
    precio: number
  } [];
  total: number;
}
