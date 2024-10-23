import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, tap } from 'rxjs';
import { iAccessData } from '../interfaces/i-access-data';
import { iUser } from '../interfaces/i-user';
import { iLoginRequest } from '../interfaces/i-login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  jwtHelper: JwtHelperService = new JwtHelperService();

  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;

  authSubject$ = new BehaviorSubject<iAccessData | null>(null);

  register(newUser: Partial<iUser>) {
    return this.http.post<iAccessData>(this.registerUrl, newUser);
  }

  login(authData: iLoginRequest) {
    return this.http.post<iAccessData>(this.loginUrl, authData).pipe(
      tap((accessData) => {
        this.authSubject$.next(accessData);
        localStorage.setItem('accessData', JSON.stringify(accessData));

        const expToken = this.jwtHelper.getTokenExpirationDate(
          accessData.accessToken
        );

        if (!accessData) return;
      })
    );
  }
}
