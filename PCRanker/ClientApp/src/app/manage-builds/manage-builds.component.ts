import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/data-retrieve.service';
import { Part, Build, BuildPart } from '../part'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-manage-builds',
  templateUrl: './manage-builds.component.html',
  styleUrls: ['./manage-builds.component.sass']
})
export class ManageBuildsComponent implements OnInit {
  panelOpenState: boolean;
  currentParts: Part[];
  builds: Build[];
  buildData: Record<string, any> = { };
  buildForm: FormGroup;
  selection = new SelectionModel<string>(true, []);
  partSelection = new SelectionModel<BuildPart>(true, []);
  snackBarConfig = new MatSnackBarConfig();
  label: string;
  action: boolean = false;
  constructor(private db: DatabaseService, private snackBar: MatSnackBar) { }

  //Form set up, and build data gathered
  ngOnInit() {
    this.buildForm= new FormGroup({
      'name': new FormControl(null, Validators.required)
    });
    this.panelOpenState = false;
    this.db.getBuilds().subscribe( builds => { 
      this.builds = builds;
      for(let build of this.builds){
        this.db.getBuildParts(build.id).subscribe(parts => 
          {this.buildData[build.name] = parts
            this.buildData[build.name]['id'] = build.id;
            
          });
      }
      this.getOverallScores();
    });
    this.configSnackBar()
  }
  configSnackBar(){
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.duration = 2000;
  }
  openSnackBar(msg){
    this.snackBar.open(msg, this.label, this.snackBarConfig);
  }
  getOverallScores(){
    for(let key in this.buildData.keys){
      console.log(key);
    }
  }
  onCreate(event){
    if(this.buildData[this.buildForm.value.name]){
      this.openSnackBar('Build names must be unique!');
    }
    else{
      let newBuild: any = {name: this.buildForm.value.name};
      this.db.addModelData("Builds", newBuild).subscribe(resp =>{
        this.openSnackBar("Build Successfully Created! Now refreshing the page...");
        this.refresh();
      });
    }
  }
  refresh(){
    location.reload();
  }
  onBuildDelete(){
    if(this.selection.selected.length > 0){
        for(let selected of this.selection.selected){
          let buildID = this.buildData[selected]['id'];
          this.db.deleteBuild(buildID).subscribe();
        }
        this.openSnackBar("Selected Builds Deleted! Now refresheing the page...");
        this.refresh();
    }
    else{
      this.openSnackBar("No Builds Selected!");
    }
  }
  onBuildPartDelete(){
    console.log(this.partSelection.selected);
    for(let part of this.partSelection.selected){
      this.db.deleteBuildParts(part.buildID, part.partID).subscribe(resp => {
        this.openSnackBar("Selected Parts Have Been Deleted! Now refreshing... the page");
      });
    }
    this.refresh();
  }
  checkboxLabel(row?: string): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }
}
