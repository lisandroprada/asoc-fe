import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalanceRoutingModule } from './balance-routing.module';
import { BalanceComponent } from './balance.component';
import { MainBalanceComponent } from './main-balance/main-balance.component';
import { LayoutModule } from 'src/app/components/layout/layout.module';
import { MaterialModule } from 'src/app/components/material/material.module';
import { CardsModule } from 'src/app/containers/cards/cards.module';
import { TablesModule } from 'src/app/containers/tables/tables.module';

@NgModule({
  declarations: [BalanceComponent, MainBalanceComponent],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    LayoutModule,
    MaterialModule,
    CardsModule,
    TablesModule,
  ],
})
export class BalanceModule {}
