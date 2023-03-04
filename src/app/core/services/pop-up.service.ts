import { Injectable } from '@angular/core';
import {
  PopUpData,
  PopUpResultType,
  PopUpHandler,
  PopUpDataObject,
} from '../types/pop-up.types';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  modalHandler$: Subject<PopUpHandler> = new Subject<PopUpHandler>();

  modalEmitter$: Subject<PopUpResultType> = new Subject<PopUpResultType>();

  getModalData(data: PopUpHandler, windowData: PopUpDataObject): PopUpData {
    if (data.action === 'delete' && data.emitter !== 'HTTP')
      return {
        ...windowData[`delete${data.emitter}`],
        payload: data.payload as string,
      };

    if (data.action === 'logOut' && data.emitter !== 'HTTP')
      return {
        ...windowData.logOut,
        payload: data.payload as string,
      };

    if (data.action === 'save' && data.emitter !== 'HTTP')
      return {
        ...windowData.save,
        payload: data.payload as string,
      };

    if (
      data.action === 'error' &&
      typeof data.payload !== 'string' &&
      data.payload.type === 'custom'
    )
      return {
        title: `${windowData.errorHTTP.title} ${data.payload.statusCode}`,
        description: `${data.payload.message}`,
      };

    if (data.action === 'error' && data.payload instanceof HttpErrorResponse)
      return {
        title: `${windowData.errorHTTP.title} ${data.payload.status}`,
        description: `${data.payload.message}`,
      };

    return {
      title: 'Unknown error',
      description: 'Something went wrong. Please, try again',
    };
  }
}
