import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { SupportComponent } from './features/soporte-tecnico/support.component';

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
      {
        path: 'soporte-tecnico',
        component: SupportComponent,
      } /*
      EJEMPLO DE COMO AGREGAR UNA NUEVA RUTA
      {
        path: 'agencia',
        component: AgenciaComponent,
      },
      {
        path: 'app-movil',
        component: AppMovil,
      }*/,
    ],
  },
];
