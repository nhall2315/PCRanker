import { Injectable, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Part, PartType, Build, BuildPart } from './app/part'

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
  getParts(){
    return this._http.get<Part[]>(this.myAppUrl + 'api/Parts').pipe(
      catchError(this.errorHandler),
      );
  }
  getPartTypes(){
    return this._http.get<PartType[]>(this.myAppUrl + 'api/PartTypes').pipe(
      catchError(this.errorHandler),
      );
  }
  getBuilds(){
    return this._http.get<Build[]>(this.myAppUrl + 'api/Builds').pipe(
      catchError(this.errorHandler),
      );
  }
  getBuild(id: number){
    return this._http.get<Build>(this.myAppUrl + `api/Builds/${id}`).pipe(
      catchError(this.errorHandler),
      );
  }
  addBuildData(modelData){
    return this._http.post<Build>(this.myAppUrl + `api/Builds`, modelData).pipe(
      catchError(this.errorHandler),
      ); 
  }
  addModelData(model: string, modelData){
    return this._http.post(this.myAppUrl + `api/${model}`, modelData).pipe(
      catchError(this.errorHandler),
      ); 
  }
  deleteBuild(id: number){
    return this._http.delete(this.myAppUrl + `api/Builds/${id}`).pipe(
      catchError(this.errorHandler),
      ); 
  }
  deleteBuildParts(buildID: number, partID: number){
    return this._http.delete(this.myAppUrl + `api/BuildParts/${buildID}/${partID}`).pipe(
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
    return this._http.get<BuildPart[]>(this.myAppUrl + `api/Builds/Parts/${id}`).pipe(
      catchError(this.errorHandler),
      );
  }
  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}  

