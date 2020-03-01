import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService} from 'src/data-retrieve.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Part, PartType, Build } from '../part';
import { BehaviorSubject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { catchError, tap } from 'rxjs/operators';


@Component({
  selector: 'app-part-browser',
  templateUrl: './part-browser.component.html',
  styleUrls: ['./part-browser.component.sass']
})

export class PartBrowserComponent implements OnInit {
  partInfo: any;
  partTypes: PartType[];
  selectedBuild: Part;
  dataSource: MatTableDataSource<Part>;
  displayedColumns: string[] = ["select","id", "partType","name", "rank", "benchmarkScore"]
  selection = new SelectionModel<Part>(true, []);
  builds: Build[];
  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dataRetrieve: DatabaseService) {}
  ngOnInit() 
  {
    this.dataRetrieve.getPartTypes().subscribe(types => this.partTypes = types);
    this.dataRetrieve.getParts().subscribe(parts => {
      this.dataSource = new MatTableDataSource(parts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.dataRetrieve.getBuilds().subscribe(builds => this.builds = builds);  
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Part): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  onSubmit()
  {
    if(this.selectedBuild && this.selection.selected)
    {
      for(let part of this.selection.selected)
      {
        let buildPart = {buildID: this.selectedBuild.id, partID: part.id};
        this.dataRetrieve.addModelData("BuildParts", buildPart).subscribe();
      }
    }
  }
}