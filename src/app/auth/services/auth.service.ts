import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import {
  SignInResponseBody,
  SignInBody,
  SignUpBody,
} from 'src/app/core/types/auth.types';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isSingInFromStorage = !!localStorage.getItem('token');

  isSingIn$ = new BehaviorSubject(this.isSingInFromStorage);

  constructor(private httpResponse: HttpService, private router: Router) {}

  signUp(data: SignUpBody): void {
    this.httpResponse.signUp(data).subscribe((resp) => {
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
      if (typeof respSingIn === 'object' && 'token' in respSingIn) {
        this.setSingInConfigs(respSingIn);
      } else {
        return;
      }
    });
  }

  setSingInConfigs(respSingIn: SignInResponseBody): void {
    this.isSingIn$.next(true);
    localStorage.setItem('token', respSingIn.token);
    localStorage.setItem('userId', respSingIn._id);
    this.router.navigateByUrl('/main');
  }

  logOut(): void {
    this.isSingIn$.next(false);
    localStorage.clear();
    this.router.navigateByUrl('/welcome');
  }
}
