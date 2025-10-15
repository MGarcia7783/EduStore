import { Injectable } from '@angular/core';
import { Carrito } from '../modelos/carrito';
import { IProductos } from '../../productos/modelos/iproductos';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoItems : Carrito[] = [];

  obtenerCarrito() {
    return this.carritoItems;
  }

  agregarProductoCarrito(producto : IProductos, cantidad: number = 1): 'nuevo' | 'duplicado' {
    const existe = this.carritoItems.findIndex((item) => item.producto.id == producto.id);

    if(existe === -1) {
      const nuevoItem = new Carrito(producto, cantidad);
      this.carritoItems.push(nuevoItem);
      return 'nuevo';
    } else {
      return 'duplicado';
    }
  }
}
