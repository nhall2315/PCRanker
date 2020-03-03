import { Injectable, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Part, PartType, Build, BuildPart } from '../part';
import { ErrorHandleService } from './error-handle.service';

@Injectable({
  providedIn: 'root'
})
export class PartTypeService {
  myAppUrl: string = "";

  constructor(private _http: HttpClient, private _errorHandler: ErrorHandleService, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getPartTypes(){
    return this._http.get<PartType[]>(this.myAppUrl + 'api/PartTypes').pipe(
      catchError(this._errorHandler.errorHandler),
      );
  }

}