import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      /*
      EJEMPLO DE COMO AGREGAR UNA NUEVA RUTA
      {
        path: 'agencia',
        component: AgenciaComponent,
      },
      {
        path: 'app-movil',
        component: AppMovil,
      }*/
    ],
  },
];
