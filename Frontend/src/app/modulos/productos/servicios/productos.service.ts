import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { IProductos } from '../modelos/iproductos';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private httpClient = inject(HttpClient);

  url = `${environment.API_BASE_URL}/productos`;

  mostrarTodos(): Observable<IProductos[]> {
    return this.httpClient.get<IProductos[]>(this.url);
  }

  buacarPorNombre(nombre: string): Observable<IProductos[]> {
    const url_local = `${this.url}`;

    return this.httpClient
      .get<IProductos[]>(url_local)
      .pipe(
        map((productos) =>
          productos.filter((p) => p.nombreProducto.toLowerCase().includes(nombre.toLowerCase()))
        )
      );
  }
}
