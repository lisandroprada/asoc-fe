import { UserRole } from './user.role';

export interface IMenu {
  text: string;
  icon: string;
  routerLink?: string;
  role?: UserRole[];
  children?: IMenuItem[];
}
export interface IMenuItem {
  text: string;
  icon: string;
  routerLink: string;
  role?: string;
}

const data: IMenu[] = [
  {
    text: 'Dashboard',
    icon: 'dashboard',
    routerLink: 'dashboard',
  },
  // {
  //   text: 'Aplicaciones',
  //   icon: 'storefront',
  //   children: [
  //     {
  //       text: 'Analytics',
  //       icon: 'analytics',
  //       routerLink: '/app/market/analytics',
  //     },
  //     {
  //       text: 'Inventory',
  //       icon: 'inventory',
  //       routerLink: '/app/market/inventory',
  //     },
  //   ],
  // },
  {
    text: 'Asociados',
    icon: 'manage_accounts',
    routerLink: '/app/customers',
  },
  // {
  //   text: 'Logistics',
  //   icon: 'local_shipping',
  // },
  // {
  //   text: 'Blank Page',
  //   icon: 'check_box_outline_blank',
  //   routerLink: 'blank',
  // },
  {
    text: 'Configuración',
    icon: 'settings',
    routerLink: 'settings',
  },
  // {
  //   text: 'Sub Menu',
  //   icon: 'list',
  //   children: [
  //     {
  //       text: 'Content',
  //       icon: 'list',
  //       routerLink: '/app/submenu',
  //     },
  //     {
  //       text: 'Productos',
  //       icon: 'all_inbox',
  //       routerLink: '/app/submenu/analytics',
  //     },
  //   ],
  // },
  // {
  //   text: 'Sucursales',
  //   icon: 'supervised_user_circle',
  //   routerLink: '/app/locations',
  //   role: [UserRole.admin, UserRole.user],
  // },
  //   {
  //     text: 'Consultas',
  //     icon: 'inventory_2',
  //     role: [UserRole.admin, UserRole.user],
  //     children: [
  //       // {
  //       //   text: 'Stocks',
  //       //   icon: 'category',
  //       //   routerLink: '/app/query/query-a',
  //       // },
  //       {
  //         text: 'Stocks',
  //         icon: 'layers',
  //         routerLink: '/app/query/query-b',
  //       },
  //       // {
  //       //   text: 'Product',
  //       //   icon: 'all_inbox',
  //       //   routerLink: '/product/manage',
  //       // },
  //     ],
  //   },
  //   {
  //     text: 'Usuarios',
  //     icon: 'supervised_user_circle',
  //     routerLink: '/app/user-admin',
  //     role: [UserRole.admin],
  //   },
];

export default data;
