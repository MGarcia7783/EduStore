import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pedidos',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit, OnDestroy {
  public carritoService = inject(CarritoService);

  cantidadProductos: number = 0;
  private carritoSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.carritoSubscription = this.carritoService.cantidadItem$.subscribe((cantidad) => {
      this.cantidadProductos = cantidad;
    });
  }

  ngOnDestroy(): void {
    if (this.carritoSubscription) {
      this.carritoSubscription.unsubscribe();
    }
  }
}
