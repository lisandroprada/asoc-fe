import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiURL = environment.api_URL;

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private http: HttpClient) {}

  createPaymentPlan(forma: any) {
    const url = apiURL + '/balance/';
    return this.http.post(url, forma);
  }

  createIndividualPPlan(forma: any, id: string) {
    const url = apiURL + `/balance/setplan/${id}`;
    console.log(url);
    return this.http.post(url, forma);
  }

  getPaymentPlan() {
    const url = apiURL + '/balance/';
    let params = new HttpParams();
    params = params.append('sort', 'startDate');
    return this.http.get(url, { params });
  }

  getMasterAccounts(
    sortActive: string,
    sortDirection: string,
    page: number,
    pageSize: number,
    search: string,
    customerId: string
  ) {
    let params = new HttpParams();
    params = params.append('sort', sortActive);
    params = params.append('limit', pageSize);
    params = params.append('page', page);
    params = params.append('target', customerId);
    if (search) {
      params = params.append('search', search);
    }
    params = params.append('balance[gt]', 0);
    const url = apiURL + '/masteraccounts';
    return this.http.get(url, { params });
  }

  // Create Receipt
  createReceipt(forma: any) {
    const url = apiURL + '/receipts/';

    return this.http.post(url, forma);
  }

  getReceipt(
    sortActive: string,
    sortDirection: string,
    page: number,
    pageSize: number,
    search: string,
    customerId: string
  ) {
    let params = new HttpParams();
    params = params.append('sort', '-date');
    params = params.append('limit', pageSize);
    params = params.append('page', page);
    params = params.append('customerId', customerId);
    if (search) {
      params = params.append('search', search);
    }
    // params = params.append('balance[gt]', 0);
    const url = apiURL + '/receipts';
    return this.http.get(url, { params });
  }

  getReceiptsNoOptions(customerId: string) {
    const url = apiURL + '/receipts/nooptions';
    let params = new HttpParams();
    params = params.append('customerId', customerId);
    return this.http.get(url, { params });
  }

  processBatch() {
    const url = apiURL + '/receipts/batchpayment';
    return this.http.post(url, '');
  }

  getStats() {
    const url = apiURL + '/receipts/stats';
    return this.http.get(url);
  }
}
