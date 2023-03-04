import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiURL = environment.api_URL;

@Injectable({
  providedIn: 'root',
})
export class ContributorsService {
  constructor(public http: HttpClient) {}

  getContributors() {
    const url = apiURL + '/contributors/';
    let params = new HttpParams();
    params = params.append('sort', 'name');
    return this.http.get(url, { params });
  }

  addNewContributor(forma: any) {
    const url = apiURL + '/contributors/';
    return this.http.post(url, forma);
  }

  updateOne(id: string, forma: any) {
    const url = `${apiURL}/contributors/${id}`;
    return this.http.patch(url, forma);
  }
}
