import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { Carrito } from '../../modelos/carrito';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-carrito',
  imports: [CurrencyPipe, FormsModule, DecimalPipe],
  templateUrl: './pedidos-carrito.html',
  styleUrl: './pedidos-carrito.css',
})
export class PedidosCarrito implements OnInit {
  public carritoService = inject(CarritoService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  carritoItems: Carrito[] = [];

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito() {
    this.carritoItems = this.carritoService.obtenerCarrito();
  }

  eliminarProducto(index: number, nombreProducto: string) {
    Swal.fire({
      title: 'Alerta',
      html: `¿Está seguro de eliminar el producto: <strong>${nombreProducto}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, elimínalo!',
      cancelButtonText: '¡No, cancela!',
    }).then((result) => {
      if (result.isConfirmed) {
        const eliminado = this.carritoService.eliminarItem(index);

        if (eliminado) {
          this.toastr.success('Registro eliminado con éxito', 'Información');
        } else {
          this.toastr.error('Error al eliminar el registro', 'Error', { timeOut: 5000 });
        }
        this.obtenerCarrito();
      }
    });
  }

  abrirCatalogo(): void {
    this.router.navigate(['pedidos/catalogo']);
  }
}
