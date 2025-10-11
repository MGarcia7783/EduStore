import { Component, inject, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { ToastrService } from 'ngx-toastr';
import { IProductos } from '../../modelos/iproductos';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-productos-listado',
  imports: [
    ReactiveFormsModule,
    PaginationModule,
    FormsModule
  ],
  templateUrl: './productos-listado.html',
  styleUrl: './productos-listado.css',
})
export class ProductosListado implements OnInit {
  private productoService = inject(ProductosService);
  private toastr = inject(ToastrService);
  public productos: IProductos[] = [];

  public registroPaginado: IProductos[] = [];
  totalItems = 0;
  pageItems = 5;
  currentPage = 1;

  private fb = inject(FormBuilder);
  public frmListadoProductos = this.fb.group({
    nombreProducto: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAll();

    this.frmListadoProductos.controls['nombreProducto'].valueChanges.subscribe(
      (nombre: string | null) => {
        if (nombre && nombre.trim() !== '') {
          this.buscarRegistro(nombre);
        } else {
          this.getAll();
        }
      }
    );
  }

  getAll() {
    this.productoService.mostrarTodos().subscribe({
      next: (res) => {
        this.productos = res;
        this.totalItems = this.productos.length;
        this.registroPaginado = this.productos.slice(0, this.pageItems);
      },
      error: () => {
        this.toastr.error('Error al cargar listado de productos', 'Error', { timeOut: 6000 });
      },
    });
  }

  buscarRegistro(nombre: string) {
    this.productoService.buacarPorNombre(nombre).subscribe({
      next: (res) => {
        this.productos = res;
        this.totalItems = this.productos.length;
        this.currentPage = 1;
        this.registroPaginado = this.productos.slice(0, this.pageItems);
      },
      error: () => {
        this.toastr.error('Error al buscar el registro', 'Error', { timeOut: 5000 });
      },
    });
  }

    cambiarPagina(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = startItem + event.itemsPerPage;
    this.registroPaginado = this.productos.slice(startItem, endItem);
  }
}
