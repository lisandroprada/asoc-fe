import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainBalanceComponent } from './main-balance/main-balance.component';

const routes: Routes = [{ path: '', component: MainBalanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalanceRoutingModule {}
