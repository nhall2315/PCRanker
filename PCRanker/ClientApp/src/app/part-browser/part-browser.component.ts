import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Part, PartType, Build } from '../part';
import { BehaviorSubject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-part-browser',
  templateUrl: './part-browser.component.html',
  styleUrls: ['./part-browser.component.sass']
})

export class PartBrowserComponent implements OnInit {
  partInfo: any;
  partTypes: PartType[];
  selectedBuild: Build;
  dataSource: MatTableDataSource<Part>;
  displayedColumns: string[] = ['select', 'id', 'partType', 'name', 'rank', 'benchmarkScore'];
  selection = new SelectionModel<Part>(true, []);
  builds: Build[];
  label: string;
  action: false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private db: CrudService, private sb: SnackBarService) {}
  ngOnInit() {
    this.db._pts.getPartTypes().subscribe(types => this.partTypes = types);
    this.db._bs.getBuilds().subscribe(builds => this.builds = builds);
    this.setupPartData();
  }

  // Gets part data and sets up table paginator, sort and filter
  setupPartData() {
    this.db._ps.getParts().subscribe(parts => {
      this.dataSource = new MatTableDataSource(parts);
      this.dataSource.filterPredicate = (data, filter: string) => {
        return data.name.toLowerCase().includes(filter)
        || data.partType.name.toLowerCase().includes(filter)
        || data.rank.toString().includes(filter);
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
    }
  }

  // Adds selected parts to selected build and checks if the part exists in the build
  onSubmit() {
    if (this.selectedBuild && this.selection.selected) {
      for (const part of this.selection.selected) {
        const buildPart = {buildID: this.selectedBuild.id, partID: part.id};

        this.db._bps.getBuildParts(this.selectedBuild.id).subscribe(buildParts => {
          const matchingParts = buildParts.filter(bp => bp.partID === part.id);
          const matchingTypes = buildParts.filter(bp => bp.part.typeID === part.typeID);

          if (matchingParts.length > 0 || matchingTypes.length > 0) {
            this.sb.openMsg('Each build must contain unique parts and part types!');
          } else {
            this.db._bps.addBuildPart(buildPart).subscribe();
            this.sb.openMsg(`Parts have been successfully added to ${this.selectedBuild.name}!`);
          }
        });
      }
    }
    this.sb.openMsg('Please select a build or parts!');
  }
}
