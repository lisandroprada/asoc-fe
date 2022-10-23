import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  data: any;
  constructor(private customerService: CustomerService) {
    this.customerService.getStatistics().subscribe((res: any) => {
      this.data = res;
    });
  }

  ngOnInit(): void {}
}
