import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PopUpService } from './pop-up.service';
@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  constructor(private modalService: PopUpService) {}

  catchErrors(err: HttpErrorResponse): Observable<never>;

  catchErrors(
    err: HttpErrorResponse,
    isReturnStatus: boolean
  ): Observable<never> | number;

  catchErrors(err: HttpErrorResponse, isReturnStatus?: boolean): unknown {
    const payload =
      err.error && !(err.error instanceof ProgressEvent)
        ? {
            ...err.error,
            type: 'custom',
          }
        : err;
    this.modalService.modalHandler$.next({
      type: 'message',
      emitter: 'HTTP',
      action: 'error',
      payload: payload,
    });

    if (isReturnStatus !== undefined) {
      return isReturnStatus ? err.status : EMPTY;
    } else {
      return EMPTY;
    }
  }
}
