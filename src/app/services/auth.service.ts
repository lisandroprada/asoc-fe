import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';

const api_URL = environment.api_URL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: User;

  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    // this.googleInit();
  }

  googleLogin(token: string) {
    return this.http.post(`${api_URL}/users/login/google`, { token }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.data.token);
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    // console.log('Token from validateToken', token);
    let params = new HttpParams();
    params = params.append('token', token);

    return this.http
      .get(`${api_URL}/users/validateToken`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      })
      .pipe(
        tap((res: any) => {
          const { _id, name, email, role, photo, almacen } = res.currentUser;
          this.currentUser = new User(
            _id,
            name,
            email,
            '',
            almacen,
            role,
            photo
          );
        }),
        map((res: any) => true),
        catchError((err) => of(false))
      );
  }

  async googleLogout() {
    localStorage.removeItem('token');
    this.ngZone.run(() => {
      this.router.navigateByUrl('auth/login');
    });
  }
}
