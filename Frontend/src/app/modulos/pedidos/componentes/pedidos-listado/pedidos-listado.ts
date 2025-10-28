import { ToastrService } from 'ngx-toastr';
import { IPedidos } from '../../modelos/ipedidos';
import { PedidosService } from './../../servicios/pedidos.service';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosDetalle } from '../pedidos-detalle/pedidos-detalle';
import { LoginService } from '../../../login/servicios/login.service';

@Component({
  selector: 'app-pedidos-listado',
  imports: [DatePipe, CurrencyPipe, PaginationModule, FormsModule, PedidosDetalle],
  templateUrl: './pedidos-listado.html',
  styleUrl: './pedidos-listado.css',
})
export class PedidosListado implements OnInit {
  private pedidoService = inject(PedidosService);
  private toastr = inject(ToastrService);
  private loginService = inject(LoginService);
  @ViewChild('modalDetallesPedido') formModal!: PedidosDetalle;

  public pedidos: IPedidos[] = [];

  public registroPaginado: IPedidos[] = [];
  totalItems = 0;
  pageItems = 5;
  currentPage = 1;

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    const cliente = this.loginService.getClienteActual();
    if (!cliente) return;

    this.pedidoService.mostrarTodos().subscribe({
      next: (res) => {
        this.pedidos = res.filter((p) => p.datosEntrega.idCliente === cliente.id);
        this.totalItems = this.pedidos.length;
        this.registroPaginado = this.pedidos.slice(0, this.pageItems);
      },
      error: () => {
        this.toastr.error('Error al cargar los pedidos', 'Error', { timeOut: 6000 });
      },
    });
  }

  cambiarPagina(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = startItem + event.itemsPerPage;
    this.registroPaginado = this.pedidos.slice(startItem, endItem);
  }

  verDetalles(pedido: any) {
    if (pedido.id) {
      this.formModal.idPedido = pedido.id;
      this.formModal.cargarPedido(pedido.id);
      this.formModal.abrirModal();
    } else {
      this.toastr.info('El pedido seleccionado no tiene un ID válido.', 'Información', {
        timeOut: 5000,
      });
    }
  }
}
