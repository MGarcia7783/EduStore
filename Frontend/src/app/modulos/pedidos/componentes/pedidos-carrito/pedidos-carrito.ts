import { Component, ElementRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { Carrito } from '../../modelos/carrito';
import { CurrencyPipe, DecimalPipe, NgClass } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PedidosService } from '../../servicios/pedidos.service';
import { IPedidos } from '../../modelos/ipedidos';
import { LoginService } from '../../../login/servicios/login.service';

@Component({
  selector: 'app-pedidos-carrito',
  imports: [CurrencyPipe, FormsModule, DecimalPipe, ReactiveFormsModule, NgClass],
  templateUrl: './pedidos-carrito.html',
  styleUrl: './pedidos-carrito.css',
})
export class PedidosCarrito implements OnInit {
  public carritoService = inject(CarritoService);
  public pedidoService = inject(PedidosService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  carritoItems: Carrito[] = [];

  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  public frmDatosEntrega: FormGroup = this.fb.group({
    cliente: new FormControl(''),
  });

  ngOnInit(): void {
    this.obtenerCarrito();
    this.createFormDatosEntrega();
    this.cargarDatosCliente();
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

  createFormDatosEntrega() {
    this.frmDatosEntrega = this.fb.group({
      cliente: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      telefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      direccion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    });
  }

  get fm(): { [key: string]: AbstractControl } {
    return this.frmDatosEntrega.controls;
  }

  pasarFocus(event: Event) {
    event.preventDefault();
    const inputsArray = this.inputs.toArray();
    const currentIndex = inputsArray.findIndex((el) => el.nativeElement === event.target);

    const nextInput = inputsArray[currentIndex + 1];
    if (nextInput) {
      nextInput.nativeElement.focus();
    } else {
      // this.guardarRegistro();
    }
  }

  procesarCompra() {
    if (this.frmDatosEntrega.invalid) {
      this.frmDatosEntrega.markAllAsTouched();
      this.toastr.warning('Complete todos los campos obligatorios', 'Validación', {
        timeOut: 5000,
      });
      return;
    }

    if (this.carritoItems.length === 0) {
      this.toastr.warning('Por favor agrega productos antes de procesar la compra.', 'Validación', {
        timeOut: 5000,
      });
      return;
    }

    const cliente = this.loginService.getClienteActual();

    Swal.fire({
      title: 'Confirmar',
      html: '¿Está seguro de procesar la compra?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, continuar!',
      cancelButtonText: '¡No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        // mapear items al carrito
        const itemsPedido = this.carritoService.obtenerCarrito().map((item) => ({
          idProducto: item.producto.id,
          producto: item.producto.nombreProducto,
          cantidad: item.cantidad,
          precio: item.producto.precio,
        }));

        //Crear objeto pedido
        const pedido: IPedidos = {
          fechaPedido: new Date(),
          datosEntrega: {
            idCliente: cliente?.id ?? 0,
            cliente: this.frmDatosEntrega.value.cliente,
            telefono: this.frmDatosEntrega.value.telefono,
            direccion: this.frmDatosEntrega.value.direccion,
          },
          items: itemsPedido,
          total: this.carritoService.calcularTotal(),
        };

        //Guardar el pedido
        this.pedidoService.guardarRegistro(pedido).subscribe({
          next: () => {
            this.toastr.success('Pedido procesado correctamente.', 'Información');
            this.carritoService.limpiarCarrito();
            this.frmDatosEntrega.reset();
            this.cargarDatosCliente();
            this.obtenerCarrito();
          },
          error: () => {
            this.toastr.error('Error al procesar el pedido.', 'Error', { timeOut: 5000 });
          },
        });
      }
    });
  }

  cargarDatosCliente() {
    const cliente = this.loginService.getClienteActual();
    if (cliente) {
      this.frmDatosEntrega.patchValue({
        cliente: cliente.nombreCliente,
        telefono: cliente.telefono,
      });
    }
  }
}
