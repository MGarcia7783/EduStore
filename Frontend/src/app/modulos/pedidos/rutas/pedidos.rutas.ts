import { Routes } from '@angular/router';
import { Pedidos } from '../paginas/pedidos/pedidos';

export const PEDIDOS_ROUTERS: Routes = [
  {
    path: '',
    component: Pedidos,
    children: [
      {
        path: '',
        redirectTo: 'catalogo',
        pathMatch: 'full',
      },
      {
        path: 'listado',
        loadComponent: () =>
          import('../componentes/pedidos-listado/pedidos-listado').then((p) => p.PedidosListado),
      },
      {
        path: 'catalogo',
        loadComponent: () =>
          import('../componentes/pedidos-catalogo/pedidos-catalogo').then((p) => p.PedidosCatalogo),
      },
    ],
  },
];
