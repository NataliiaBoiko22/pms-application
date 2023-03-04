import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { HttpErrorService } from './http-error.service';
import {
  SignUpResponse,
  SignUpBody,
  SignInResponseBody,
  SignInBody,
} from '../types/auth.types';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url = 'http://localhost:3000';

  usersPath = '/users';

  signUpPath = '/auth/signup';

  singInPath = '/auth/signin';

  boardsPath = '/boards';

  columnsPath = '/columns';

  columnsSetPath = '/columnsSet';

  tasksPath = '/tasks';

  tasksSetPath = '/tasksSet';

  constructor(private http: HttpClient, private httpError: HttpErrorService) {}

  public getUsers(): Observable<SignUpResponse[] | Observable<never>> {
    return this.http
      .get<SignUpResponse[]>(this.url + this.usersPath)
      .pipe(catchError(async (err) => this.httpError.catchErrors(err)));
  }

  public getUser(
    userId: string
  ): Observable<SignUpResponse | Observable<never>> {
    return this.http
      .get<SignUpResponse>(this.url + this.usersPath + '/' + userId)
      .pipe(catchError(async (err) => this.httpError.catchErrors(err)));
  }

  public updateUser(
    userId: string,
    params: SignUpBody
  ): Observable<SignUpResponse | Observable<never>> {
    return this.http
      .put<SignUpResponse>(this.url + this.usersPath + '/' + userId, params)
      .pipe(catchError(async (err) => this.httpError.catchErrors(err)));
  }

  public deleteUser(
    userId: string
  ): Observable<SignUpResponse | Observable<never>> {
    return this.http
      .delete<SignUpResponse>(this.url + this.usersPath + '/' + userId)
      .pipe(catchError(async (err) => this.httpError.catchErrors(err)));
  }

  public signUp(
    params: SignUpBody
  ): Observable<SignUpResponse | Observable<never>> {
    return this.http
      .post<SignUpResponse>(this.url + this.signUpPath, params)
      .pipe(catchError(async (err) => this.httpError.catchErrors(err)));
  }

  public singIn(
    params: SignInBody
  ): Observable<SignInResponseBody | Observable<never>> {
    return this.http
      .post<SignInResponseBody>(this.url + this.singInPath, params)
      .pipe(catchError(async (err) => this.httpError.catchErrors(err)));
  }
}
