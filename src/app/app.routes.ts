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
    /*
    {path: 'product', component: DashboardProductComponent, children: [
      {path: '', component: ProductOverviewComponent},
      {path: 'stats', component: ProductStatsComponent},
      {path: 'features', children: [
        {path: '', component: ProductFeaturesComponent},
        {path: 'add', component: FeaturesFormComponent},
        {path: ':id/delete', component: FeaturesFormComponent},
        {path: ':id/edit', component: FeaturesFormComponent},
      ]},
    ]},
    {path: 'item/:id', component: DetailComponent},
    {path: 'logs', component: LogsComponent},
    {path: 'form', component: FormComponent},
    {path: 'users', children: [
      {path: '', component: UsersComponent},
      {path: 'add', component: UsersFormComponent},
      {path: ':id/delete', component: UsersFormComponent},
      {path: ':id/edit', component: UsersFormComponent},
    ]},
    {path: 'templates', children: [
      {path: '', component: TemplatesComponent},
      {path: 'dashboard', component: DashboardTemplateComponent},
      {path: 'email', component: EmailTemplateComponent},
      {path: 'editor', component: EditorTemplateComponent},
    ]},
    */
  ]},
];

export const appRoutingProviders: any[] = [
  AuthGuard
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
 
