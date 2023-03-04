import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiURL = environment.api_URL;

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private http: HttpClient) {}

  getincomes() {
    const url = apiURL + '/incomes/';
    let params = new HttpParams();
    params = params.append('sort', 'Description');
    return this.http.get(url, { params });
  }

  getincomesEntries() {
    const url = apiURL + '/incomesentry/';
    let params = new HttpParams();
    params = params.append('sort', 'date');
    return this.http.get(url, { params });
  }

  addEntry(formData: any) {
    const url = apiURL + '/incomesentry/';
    return this.http.post(url, formData);
  }
}
