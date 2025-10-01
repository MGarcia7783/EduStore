import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { IClientes } from '../../modelos/iclientes';

@Component({
  selector: 'app-clientes-listado',
  imports: [ReactiveFormsModule],
  templateUrl: './clientes-listado.html',
  styleUrl: './clientes-listado.css',
})
export class ClientesListado implements OnInit {
  private clienteService = inject(ClienteService);
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
      error: (err) => {
        console.error(err);
      },
    });
  }
}
