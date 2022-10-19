import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';
import { MarketComponent } from './market.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { LayoutModule } from 'src/app/components/layout/layout.module';

@NgModule({
  declarations: [MarketComponent, AnalyticsComponent, InventoryComponent],
  imports: [CommonModule, MarketRoutingModule, MaterialModule, LayoutModule],
})
export class MarketModule {}
