import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiURL = environment.api_URL;

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  getExpenses() {
    const url = apiURL + '/expenses/';
    let params = new HttpParams();
    params = params.append('sort', 'date');
    return this.http.get(url, { params });
  }

  getExpensesEntries() {
    const url = apiURL + '/expensesentry/';
    let params = new HttpParams();
    params = params.append('sort', 'date');
    return this.http.get(url, { params });
  }

  addEntry(formData: any) {
    const url = apiURL + '/expensesentry/';
    return this.http.post(url, formData);
  }
}
