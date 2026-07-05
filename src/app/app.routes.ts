import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Gestion } from './components/gestion/gestion';
import {Asistencias} from './components/asistencias/asistencias';
import { Perfil } from './components/perfil/perfil';
import { Clases } from './components/clases/clases';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {path: '', component: Login},
  {
    path:'',
    component: Layout,
    children:[
      {path: 'dashboard', component: Dashboard,canActivate: [authGuard]},
      {path: 'gestion', component: Gestion,canActivate: [authGuard]},
      {path: 'asistencias', component: Asistencias,canActivate: [authGuard]},
      {path: 'perfil', component: Perfil,canActivate: [authGuard]},
      {path: 'clases', component: Clases,canActivate: [authGuard]},

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {path: '**', redirectTo: 'login' }
];
