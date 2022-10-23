import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '../guards/auth.guard';
const adminRoot = environment.adminRoot;

const routes: Routes = [
  {
    path: '',
    redirectTo: adminRoot,
    pathMatch: 'full',
  },
  {
    path: 'app',
    loadChildren: () => import('./app/app.module').then((m) => m.AppModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
