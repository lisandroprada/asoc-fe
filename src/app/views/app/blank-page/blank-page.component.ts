import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';
import { CustomerData } from 'src/app/interfaces/ICustomer';
import { MenuItem } from 'src/app/interfaces/IMenuItem';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styles: [],
})
export class BlankPageComponent implements AfterViewInit {
  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  forma: FormGroup;
  createForm(): void {
    this.forma = this.fb.group({
      name: [],
    });
  }

  ngAfterViewInit(): void {}
  formChanged() {}
}
