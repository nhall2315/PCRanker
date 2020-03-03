import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/data-retrieve.service';
import { Part, Build, BuildPart } from '../part'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-manage-builds',
  templateUrl: './manage-builds.component.html',
  styleUrls: ['./manage-builds.component.sass']
})
export class ManageBuildsComponent implements OnInit {
  panelOpenState: boolean;
  builds: Build[];
  buildData: Record<string, BuildPart[]> = { };
  buildScores: Record<string, number> = { };
  buildForm: FormGroup;
  selection = new SelectionModel<string>(true, []);
  partSelection = new SelectionModel<BuildPart>(true, []);
  snackBarConfig = new MatSnackBarConfig();
  label: string;
  action: boolean = false;
  score: number;
  constructor(private db: DatabaseService, private snackBar: MatSnackBar) { }

  //Form set up, and build data gathered
  ngOnInit() {
    this.buildForm= new FormGroup({
      'name': new FormControl(null, Validators.required)
    });
    this.panelOpenState = false;
    this.setupBuildData();
    this.configSnackBar();
  }

  //Gets each build name, each build's parts and build's score to display
  setupBuildData(){
    this.db.getBuilds().subscribe( builds => { 
      this.builds = builds;
      for(let build of this.builds){
        this.db.getBuildParts(build.id).subscribe(parts => 
          {
            this.buildData[build.name] = parts;
            this.buildData[build.name]['id'] = build.id;
            this.getOverallScore(build.name);
          });
      }
    });
  }
  configSnackBar(){
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.duration = 2000;
  }
  openSnackBar(msg){
    this.snackBar.open(msg, this.label, this.snackBarConfig);
  }

  //Computes each build's total benchmark scores
  getOverallScore(buildName){
    let buildParts = this.buildData[buildName];
    this.buildScores[buildName] = 0;
    for(let buildPart of buildParts){
      this.buildScores[buildName] += buildPart['part']['benchmarkScore'];
    }
  }

  //Handles creation of new builds
  onBuildCreate(event){
    if(this.buildData[this.buildForm.value.name]){
      this.openSnackBar('Build names must be unique!');
    }
    else{
      let newBuild: any = {name: this.buildForm.value.name};
      this.db.addBuildData(newBuild).subscribe(build =>{
        this.openSnackBar("Build has been successfully created!");
        this.buildData[build.name] = [];
        this.buildData[build.name]['id'] = build.id;
        this.buildScores[build.name] = 0;
      });
    }
  }
  //On deletion, the build's entries from the page's display info is deleted
  //Build's checkbox is also toggled off
  onBuildDelete(){
    console.log(this.selection.selected);
    if(this.selection.selected.length > 0){
        for(let selected of this.selection.selected){
          let buildID = this.buildData[selected]['id'];
          this.selection.toggle(selected);
          this.db.deleteBuild(buildID).subscribe(resp => {
            delete this.buildData[selected];
            delete this.buildScores[selected];
          });
        }
        this.openSnackBar("The selected builds have been deleted!");
    }
    else{
      this.openSnackBar("No builds have been selected!");
    }
  }

  //On deletion, the display info is updated to exclude the part
  //Build part's check box is also toggled off
  onBuildPartDelete(){
    console.log(this.partSelection.selected);
    if( this.partSelection.selected.length > 0){
      for(let buildPart of this.partSelection.selected){
        let buildName = buildPart['build']['name'];
        let buildParts = this.buildData[buildName];
        let partID = buildPart['part']['id'];

        this.partSelection.toggle(buildPart);
        this.buildData[buildName] = buildParts.filter(bp => bp.part.id != partID);
        this.db.deleteBuildParts(buildPart.buildID, buildPart.partID).subscribe(resp =>{
          this.getOverallScore(buildName);
        });
      }
      this.openSnackBar("The selected build parts have been deleted!");
    }
    else{
      this.openSnackBar("No builds parts have been selected!")
    }
  }

  checkboxLabel(row?: string): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  //Called from the template to get the build score
  getBuildScore(buildData: any){
    let dictKey = buildData['key'];
    this.score = this.buildScores[dictKey];
  }
}
