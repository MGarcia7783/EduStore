import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { LoginRequest } from '../modelos/login.request';
import { map, Observable } from 'rxjs';
import { LoginResponse } from '../modelos/login.response';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private httpClient = inject(HttpClient);

  url = `${environment.API_BASE_URL}/clientes`;

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const { email, password } = loginRequest;

    return this.httpClient.get<any[]>(`${this.url}?email=${email}`).pipe(
      map((clientes) => {
        if (clientes.length === 0) {
          throw new Error('Usuario no encontrado');
        }

        const cliente = clientes[0];

        if (cliente.clave != password) {
          throw new Error('Contraseña incorrecta');
        }

        const access_token = btoa(`${cliente.email}:${new Date().getTime()}`);

        localStorage.setItem('token', access_token);
        localStorage.setItem('cliente', JSON.stringify(cliente));

        return { access_token, cliente };
      })
    );
  }

  logout() {
    localStorage.clear();
  }

  getClienteActual() {
    return JSON.parse(localStorage.getItem('cliente') || 'null');
  }
}
