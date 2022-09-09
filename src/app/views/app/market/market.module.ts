import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';
import { MarketComponent } from './market.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { InventoryComponent } from './inventory/inventory.component';


@NgModule({
  declarations: [
    MarketComponent,
    AnalyticsComponent,
    InventoryComponent
  ],
  imports: [
    CommonModule,
    MarketRoutingModule
  ]
})
export class MarketModule { }
