import { IClientes } from './../../modelos/iclientes';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Clientes } from '../../modelos/clientes.modelos';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../servicios/cliente.service';

declare var bootstrap: any;

@Component({
  selector: 'app-clientes-registro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './clientes-registro.html',
  styleUrl: './clientes-registro.css',
})
export class ClientesRegistro implements AfterViewInit, OnInit {
  @ViewChild('modalClientes') modalRef!: ElementRef;
  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  private fb = inject(FormBuilder);
  private modalInstance: any;
  private toastr = inject(ToastrService);
  private clienteService = inject(ClienteService);

  public frmClientesRegistro: FormGroup = this.fb.group({
    identificacion: new FormControl(''),
  });

  ngOnInit(): void {
    this.createFormClientes();
  }

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(this.modalRef.nativeElement);

    // Escuchar el cierre del modal
    this.modalRef.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.frmClientesRegistro.reset();
    });
  }

  // Crear formulario reactivo
  createFormClientes() {
    this.frmClientesRegistro = this.fb.group(
      {
        id: [null],
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
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
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

  //Método para grabar un nuevo registro
  guardarRegistro() {
    if (this.frmClientesRegistro.invalid) {
      this.frmClientesRegistro.markAllAsTouched();
      this.toastr.warning('Completar todos los campos obligatorios.', 'Validación', {
        timeOut: 5000,
      });
      return;
    }

    const iCliente: IClientes = {
      id: this.fm['id'].value,
      identificacion: this.fm['identificacion'].value,
      nombreCliente: this.fm['nombreCliente'].value,
      telefono: this.fm['telefono'].value,
      email: this.fm['email'].value,
      clave: this.fm['clave'].value,
    };

    //Nuevo registro
    if (!iCliente.id) {
      delete (iCliente as any).id;
      this.clienteService.guardarRegistro(iCliente).subscribe({
        next: () => {
          this.clienteService.notificarActualizacion();
          this.toastr.success('Registro almacenado con éxito!', 'Registro');
          this.cerrarModal();
        },
        error: () => {
          this.toastr.error('Error al crear el registro', 'Error', { timeOut: 5000 });
        },
      });
      //Editar registro
    } else {
      if (iCliente.id) {
        this.clienteService.actualizarRegistro(iCliente.id, iCliente).subscribe({
          next: () => {
            this.clienteService.notificarActualizacion();
            this.toastr.success('Registro actualizado con éxito!', 'Actualización');
            this.cerrarModal();
          },
          error: () => {
            this.toastr.error('Error al actualizar el registro', 'Error', { timeOut: 5000 });
          },
        });
      }
    }
  }

  // Cargar datos
  cargarDatos(iCliente: IClientes) {
    this.frmClientesRegistro.patchValue({
      id: iCliente.id,
      identificacion: iCliente.identificacion,
      nombreCliente: iCliente.nombreCliente,
      telefono: iCliente.telefono,
      email: iCliente.email,
    });
  }

  // Método para pasar el focus
  pasarFocus(event: Event) {
    event.preventDefault();
    const inputsArray = this.inputs.toArray();
    const currentIndex = inputsArray.findIndex((el) => el.nativeElement === event.target);

    const nextInput = inputsArray[currentIndex + 1];
    if (nextInput) {
      nextInput.nativeElement.focus();
    } else {
      this.guardarRegistro();
    }
  }
}
