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
export class BuildPartService {
  myAppUrl: string = "";

  constructor(private _http: HttpClient, private _errorHandler: ErrorHandleService, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getBuildParts(id: number){
    return this._http.get<BuildPart[]>(this.myAppUrl + `api/Builds/Parts/${id}`).pipe(
      catchError(this._errorHandler.errorHandler),
      );
  }
  addBuildPart(buildPart){
    return this._http.post(this.myAppUrl + `api/BuildParts`, buildPart).pipe(
      catchError(this._errorHandler.errorHandler),
      ); 
  }

  deleteBuildParts(buildID: number, partID: number){
    return this._http.delete(this.myAppUrl + `api/BuildParts/${buildID}/${partID}`).pipe(
      catchError(this._errorHandler.errorHandler),
      ); 
  }
}
