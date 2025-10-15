import { IProductos } from '../../productos/modelos/iproductos';

export class Carrito {
  producto: IProductos;
  cantidad: number;

  constructor(producto: IProductos, cantidad: number = 1) {
    this.producto = producto;
    this.cantidad = cantidad;
  }
}
