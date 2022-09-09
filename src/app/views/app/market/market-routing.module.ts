import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'analytics' },

  {
    path: 'analytics',
    component: AnalyticsComponent,
  },
  {
    path: 'inventory',
    component: InventoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketRoutingModule {}
