import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import links from './../../shared/links.json';
import {LinkService} from './../../services/link.service';
import {Subject} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {User} from './../../model/user';

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
  styleUrls: ['./add-deeplink.component.css']
})


export class AddDeeplinkComponent implements OnInit {

  userTable: FormGroup;
  control: FormArray;
  isSubmit: boolean;
  touchedRows: any;
  customForm: Subject<any> = new Subject();
  formattedMessage: String;
  dataSource: Array<any> = links;
  currentUser: User = {
    id: "1",
    name: "Tom",
    company: "Smartech",
    email: "",
    password: "",
    profile: "Administrateur",
    token:""
  };

  dataSet = cleanTheData(this.dataSource);

  constructor(private fb: FormBuilder, private linkService: LinkService, private authService: AuthService) {

  }

  ngOnInit(): void {

    if (this.linkService.dataRow != null) {

      this.userTable = this.fb.group({
        tableRows: this.fb.array([]),
        linkname: [this.linkService.dataRow.name, [Validators.required]],
        linkprefix: [''],
        description: [this.linkService.dataRow.description],// [Validators.required, Validators.maxLength(100)]
        customer: [this.linkService.dataRow.customer],
        environment: [this.linkService.dataRow.environment],
        editedby: [this.currentUser.name],
        modificationdate: [new Date()],
        profile: [''],
        status: ['']
      });
      // console.log( this.userTable);
      var splitted = this.linkService.dataRow.value.split("&");
      // console.log(splitted)
      splitted.forEach(function (value) {
        var splitted_value = value.split("=");
        const control = this.userTable.get('tableRows') as FormArray;
        //  console.log(splitted_value[1])
        const row = this.fb.group({
          name: [splitted_value[0]],
          value: [splitted_value[1]],
          isEditable: [false]
        });
        control.push(row);
      }.bind(this));
      this.isSubmit = false;
      this.linkService.dataRow = null;
      //this.userTable.invalid==true;

    } else {

      this.touchedRows = [];
      this.userTable = this.fb.group({
        tableRows: this.fb.array([]),
        linkname: ['', [Validators.required]],
        linkprefix: [''],
        description: ['', [Validators.required]],
        customer: [''],
        environment: [''],
        editedby: [this.currentUser.name],
        modificationdate: [new Date()],
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
      //  console.log( control)
      control.push(row);

    });
  }

  onSubmit() {
    // console.log(this.getFormControls().controls)
    const control = this.userTable.get('tableRows') as FormArray;
    var parsedJson = JSON.stringify(this.userTable.get('tableRows')[0].controls);
    console.log(parsedJson);
    // this.userTable.reset();
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

  saveUserDetails() {
    //console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm(form) {
    var control = form.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    //console.log(this.userTable.value);
    var parsedArray = control.controls;
    var mapping: String;
    parsedArray.forEach(function (group) {
      // console.log(group.get('name').value + '=' + group.get('value').value);
      mapping += group.get('name').value + '=' + group.get('value').value + '&';

    }.bind(this));

    // console.log(mapping);
    this.ngOnInit();
  }

  public redirectToUpdate(form) {
    //this.userForm.patchValue(item);

  }
}
