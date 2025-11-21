import { Routes } from '@angular/router';
import { Login } from './modulos/login/componentes/login/login';

export const routes: Routes = [
  {
    path: '', // RUTA RAÍZ
    component: Login, // Carga directamente el componente Login
    pathMatch: 'full'
  },
  {
    path: 'login', // Necesario para que las rutas internas sigan funcionando, aunque la raíz lo cargue.
    component: Login
  },
  {
    path: 'home',
    loadChildren: () => import('../app/modulos/home/rutas/home.rutas').then((h) => h.HOME_ROUTERS),
  },
  // La línea de redirección (path: '', redirectTo: 'login') DEBE ESTAR COMENTADA O ELIMINADA.
];
