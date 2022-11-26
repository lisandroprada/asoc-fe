import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'market',
        loadChildren: () =>
          import('./market/market.module').then((m) => m.MarketModule),
      },
      {
        path: 'balance',
        loadChildren: () =>
          import('./balance/balance.module').then((m) => m.BalanceModule),
      },
      {
        path: 'blank',
        component: BlankPageComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
