import { Injectable, Inject } from '@angular/core';
import { BuildPartService } from './build-part.service';
import { BuildService } from './build.service';
import { PartService } from './part.service';
import { PartTypeService } from './part-type.service';


@Injectable({
  providedIn: 'root'
})

export class CrudService {



;

constructor(public _bps: BuildPartService, public _bs: BuildService,public _ps: PartService, public _pts: PartTypeService, @Inject('BASE_URL') baseUrl: string) {
  
  }
}