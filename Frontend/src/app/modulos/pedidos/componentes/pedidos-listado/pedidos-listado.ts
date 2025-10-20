import { ToastrService } from 'ngx-toastr';
import { IPedidos } from '../../modelos/ipedidos';
import { PedidosService } from './../../servicios/pedidos.service';
import { Component, inject, OnInit } from '@angular/core';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos-listado',
  imports: [DatePipe, CurrencyPipe, PaginationModule, FormsModule],
  templateUrl: './pedidos-listado.html',
  styleUrl: './pedidos-listado.css',
})
export class PedidosListado implements OnInit {
  private pedidoService = inject(PedidosService);
  private toastr = inject(ToastrService);

  public pedidos: IPedidos[] = [];

  public registroPaginado: IPedidos[] = [];
  totalItems = 0;
  pageItems = 5;
  currentPage = 1;

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidoService.mostrarTodos().subscribe({
      next: (res) => {
        this.pedidos = res;
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
}
