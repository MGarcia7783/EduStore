import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { IClientes } from '../../modelos/iclientes';
import { ToastrService } from 'ngx-toastr';
import { ClientesRegistro } from '../clientes-registro/clientes-registro';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-listado',
  imports: [ReactiveFormsModule, ClientesRegistro],
  templateUrl: './clientes-listado.html',
  styleUrl: './clientes-listado.css',
})
export class ClientesListado implements OnInit {
  private clienteService = inject(ClienteService);
  private toastr = inject(ToastrService);
  public clientes: IClientes[] = [];
  @ViewChild('modalClientes') formModal!: ClientesRegistro;

  private fb = inject(FormBuilder);
  public frmListadoClientes = this.fb.group({
    nombreCliente: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAll();

    this.clienteService.actualizarLista$.subscribe(() => {
      this.getAll();
    });
  }

  getAll() {
    this.clienteService.mostrarTodos().subscribe({
      next: (res) => {
        this.clientes = res;
      },
      error: () => {
        this.toastr.error('Error al cargar listado de clientes', 'Error', { timeOut: 6000 });
      },
    });
  }

  modificarRegistro(iCliente: IClientes) {
    this.formModal.cargarDatos(iCliente);
    this.formModal.abrirModal();
  }

  eliminarRegistro(iCliente: IClientes) {
    Swal.fire({
      title: 'Alerta',
      html: `¿Está seguro de eliminar el cliente: <strong>${iCliente.nombreCliente}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, elimínalo!',
      cancelButtonText: '¡No, cancela!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminarRegistro(iCliente.id!).subscribe({
          next: () => {
            this.toastr.success('Registro eliminado con éxito', 'Información');
            this.getAll();
          },
          error: () => {
            this.toastr.error('Error al eliminar el registro', 'Error', { timeOut: 5000 });
          },
        });
      }
    });
  }
}
