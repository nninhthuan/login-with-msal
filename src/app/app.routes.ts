import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AuthGuard } from './helper/auth.guard';
export const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
];
