import { Routes } from '@angular/router';
import { Login } from './modulos/login/componentes/login/login';

export const routes: Routes = [
  {
    //path: 'login',
    path: 'login',
    component: Login,
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../app/modulos/home/rutas/home.rutas').then((h) => h.HOME_ROUTERS),
  },
 // { path: '', redirectTo: 'login', pathMatch: 'full' },
];
