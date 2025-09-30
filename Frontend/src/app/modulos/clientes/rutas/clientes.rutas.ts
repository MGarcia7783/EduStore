import { Clientes } from './../paginas/clientes/clientes';
import { Routes } from "@angular/router";

export const CLIENTES_ROUTERS: Routes = [
  {
    path: '',
    component: Clientes,
    children: [
      {
        path: '',
        redirectTo: 'listado',
        pathMatch: 'full'
      },
      {
        path: 'listado',
        loadComponent: () =>
          import('../componentes/clientes-listado/clientes-listado').then(c => c.ClientesListado),
      }
    ]
  }
]
