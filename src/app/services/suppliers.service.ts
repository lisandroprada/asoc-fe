import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiURL = environment.api_URL;

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient) {}

  getSuppliers() {
    const url = apiURL + '/suppliers/';
    let params = new HttpParams();
    params = params.append('sort', 'name');
    return this.http.get(url, { params });
  }

  addNewSupplier(forma: any) {
    const url = apiURL + '/suppliers/';
    return this.http.post(url, forma);
  }

  updateOne(id: string, forma: any) {
    const url = `${apiURL}/suppliers/${id}`;
    return this.http.patch(url, forma);
  }
}
