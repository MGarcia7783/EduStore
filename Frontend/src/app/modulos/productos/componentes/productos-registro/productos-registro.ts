import { ProductosService } from './../../servicios/productos.service';
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
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Productos } from '../../modelos/productos.modelos';
import { CommonModule } from '@angular/common';
import { IProductos } from '../../modelos/iproductos';

declare var bootstrap: any;

@Component({
  selector: 'app-productos-registro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './productos-registro.html',
  styleUrl: './productos-registro.css',
})
export class ProductosRegistro implements OnInit, AfterViewInit {
  @ViewChild('modalProductos') modalRef!: ElementRef;
  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  private fb = inject(FormBuilder);
  private modalInstance: any;
  private toastr = inject(ToastrService);
  private productoService = inject(ProductosService);

  public frmProductoRegistro: FormGroup = this.fb.group({
    nombreProducto: new FormControl(''),
  });

  ngOnInit(): void {
    this.createFormProductos();
  }

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(this.modalRef.nativeElement);

    // Escuchar el cierre del modal
    this.modalRef.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.frmProductoRegistro.reset();
    });
  }

  // Crear formulario reactivo
  createFormProductos() {
    this.frmProductoRegistro = this.fb.group({
      id: [null],
      nombreProducto: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(30)],
      ],
      descripcionProducto: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(150)],
      ],
      imagen: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      precio: [
        '',
        [
          Validators.required,
          (control: AbstractControl): ValidationErrors | null => {
            if (control.value === null || control.value === '' || isNaN(control.value)) {
              return null;
            }
            const producto = new Productos('', '', Number(control.value || 0), '');
            return producto.precioValido() ? null : { precioInvalido: true };
          },
        ],
      ],
    });
  }

  // Establecer un alias para el formulario
  get fm(): { [key: string]: AbstractControl } {
    return this.frmProductoRegistro.controls;
  }

  abrirModal() {
    this.modalInstance.show();
  }

  cerrarModal() {
    this.frmProductoRegistro.reset();
    this.modalInstance.hide();
  }

  //Método para grabar un nuevo registro
  guardarRegistro() {
    if (this.frmProductoRegistro.invalid) {
      this.frmProductoRegistro.markAllAsTouched();
      this.toastr.warning('Completar todos los campos obligatorios.', 'Validación', {
        timeOut: 5000,
      });
      return;
    }

    const iProducto: IProductos = {
      id: this.fm['id'].value,
      nombreProducto: this.fm['nombreProducto'].value,
      descripcionProducto: this.fm['descripcionProducto'].value,
      precio: this.fm['precio'].value,
      imagen: this.fm['imagen'].value,
    };

    //Nuevo registro
    if (!iProducto.id) {
      delete (iProducto as any).id;
      this.productoService.guardarRegistro(iProducto).subscribe({
        next: () => {
          this.productoService.notificarActualizacion();
          this.toastr.success('Registro almacenado con éxito!', 'Registro');
          this.cerrarModal();
        },
        error: () => {
          this.toastr.error('Error al crear el registro', 'Error', { timeOut: 5000 });
        },
      });
      //Editar registro
    } else {
      if (iProducto.id) {
        this.productoService.actualizarRegistro(iProducto.id, iProducto).subscribe({
          next: () => {
            this.productoService.notificarActualizacion();
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
  cargarDatos(iProducto: IProductos) {
    this.frmProductoRegistro.patchValue({
      id: iProducto.id,
      nombreProducto: iProducto.nombreProducto,
      descripcionProducto: iProducto.descripcionProducto,
      precio: iProducto.precio,
      imagen: iProducto.imagen,
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
