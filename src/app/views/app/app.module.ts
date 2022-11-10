import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from 'src/app/components/layout/layout.module';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { FormsCustomModule } from 'src/app/containers/forms/forms.module';
import { SettingsComponent } from './settings/settings.component';
import { CustomersComponent } from './customers/customers.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { CardsModule } from 'src/app/containers/cards/cards.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from 'src/app/containers/modals/modals.module';
import { TablesModule } from 'src/app/containers/tables/tables.module';
import { PipesModuleModule } from 'src/app/pipes/pipes-module.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BlankPageComponent,
    SettingsComponent,
    CustomersComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    FormsCustomModule,
    MaterialModule,
    CardsModule,
    ModalsModule,
    TablesModule,
    PipesModuleModule,
  ],
})
export class AppModule {}
