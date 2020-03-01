import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/data-retrieve.service';
import { Part, Build } from '../part'

@Component({
  selector: 'app-manage-builds',
  templateUrl: './manage-builds.component.html',
  styleUrls: ['./manage-builds.component.sass']
})
export class ManageBuildsComponent implements OnInit {
  panelOpenState: boolean;
  currentParts: Part[];
  builds: Build[];
  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.panelOpenState = false;
    this.db.getBuilds().subscribe(buildList => this.builds = buildList);
  }
  onExpand(event, id){
    this.db.getBuildParts(id).subscribe(parts => this.currentParts = parts);
    console.log(this.currentParts);
  }
}
