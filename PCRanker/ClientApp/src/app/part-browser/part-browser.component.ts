import { Component, OnInit } from '@angular/core';
import { DataRetrieveService } from 'src/data-retrieve.service';
import { DataSource } from '@angular/cdk/collections';
import { Part } from '../part';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-part-browser',
  templateUrl: './part-browser.component.html',
  styleUrls: ['./part-browser.component.sass']
})

export class PartBrowserComponent implements OnInit {
  partInfo: any;
  partTypes: any;
  displayedColumns: string[] = ["id","name", "rank", "benchmarkScore"]

  constructor(private dataRetrieve: DataRetrieveService) {}
  ngOnInit() 
  {
    this.dataRetrieve.getModelData("PartTypes").subscribe(types => this.partTypes = types);
    this.partInfo = this.dataRetrieve.getFilteredParts();
    console.log(this.partInfo);
  }
}