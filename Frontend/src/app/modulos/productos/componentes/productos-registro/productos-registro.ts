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

declare var bootstrap: any;

@Component({
  selector: 'app-productos-registro',
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './productos-registro.html',
  styleUrl: './productos-registro.css',
})
export class ProductosRegistro implements OnInit, AfterViewInit {
  @ViewChild('modalProductos') modalRef!: ElementRef;
  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  private fb = inject(FormBuilder);
  private modalInstance: any;
  private toastr = inject(ToastrService);
  private productosService = inject(ProductosService);

  public frmProductoRegistro: FormGroup = this.fb.group({
    nombreProducto: new FormControl(''),
  });

  ngOnInit(): void {
    this.createFormClientes();
  }

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(this.modalRef.nativeElement);

    // Escuchar el cierre del modal
    this.modalRef.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.frmProductoRegistro.reset();
    });
  }

  // Crear formulario reactivo
  createFormClientes() {
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

    // Método para pasar el focus
  pasarFocus(event: Event) {
    event.preventDefault();
    const inputsArray = this.inputs.toArray();
    const currentIndex = inputsArray.findIndex((el) => el.nativeElement === event.target);

    const nextInput = inputsArray[currentIndex + 1];
    if (nextInput) {
      nextInput.nativeElement.focus();
    } else {
      //this.guardarRegistro();
    }
  }
}
