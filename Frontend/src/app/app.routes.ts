import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () =>
      import('./modulos/clientes/rutas/clientes.rutas').then(m => m.CLIENTES_ROUTERS)
  },
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
];
