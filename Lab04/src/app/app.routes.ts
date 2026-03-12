import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'place-detail/:id',
    loadChildren: () =>
      import('./pages/place-detail/place-detail.module').then((m) => m.PlaceDetailModule),
  },
];
