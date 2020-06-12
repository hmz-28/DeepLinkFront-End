import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dialoglink',
  templateUrl: './dialoglink.component.html',
  styleUrls: ['./dialoglink.component.css']
})
export class DialoglinkComponent implements OnInit {
  linkvalue: string = "";

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<DialoglinkComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.linkvalue = data;
  }

  ngOnInit(): void {

  }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  /* To copy any Text */
  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.authService.openSnackBar("Link is coppied", "", "green-snackbar")
  }
}
