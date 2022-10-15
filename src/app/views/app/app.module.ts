import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from 'src/app/components/layout/layout.module';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { FormsCustomModule } from 'src/app/containers/forms/forms.module';

@NgModule({
  declarations: [AppComponent, DashboardComponent, BlankPageComponent],
  imports: [CommonModule, AppRoutingModule, LayoutModule, FormsCustomModule],
})
export class AppModule {}
