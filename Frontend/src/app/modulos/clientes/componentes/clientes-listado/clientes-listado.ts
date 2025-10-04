import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { IClientes } from '../../modelos/iclientes';
import { ToastrService } from 'ngx-toastr';
import { ClientesRegistro } from "../clientes-registro/clientes-registro";

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

  private fb = inject(FormBuilder);
  public frmListadoClientes = this.fb.group({
    nombreCliente: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.clienteService.getAll().subscribe({
      next: (res) => {
        this.clientes = res;
      },
      error: () => {
        this.toastr.error('Error al cargar listado de clientes','Error', { timeOut: 6000 });
      },
    });
  }
}
