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
export class BuildService {
  myAppUrl: string = "";

  constructor(private _http: HttpClient, private _errorHandler: ErrorHandleService, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getBuilds(){
    return this._http.get<Build[]>(this.myAppUrl + 'api/Builds').pipe(
      catchError(this._errorHandler.errorHandler),
      );
  }

  getBuild(id: number){
    return this._http.get<Build>(this.myAppUrl + `api/Builds/${id}`).pipe(
      catchError(this._errorHandler.errorHandler),
      );
  }

  addBuildData(modelData){
    return this._http.post<Build>(this.myAppUrl + `api/Builds`, modelData).pipe(
      catchError(this._errorHandler.errorHandler),
      ); 
  }

  deleteBuild(id: number){
    return this._http.delete(this.myAppUrl + `api/Builds/${id}`).pipe(
      catchError(this._errorHandler.errorHandler),
      ); 
  }

  getBuildParts(id: number){
    return this._http.get<BuildPart[]>(this.myAppUrl + `api/Builds/Parts/${id}`).pipe(
      catchError(this._errorHandler.errorHandler),
      );
  }

}
