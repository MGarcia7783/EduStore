import { Routes } from '@angular/router';
import { Productos } from '../paginas/productos/productos';

export const PRODUCTOS_ROUTERS: Routes = [
  {
    path: '',
    component: Productos,
    children: [
      {
        path: '',
        redirectTo: 'listado',
        pathMatch: 'full',
      },
      {
        path: 'listado',
        loadComponent: () =>
          import('../componentes/productos-listado/productos-listado').then((p) => p.ProductosListado),
      },
    ],
  },
];
