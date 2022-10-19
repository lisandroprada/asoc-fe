import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './page-header/page-header.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    PageHeaderComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    PageHeaderComponent,
  ],
})
export class LayoutModule {}
