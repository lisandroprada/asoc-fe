import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerData } from '../interfaces/ICustomer';

const apiURL = environment.api_URL;

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(
    sortActive: string,
    sortDirection: string,
    page: number,
    pageSize: number,
    search: string
  ) {
    let params = new HttpParams();
    params = params.append('sort', sortActive);
    params = params.append('limit', pageSize);
    params = params.append('page', page);
    if (search) {
      params = params.append('search', search);
    }
    const url = apiURL + '/customers/';
    return this.http.get(url, { params });
  }

  getCustomerById(id: string) {
    const url = `${apiURL}/customers/${id}`;
    return this.http.get(url);
  }

  getCustomersReport() {
    // let params = new HttpParams();
    const url = apiURL + '/customers/nooptions';
    return this.http.get(url);
  }

  createCustomer(forma: CustomerData) {
    const url = apiURL + '/customers/';
    return this.http.post(url, forma);
  }

  updateOne(id: string, forma: CustomerData) {
    const url = `${apiURL}/customers/${id}`;
    return this.http.patch(url, forma);
  }

  deleteCustomer() {}

  getStatistics() {
    const url = apiURL + '/customers/bystatus';
    return this.http.get(url);
  }
}
