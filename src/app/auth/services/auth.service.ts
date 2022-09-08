import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/res-interface';
import { user } from '../interfaces/us-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl: string = environment.baseUrl;
  private _user!: user;


  get user() {
    return { ...this._user }
  }

  constructor(private http: HttpClient) { }

  register(usname: string, id: string, pass: string) {
    const URL = `${this.baseUrl}/auth/new`;
    const body = { usname, id, pass };

    return this.http.post<AuthResponse>(URL, body)
    .pipe(
      tap(res => 
        {
          console.log(res);
          if(res.ok)
          {
            localStorage.setItem('token', res.token!);
            this._user = {
              id: res.id!,
              usname: res.usname!
            }
          }
        }),
        map(res => res.ok),
        catchError(err => of(err.error.message))
    );

  }

  login(id: string, pass: string) {
    const URL = `${this.baseUrl}/auth/`;
    const body = { id, pass };

    return this.http.post<AuthResponse>(URL, body)
    .pipe
    (
      tap(res => {
        if(res.ok)
        {
          localStorage.setItem('token', res.token!);
          this._user = {
            id: res.id!,
            usname: res.usname!

          }
        }
      }),
      map(res => res.ok),
      catchError(err => of(err.error.message))
    );

  }

  validateToken() : Observable<boolean>
  {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
    .set('apikey', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers})
    .pipe(
      
        map(res => 
          {
            localStorage.setItem('token', res.token!);
            this._user = {
              id: res.id!,
              usname: res.usname!
            }
            return res.ok
          }),
          catchError(err => of(false))
      
    )

  }

  logOut()
  {
    localStorage.clear();
  }

}
