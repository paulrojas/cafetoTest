import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './admin/main/main.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './public/home.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'unauthorized', component: HomeComponent},
  {path: 'admin', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  ]},
];

export const appRoutingProviders: any[] = [
  AuthGuard
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
 
