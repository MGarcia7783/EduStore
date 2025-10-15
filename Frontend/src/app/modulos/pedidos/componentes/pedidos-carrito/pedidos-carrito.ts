import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { Carrito } from '../../modelos/carrito';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos-carrito',
  imports: [
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './pedidos-carrito.html',
  styleUrl: './pedidos-carrito.css',
})
export class PedidosCarrito implements OnInit {
  public carritoService = inject(CarritoService);
  carritoItems: Carrito[] = [];

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito() {
    this.carritoItems = this.carritoService.obtenerCarrito();
  }
}
