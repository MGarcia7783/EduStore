import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () =>
      import('./modulos/clientes/rutas/clientes.rutas').then(m => m.CLIENTES_ROUTERS)
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./modulos/productos/rutas/productos.rutas').then(m => m.PRODUCTOS_ROUTERS)
  },
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
];
