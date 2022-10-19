import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumenComponent } from './resumen/resumen.component';
import { MaterialModule } from 'src/app/components/material/material.module';

@NgModule({
  declarations: [ResumenComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ResumenComponent],
})
export class CardsModule {}
