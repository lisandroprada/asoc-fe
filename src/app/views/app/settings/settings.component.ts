import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/IMenuItem';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [],
})
export class SettingsComponent implements OnInit {
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

  constructor() {}

  openDialog(
    event: any,
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data?: any
  ) {}

  ngOnInit(): void {}
}
