import { Pipe, PipeTransform } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'datosCliente',
})
export class DatosClientePipe implements PipeTransform {
  constructor(private customerService: CustomerService) {}

  transform(id: string): Observable<string> {
    console.log(id);
    return this.customerService.getCustomerById(id).pipe(
      map((customer: any) => {
        console.log(customer);
        return customer.data.name;
      }) // Suponiendo que el servicio devuelve un objeto con una propiedad "name"
    );
  }
}
