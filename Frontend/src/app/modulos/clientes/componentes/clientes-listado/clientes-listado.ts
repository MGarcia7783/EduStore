import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes-listado',
  imports: [ReactiveFormsModule],
  templateUrl: './clientes-listado.html',
  styleUrl: './clientes-listado.css',
})
export class ClientesListado {
  private fb = inject(FormBuilder);
  public frmListadoClientes = this.fb.group({
    nombreCliente: new FormControl(''),
  });
}
