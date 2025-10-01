import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { IClientes } from '../modelos/iclientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private httpClient = inject(HttpClient);

  url = `${environment.API_BASE_URL}/clientes`;

  getAll(): Observable<IClientes[]> {
    return this.httpClient.get<IClientes[]>(this.url);
  }
}
