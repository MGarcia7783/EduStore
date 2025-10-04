import { group } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Clientes } from '../../modelos/clientes.modelos';

declare var bootstrap: any;

@Component({
  selector: 'app-clientes-registro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './clientes-registro.html',
  styleUrl: './clientes-registro.css',
})
export class ClientesRegistro implements AfterViewInit, OnInit {
  @ViewChild('modalClientes') modalRef!: ElementRef;
  private fb = inject(FormBuilder);
  private modalInstance: any;

  public frmClientesRegistro: FormGroup = this.fb.group({
    identificacion: new FormControl(''),
  });

  ngOnInit(): void {
    this.createFormClientes();
  }

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(this.modalRef.nativeElement);
  }

  // Crear formulario reactivo
  createFormClientes() {
    this.frmClientesRegistro = this.fb.group(
      {
        idCliente: [null],
        identificacion: [
          '',
          [Validators.required, Validators.minLength(12), Validators.maxLength(20)],
        ],
        nombreCliente: [
          '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        ],
        telefono: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
        clave: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmarClave: ['', Validators.required],
      },
      {
        validators: (group) => {
          const cliente = new Clientes(
            '',
            '',
            '',
            '',
            group.get('clave')?.value || '',
            group.get('confirmarClave')?.value || ''
          );

          const confirmarClave = group.get('confirmarClave')?.value || '';
          if (!confirmarClave) return null;

          return cliente.clavesCoinciden() ? null : { noCoincide: true };
        },
      }
    );
  }

  // Establecer un alias para el formulario
  get fm(): { [key: string]: AbstractControl } {
    return this.frmClientesRegistro.controls;
  }

  abrirModal() {
    this.modalInstance.show();
  }

  cerrarModal() {
    this.frmClientesRegistro.reset();
    this.modalInstance.hide();
  }
}
