import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerData } from '../interfaces/ICustomer';

const apiURL = 'http://localhost:3005';

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

  getCustomer() {}

  createCustomer(forma: CustomerData) {
    const url = apiURL + '/customers/';
    return this.http.post(url, forma);
  }

  updateOne() {}

  deleteCustomer() {}

  getStatistics() {
    const url = apiURL + '/customers/bystatus';
    return this.http.get(url);
  }
}
