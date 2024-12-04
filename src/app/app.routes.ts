import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { SupportComponent } from './features/soporte-tecnico/support.component';
import { BlogComponent } from './features/blog/blog.component';
import { BlogC1Component } from './features/blog/bloC1.component';
import { BlogC2Component } from './features/blog/bloC2.component';
import { BlogC3Component } from './features/blog/bloC3.component';

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
      },
      {
        path: 'blog', // Ruta para el blog
        component: BlogComponent,
      },
      {
        path: 'blogC3', // Ruta para el blog
        component: BlogC3Component,
      },
      {
        path: 'blogC2', // Ruta para el blog
        component: BlogC2Component,
      },
      {
        path: 'blogC1',
        component: BlogC1Component,
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
