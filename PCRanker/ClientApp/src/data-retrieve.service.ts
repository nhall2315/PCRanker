import { Injectable, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  myAppUrl: string = "";
  dataDict: { [key: string]: any; } = {};
  partTypes: string[] = ["CPU", "GPU", "RAM", "HDD", "SSD"];
  
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
    //his.getModelData("PartTypes").subscribe(types => this.partTypes = types);
  }
  getModelData(model: string){
    return this._http.get(this.myAppUrl + `api/${model}`).pipe(
      catchError(this.errorHandler),
      );
  }
  addModelData(model: string, modelData){
    return this._http.post(this.myAppUrl + `api/${model}`, modelData).pipe(
      catchError(this.errorHandler),
      );
  }
  getPartList(partType: string) {
    return this._http.get(this.myAppUrl + `api/Parts/Filter/${partType}`).pipe(
      catchError(this.errorHandler),
      );
  }
  getFilteredParts(){
    for (let type of this.partTypes){
      this.getPartList(type).subscribe(partData => this.dataDict[type] = partData);
    }
    return this.dataDict;
  }
  getBuildParts(id: number){
    return this._http.get(this.myAppUrl + `api/Builds/Parts/${id}`).pipe(
      catchError(this.errorHandler),
      );
  }
  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}  

