import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { map, Observable, Subject } from 'rxjs';
import { IClientes } from '../modelos/iclientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private httpClient = inject(HttpClient);

  url = `${environment.API_BASE_URL}/clientes`;

  private actualizarLista = new Subject<void>();
  public actualizarLista$ = this.actualizarLista.asObservable();

  mostrarTodos(): Observable<IClientes[]> {
    return this.httpClient.get<IClientes[]>(this.url);
  }

  guardarRegistro(iCliente: IClientes): Observable<IClientes> {
    return this.httpClient.post<IClientes>(this.url, iCliente)
  }

  actualizarRegistro(id: string, iCliente: IClientes): Observable<IClientes> {
    const url_local = `${this.url}/${id}`
    return this.httpClient.put<IClientes>(url_local, iCliente)
  }

  eliminarRegistro(id: string): Observable<IClientes> {
    const url_local = `${this.url}/${id}`
    return this.httpClient.delete<IClientes>(url_local)
  }

  buacarPorNombre(nombre: string): Observable<IClientes[]> {
    const url_local = `${this.url}`

    return this.httpClient.get<IClientes[]>(url_local).pipe(
      map(clientes =>
        clientes.filter(c =>
          c.nombreCliente.toLowerCase().includes(nombre.toLowerCase())
        )
      )
    );
  }

  notificarActualizacion(): void {
    this.actualizarLista.next();
  }
}
