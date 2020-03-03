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
export class PartService {
  myAppUrl: string = "";
  dataDict: { [key: string]: any; } = {};
  partTypes: string[] = ["CPU", "GPU", "RAM", "HDD", "SSD"];

  constructor(private _http: HttpClient, private _errorHandler: ErrorHandleService, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getParts(){
    return this._http.get<Part[]>(this.myAppUrl + 'api/Parts').pipe(
      catchError(this._errorHandler.errorHandler),
      );
  }

  getPartList(partType: string) {
    return this._http.get(this.myAppUrl + `api/Parts/Filter/${partType}`).pipe(
      catchError(this._errorHandler.errorHandler),
      );
  }
  getFilteredParts(){
    for (let type of this.partTypes){
      this.getPartList(type).subscribe(partData => this.dataDict[type] = partData);
    }
    return this.dataDict;
  }

}