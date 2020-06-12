import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import links from './../../shared/links.json';
import {LinkService} from './../../services/link.service';
import {AuthService} from '../../services/auth.service';
import {User} from './../../model/user';
import {Link} from "../../model/link";
import { AppDateAdapter, APP_DATE_FORMATS} from '../../shared/date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialoglinkComponent} from "../dialoglink/dialoglink.component";


const cleanTheData = data =>
  data
    // .map(({ name,value }) => this.keepRest)
    .map((obj, index) => {
      obj.key = index.toString();
      return obj;
    });


@Component({
  selector: 'app-add-deeplink',
  templateUrl: './add-deeplink.component.html',
  styleUrls: ['./add-deeplink.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})


export class AddDeeplinkComponent implements OnInit {

  userTable: FormGroup;
  control: FormArray;
  isSubmit: boolean;
  touchedRows: any;
  // customForm: Subject<any> = new Subject();
  //formattedMessage: String;
  dataSource: Array<any> = links;
  currentUser: User;

  dataSet = cleanTheData(this.dataSource);

  constructor(private fb: FormBuilder, private linkService: LinkService, private authService: AuthService,private dialog: MatDialog) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit(): void {

    if (this.linkService.dataRow != null) {

      this.userTable = this.fb.group({
        tableRows: this.fb.array([]),
        id: [this.linkService.dataRow.id],
        linkname: [this.linkService.dataRow.linkname, [Validators.required]],
        linkprefix: [''],
        description: [this.linkService.dataRow.description],// [Validators.required, Validators.maxLength(100)]
        customer: [this.linkService.dataRow.customer],
        environment: [this.linkService.dataRow.environment],
        editedby: [this.currentUser.name],
        modificationdate: [new Date(), [Validators.required]],
        profile: [''],
        status: ['']
      });
      if (this.linkService.dataRow.linkvalue != undefined) {
        var splitted = this.linkService.dataRow.linkvalue.replace('http://www.smartech-tn.com/launch?', '');
        var newsplitted = splitted.split("&");

        newsplitted.forEach(function (value) {
          var splitted_value = value.split("=");
          const control = this.userTable.get('tableRows') as FormArray;

          const row = this.fb.group({
            name: [splitted_value[0]],
            value: [splitted_value[1]],
            isEditable: [false]
          });
          control.push(row);
        }.bind(this));
      }

      this.isSubmit = false;
      this.linkService.dataRow = null;
      //this.userTable.invalid==true;

    } else {

      this.touchedRows = [];
      this.userTable = this.fb.group({
        tableRows: this.fb.array([]),
        //  id:[0],
        linkname: ['', [Validators.required]],
        linkprefix: [''],
        description: [''],//, [Validators.required]
        customer: [''],
        environment: [''],
        editedby: [this.currentUser.name],
        modificationdate: [new Date(), [Validators.required]],
        profile: [''],
        status: ['']
      });

      //this.userTable.invalid==true;
      this.updateEditCache();
      this.isSubmit = true;
    }
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {

      const control = this.userTable.get('tableRows') as FormArray;
      const row = this.fb.group({
        name: [item.name],
        value: [item.value],

        isEditable: [false]
      });

      control.push(row);

    });
  }


  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }

  initiateForm(vname: String, v_value: String): FormGroup {

    return this.fb.group({
      name: [vname, Validators.required],
      value: [v_value, [Validators.required]],
      /*   dob: ['', [Validators.required]],
        bloodGroup: [''],
        mobNumber: ['', [Validators.required, Validators.maxLength(10)]], */
      isEditable: [true]
    });
  }

  addRow() {
    const control = this.userTable.get('tableRows') as FormArray;
    const row = this.fb.group({
      name: ['',],
      value: ['',],

    });
    //console.log( control)
    control.push(row);
  }

  deleteRow(index: number) {
    const control = this.userTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }


  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm(form) {
    //console.log(form);
    var control = form.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);

    var parsedArray = control.controls;
    var mapping: String = "";
    parsedArray.forEach(function (group) {
      //    console.log(group.get('name').value + '=' + group.get('value').value);
      if (group.get('name').value != "")
        mapping += group.get('name').value + '=' + group.get('value').value + '&';

    }.bind(this));
    var newMapping = mapping.substring(0, mapping.length - 1);

    const newLink = new Link(0, form.get('linkname').value,  newMapping, form.get('customer').value,
      form.get('environment').value, form.get('editedby').value, form.get('modificationdate').value,
      form.get('status').value, form.get('description').value, form.get('profile').value);



    let id = localStorage.getItem('currentUserid');

    this.linkService.saveLink(newLink, Number(id)).subscribe(
      res => {
        //  console.log(res);
        this.openDialog(newMapping);
      }
    );

    this.ngOnInit();
  }

  public redirectToUpdate(form) {


    var control = form.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    var parsedArray = control.controls;
    var mapping: String;
    parsedArray.forEach(function (group) {
      mapping += group.get('name').value + '=' + group.get('value').value + '&';
    }.bind(this));
    const newLink = new Link(form.get('id').value, form.get('linkname').value, mapping, form.get('customer').value,
      form.get('environment').value, form.get('editedby').value, form.get('modificationdate').value,
      form.get('status').value, form.get('description').value, form.get('profile').value);
    let id = localStorage.getItem('currentUserid');

    this.linkService.updateLink(newLink, Number(id)).subscribe(
      res => {
        //console.log(res);
      }
    );
  }


  openDialog(data:string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    this.dialog.open(DialoglinkComponent, dialogConfig);
  }
}
