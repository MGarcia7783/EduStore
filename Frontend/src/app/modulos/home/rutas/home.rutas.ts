import { Routes } from '@angular/router';
import { Home } from '../componentes/home/home';

export const HOME_ROUTERS: Routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: 'clientes',
        loadChildren: () =>
          import('../../clientes/rutas/clientes.rutas').then((c) => c.CLIENTES_ROUTERS),
      },
      {
        path: 'productos',
        loadChildren: () =>
          import('../../productos/rutas/productos.rutas').then((c) => c.PRODUCTOS_ROUTERS),
      },
      {
        path: 'pedidos',
        loadChildren: () =>
          import('../../pedidos/rutas/pedidos.rutas').then((c) => c.PEDIDOS_ROUTERS),
      },
    ],
  },
];
