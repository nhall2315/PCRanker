import { Injectable, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  label: string;
  snackBarConfig = new MatSnackBarConfig();

  constructor(public snackBar: MatSnackBar, @Inject('BASE_URL') baseUrl: string) {
    this.snackBarConfig.duration = 2000;
  }

  openMsg(msg){
    this.snackBar.open(msg, this.label, this.snackBarConfig);
  }
}
