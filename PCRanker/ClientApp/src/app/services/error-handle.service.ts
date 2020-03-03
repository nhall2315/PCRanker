import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {

  constructor() { }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }

}
