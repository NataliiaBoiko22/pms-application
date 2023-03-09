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
import { Column, ColumnBody } from '../types/column.types';
import { Board, BoardBody } from '../types/board.types';
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

  public getAllColumns(
    boardId: string
  ): Observable<Column[] | Observable<never>> {
    return this.http
      .get<Column[]>(
        this.url + this.boardsPath + '/' + boardId + this.columnsPath
      )
      .pipe(catchError(async (err) => this.httpError.catchErrors(err)));
  }

  public getColumn(
    boardId: string,
    columnId: string
  ): Observable<Column | Observable<never>> {
    return this.http
      .get<Column>(
        this.url +
          this.boardsPath +
          '/' +
          boardId +
          this.columnsPath +
          '/' +
          columnId
      )
      .pipe(catchError(async (err) => this.httpError.catchErrors(err)));
  }
  public createColumn(
    boardId: string,
    params: ColumnBody
  ): Observable<Column | Observable<never>> {
    return this.http
      .post<Column>(
        this.url + this.boardsPath + '/' + boardId + this.columnsPath,
        params
      )
      .pipe(catchError(async (err) => this.httpError.catchErrors(err)));
  }

  public updateColumn(
    boardId: string,
    columnId: string,
    params: ColumnBody
  ): Observable<Column | Observable<never>> {
    return this.http
      .put<Column>(
        this.url +
          this.boardsPath +
          '/' +
          boardId +
          this.columnsPath +
          '/' +
          columnId,
        params
      )
      .pipe(catchError(async (err) => this.httpError.catchErrors(err)));
  }

  public deleteColumn(
    boardId: string,
    columnId: string
  ): Observable<Column | Observable<never>> {
    return this.http
      .delete<Column>(
        this.url +
          this.boardsPath +
          '/' +
          boardId +
          this.columnsPath +
          '/' +
          columnId
      )
      .pipe(catchError(async (err) => this.httpError.catchErrors(err)));
  }
  public getAllBoards(): Observable<Board[] | Observable<never>> {
    return this.http
      .get<Board[]>(this.url + this.boardsPath)
      .pipe(catchError(async (err) => this.httpError.catchErrors(err)));
  }
  public createBoard(params: BoardBody): Observable<Board | Observable<never>> {
    return this.http
      .post<Board>(this.url + this.boardsPath, params)
      .pipe(catchError(async (err) => this.httpError.catchErrors(err)));
  }
}
