export interface IPedidos {
  id?: string;
  fechaPedido: Date;
  datosEntrega : {
    idCliente: string,
    cliente: string;
    telefono: string;
    direccion: string;
  };
  items: {
    idProducto: string;
    producto: string;
    cantidad: number;
    precio: number
  } [];
  total: number;
}
