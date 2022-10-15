import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsComponent } from './inputs/inputs.component';

@NgModule({
  declarations: [InputsComponent],
  imports: [CommonModule],
  exports: [InputsComponent],
})
export class FormsCustomModule {}
