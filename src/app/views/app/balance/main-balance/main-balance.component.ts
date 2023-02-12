import { AddNewSpendingComponent } from './../../../../containers/modals/add-new-spending/add-new-spending.component';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/IMenuItem';
import { AddNewPaymentComponent } from 'src/app/containers/modals/add-new-payment/add-new-payment.component';
import { AddNewPaymentPlanComponent } from 'src/app/containers/modals/add-new-payment-plan/add-new-payment-plan.component';
import { MatDialog } from '@angular/material/dialog';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-main-balance',
  templateUrl: './main-balance.component.html',
  styles: [],
})
export class MainBalanceComponent implements OnInit {
  menuItems: MenuItem[] = [
    { name: 'Pagos', icon: 'payments', action: 'payments', disabled: false },
    {
      name: 'Plan de Pagos',
      icon: 'account_tree',
      action: 'payments_plan',
      disabled: false,
    },
    {
      name: 'Egreso',
      icon: 'shopping_cart_checkout',
      action: 'spendings',
      disabled: false,
    },
    {
      name: 'Importar de Excel',
      icon: 'publish',
      action: 'importFromExcel',
      disabled: true,
    },
    {
      name: 'Exportar a Excel',
      icon: 'download',
      action: 'exportToExcel',
      disabled: true,
    },
  ];

  data = {
    total: 1000,
    activos: 500,
    totalPeriodo: 200,
    birthdays: 5,
  };

  constructor(
    public dialog: MatDialog,
    private balancesService: BalanceService
  ) {
    this.balancesService.getStats().subscribe((res: any) => {
      console.log(res);
      this.data.total = res.totalIncome;
      this.data.totalPeriodo = res.totalIncomeActual;
    });
  }

  ngOnInit(): void {}

  openDialog(
    event: any,
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data?: any
  ) {
    if (event.action === 'payments') {
      this.dialog.open(AddNewPaymentComponent, {
        // width: '640px',
        // height: '600px',
        maxHeight: '100vh',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data,
        disableClose: true,
      });
    }
    if (event.action === 'payments_plan') {
      this.dialog.open(AddNewPaymentPlanComponent, {
        width: '640px',
        // height: '600px',
        maxHeight: '100vh',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data,
        disableClose: true,
      });
    }
    if (event.action === 'spendings') {
      this.dialog.open(AddNewSpendingComponent, {
        width: '640px',
        // height: '600px',
        maxHeight: '100vh',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data,
        disableClose: true,
      });
    }
    console.log(event);
  }
}
