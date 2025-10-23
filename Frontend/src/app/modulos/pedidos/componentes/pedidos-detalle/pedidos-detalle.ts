import { AfterViewChecked, AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { IPedidos } from '../../modelos/ipedidos';
import { PedidosService } from '../../servicios/pedidos.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, DatePipe } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-pedidos-detalle',
  imports: [
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './pedidos-detalle.html',
  styleUrl: './pedidos-detalle.css'
})
export class PedidosDetalle implements AfterViewInit {
  @Input() idPedido!: string;
  @ViewChild('modalDetallesPedido') modalRef!: ElementRef;
  private modalInstance: any;

  public pedido!: IPedidos;
  private pedidoService = inject(PedidosService);
  private toastr = inject(ToastrService);


  ngAfterViewInit(): void {
    if(this.modalRef && this.modalRef.nativeElement) {
      this.modalInstance = new bootstrap.Modal(this.modalRef.nativeElement, {
        backdrop: 'stactic',
        keyboard: false,
      });
    }
  }

  abrirModal() {
    this.modalInstance.show();
  }

  cargarPedido(id: string) {
    this.pedidoService.obtenerPedido(id).subscribe({
      next: (res) => {
        this.pedido = res;
      },
      error: () => {
        this.toastr.error('Error al cargar el pedido.', 'Error', {timeOut: 5000 });
      }
    })
  }

  cerrarModal() {
    this.modalInstance.hide();
  }
}
