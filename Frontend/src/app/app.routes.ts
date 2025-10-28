import { Routes } from '@angular/router';
import { Login } from './modulos/login/componentes/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'home',
    loadChildren: () => import('../app/modulos/home/rutas/home.rutas').then((h) => h.HOME_ROUTERS),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
