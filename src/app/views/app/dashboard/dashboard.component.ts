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
    this.monthRange();
  }

  monthRange() {
    const now = new Date();

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    console.log(firstDay); // 👉️ Sat Oct 01 2022 ...
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    lastDay.setHours(23, 59, 59, 999);
    console.log(lastDay); // 👉️ Mon Oct 31 2022 ...
  }

  ngOnInit(): void {}
}
