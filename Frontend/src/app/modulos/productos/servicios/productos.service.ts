import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { IProductos } from '../modelos/iproductos';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private httpClient = inject(HttpClient);

  url = `${environment.API_BASE_URL}/productos`;

  private actualizarLista = new Subject<void>();
  public actualizarLista$ = this.actualizarLista.asObservable();

  mostrarTodos(): Observable<IProductos[]> {
    return this.httpClient.get<IProductos[]>(this.url);
  }

  guardarRegistro(iCliente: IProductos): Observable<IProductos> {
    return this.httpClient.post<IProductos>(this.url, iCliente);
  }

  actualizarRegistro(id: string, iCliente: IProductos): Observable<IProductos> {
    const url_local = `${this.url}/${id}`;
    return this.httpClient.put<IProductos>(url_local, iCliente);
  }

  eliminarRegistro(id: string): Observable<IProductos> {
    const url_local = `${this.url}/${id}`;
    return this.httpClient.delete<IProductos>(url_local);
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

  notificarActualizacion(): void {
    this.actualizarLista.next();
  }
}
