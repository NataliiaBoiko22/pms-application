import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import {
  SignInResponseBody,
  SignInBody,
  SignUpBody,
} from 'src/app/core/types/auth.types';
import { switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token = '';
  isSingInFromStorage = !!localStorage.getItem('token');

  isSingIn$ = new BehaviorSubject(this.isSingInFromStorage);

  constructor(private httpResponse: HttpService, private router: Router) {}

  signUp(data: SignUpBody): void {
    this.httpResponse.signUp(data).subscribe((resp) => {
      if (typeof resp === 'object' && '_id' in resp) {
        localStorage.setItem('userId', resp._id);
      }

      if (typeof resp === 'object' && '_id' in resp) {
        this.httpResponse
          .singIn({
            login: data.login,
            password: data.password,
          })
          .subscribe((respSingIn) => {
            if (typeof respSingIn === 'object' && 'token' in respSingIn) {
              this.setSingInConfigs(respSingIn);
            }
          });
      } else {
        return;
      }
    });
  }
  //////////////////////bylo//////////

  singIn(data: SignInBody): void {
    this.httpResponse.singIn(data).subscribe((respSingIn) => {
      console.log(respSingIn);
      if (typeof respSingIn === 'object' && 'token' in respSingIn) {
        this.setSingInConfigs(respSingIn);
      } else {
        return;
      }
    });
  }
  public setToken(token: string) {
    this.token = token;
  }

  setSingInConfigs(respSingIn: SignInResponseBody): void {
    this.isSingIn$.next(true);
    localStorage.setItem('token', respSingIn.token);
    this.router.navigate(['main']);
    this.httpResponse.getUsers().subscribe((value) => {
      const login = localStorage.getItem('login');
      value.forEach((el) => {
        if (el.login === login) {
          localStorage.setItem('userId', el._id);
          localStorage.setItem('userName', el.name);
        }
      });
    });

    // return value;
  }

  logOut(): void {
    this.isSingIn$.next(false);
    localStorage.clear();
    this.router.navigateByUrl('/welcome');
  }
}
