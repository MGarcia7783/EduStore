import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { IPedidos } from '../modelos/ipedidos';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private httpClient = inject(HttpClient);

  url = `${environment.API_BASE_URL}/pedidos`;

  mostrarTodos(): Observable<IPedidos[]> {
    return this.httpClient.get<IPedidos[]>(this.url);
  }

  guardarRegistro(iPedido: IPedidos): Observable<IPedidos> {
    return this.httpClient.post<IPedidos>(this.url, iPedido);
  }
}
