import { Injectable } from '@angular/core';
import { Carrito } from '../modelos/carrito';
import { IProductos } from '../../productos/modelos/iproductos';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carritoItems: Carrito[] = [];

  private cantidadItemSubjet = new BehaviorSubject<number>(0);
  public cantidadItem$: Observable<number> = this.cantidadItemSubjet.asObservable();

  constructor() {
    this.obtenerCarritoStorage();
  }

  private emitirCantidad() {
    this.cantidadItemSubjet.next(this.carritoItems.length);
  }

  obtenerCarrito() {
    return this.carritoItems;
  }

  agregarProductoCarrito(producto: IProductos, cantidad: number = 1): 'nuevo' | 'duplicado' {
    const existe = this.carritoItems.findIndex((item) => item.producto.id == producto.id);

    if (existe === -1) {
      const nuevoItem = new Carrito(producto, cantidad);
      this.carritoItems.push(nuevoItem);
      this.guardarCarritoStorage();
      return 'nuevo';
    } else {
      return 'duplicado';
    }
  }

  getTotalItems() {
    return this.carritoItems.length;
  }

  calcularTotal() {
    const total = this.carritoItems.reduce(
      (sum, item) => sum + item.producto.precio * item.cantidad,
      0
    );
    return total;
  }

  eliminarItem(index: number): boolean {
    if (index >= 0 && index < this.carritoItems.length) {
      this.carritoItems.splice(index, 1);
      this.guardarCarritoStorage();
      return true;
    } else {
      return false;
    }
  }

  guardarCarritoStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carritoItems));
    this.emitirCantidad();
  }

  obtenerCarritoStorage(): void {
    this.carritoItems = [];

    if (typeof window != 'undefined' && window.localStorage) {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado != null) {
        this.carritoItems = JSON.parse(carritoGuardado);
      }
    }
    this.emitirCantidad();
  }

  limpiarCarrito(): void {
    this.carritoItems = [];
    this.guardarCarritoStorage();
  }
}
