import { Component, inject, OnInit } from '@angular/core';
import { ProductosService } from '../../../productos/servicios/productos.service';
import { ToastrService } from 'ngx-toastr';
import { IProductos } from '../../../productos/modelos/iproductos';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageChangedEvent, PaginationComponent } from 'ngx-bootstrap/pagination';
import { CarritoService } from '../../servicios/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-catalogo',
  imports: [ReactiveFormsModule, PaginationComponent, FormsModule],
  templateUrl: './pedidos-catalogo.html',
  styleUrl: './pedidos-catalogo.css',
})
export class PedidosCatalogo implements OnInit {
  private productoService = inject(ProductosService);
  private toastr = inject(ToastrService);
  private carritoService = inject(CarritoService);
  public productos: IProductos[] = [];

  public registroPaginado: IProductos[] = [];
  totalItems = 0;
  pageItems = 10;
  currentPage = 1;

  private fb = inject(FormBuilder);
  public frmCatalogoProductos = this.fb.group({
    nombreProducto: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAll();

    this.frmCatalogoProductos.controls['nombreProducto'].valueChanges.subscribe(
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

  agregarProductoCarrito(item: IProductos) {
    const agregado = this.carritoService.agregarProductoCarrito(item);

    if (agregado === 'nuevo') {
      Swal.fire({
        title: '¡Agregado con éxito!',
        html: `El producto : "${item.nombreProducto}" se agregó al carrito`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } else if (agregado === 'duplicado') {
      Swal.fire({
        title: '¡Producto duplicado!',
        html: `El producto : "${item.nombreProducto}" ya está en tu carrito`,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
