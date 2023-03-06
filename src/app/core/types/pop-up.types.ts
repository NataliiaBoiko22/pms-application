import { HttpErrorResponse } from '@angular/common/http';
import { ClientError, ServerError } from './http.types';

export interface PopUpData {
  title: string;
  description: string;
  payload?: string;
}

export interface PopUpProperties {
  data: PopUpData;
  type: PopUpTypes;
}

// export type Payload = string | ClientError | ServerError | HttpErrorResponse;

// export type PopUpEmitters = 'User' | 'Board' | 'Column' | 'Task';
// export type PopUpEvents = 'delete';
// export type PopUpActions = 'logOut' | 'save';
export type PopUpTypes = 'confirm' | 'message';

// export type PopUpBackendEmitter = 'HTTP';
// export type PopUpBackendEvents = 'error';

// export type PopUpResultType = 'confirm' | 'skip' | 'close';

// export interface PopUpHandler {
//   type: PopUpTypes;
//   emitter: PopUpEmitters | PopUpBackendEmitter;
//   action: PopUpEvents | PopUpBackendEvents | PopUpActions;
//   payload: Payload;
// }

// export interface PopUpResponse extends PopUpHandler {
//   result: PopUpResultType;
// }

// type PopUpDataObjectKeys =
//   | `${PopUpEvents}${PopUpEmitters}`
//   | `${PopUpBackendEvents}${PopUpBackendEmitter}`
//   | `${PopUpActions}`;

// export type PopUpDataObject = {
//   [key in PopUpDataObjectKeys]: PopUpData;
// };

export interface DialogData {
  message: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
}