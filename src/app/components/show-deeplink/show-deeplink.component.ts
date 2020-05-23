import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {LinkService} from 'src/app/services/link.service';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from './../confirmation-dialog/confirmation-dialog.component';
import {Link} from "../../model/link";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-show-deeplink',
  templateUrl: './show-deeplink.component.html',
  styleUrls: ['./show-deeplink.component.css']
})
export class ShowDeeplinkComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //searchString: string;
  first = 0;
  // rows = 5;
  links: any[];

  displayedColumns: string[] = ['linkname', 'description', 'customer', 'environment', 'editedby', 'modificationdate',
    'profile', 'status', 'details', 'delete', 'Copy'];//'update',

  dataSource = new MatTableDataSource(this.links);
  //expandedElement: linkElement | null;
  descFilter = new FormControl();
  nameFilter = new FormControl();
  customerFilter = new FormControl();
  envFilter = new FormControl();
  editedbyFilter = new FormControl();
  modDateFilter = new FormControl();
  profileFilter = new FormControl();
  statusFilter = new FormControl();


  filteredValues = {
    description: '',
    linkname: '',
    customer: '',
    environment: '',
    editedby: '',
    modificationdate: '',
    profile: '',
    status: ''
  };
  resultsLength = 0;

  constructor(private linkService: LinkService, private router: Router, private dialog: MatDialog, private cdRef: ChangeDetectorRef,
              private authService: AuthService) {


  }

  ngOnInit(): void {

    this.applyFilter();
    const id = localStorage.getItem('currentUserid');
    this.linkService.loadLinks(Number(id)).subscribe((data: Link[]) => {

      this.links = data;
      this.dataSource.data = this.links;
      this.dataSource.filterPredicate = this.createFilter();
    })
  }

  ngAfterContentInit() {
    console.log("! changement de la date du composant !");

    this.cdRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.resultsLength = this.dataSource.data.length;
    //this.dataSource.sort = this.sort;
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


  public redirectToDetails = (url: any, row) => {
    this.linkService.dataRow = row;
    this.router.navigate(['./dashboard/add-deeplink']);
    /*  this.router.navigateByUrl(url, { skipLocationChange: true }).then(() => {

   });  */
  }
  private data: any;

  public redirectToAddLink() {
    this.linkService.dataRow = null;
    this.router.navigate(['./dashboard/add-deeplink']);

  }

  public redirectToDelete = (element: Link) => {
    //  this.dataSource.data.splice(ELEMENT_DATA.indexOf(element),1);
    //  this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataSource.data);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this data?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const userid = localStorage.getItem('currentUserid');
        this.linkService.deleteLink(Number(userid), element.id).subscribe(
          res => {
            this.data = this.dataSource.data;
            let index: number = this.data.findIndex(d => d === element);

            this.data.splice(index, 1)
            this.dataSource = new MatTableDataSource(this.data);
            this.cdRef.detectChanges();
          }
        );
      }
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.linkname.toLowerCase().indexOf(searchTerms.linkname) !== -1
        && data.description.toString().toLowerCase().indexOf(searchTerms.description) !== -1
        && data.customer.toString().toLowerCase().indexOf(searchTerms.customer) !== -1
        && data.environment.toString().toLowerCase().indexOf(searchTerms.environment) !== -1
        && data.profile.toString().toLowerCase().indexOf(searchTerms.profile) !== -1
        && data.status.toString().toLowerCase().indexOf(searchTerms.status) !== -1
        && data.editedby.toString().toLowerCase().indexOf(searchTerms.editedby) !== -1
        && data.modificationdate.toString().toLowerCase().indexOf(searchTerms.modificationdate) !== -1;
    }
    return filterFunction;
  }


  applyFilter() {
    /* this.globalFilter = filter;
     this.dataSource.filter = JSON.stringify(this.filteredValues);*/
    // create filter foreach column
    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filteredValues.linkname = name;
          this.dataSource.filter = JSON.stringify(this.filteredValues);
        }
      )
    this.descFilter.valueChanges
      .subscribe(
        description => {
          this.filteredValues.description = description;
          this.dataSource.filter = JSON.stringify(this.filteredValues);
        }
      )
    this.customerFilter.valueChanges
      .subscribe(
        customer => {
          this.filteredValues.customer = customer;
          this.dataSource.filter = JSON.stringify(this.filteredValues);
        }
      )
    this.envFilter.valueChanges
      .subscribe(
        environment => {
          this.filteredValues.environment = environment;
          this.dataSource.filter = JSON.stringify(this.filteredValues);
        }
      )

    this.editedbyFilter.valueChanges
      .subscribe(
        editedby => {
          this.filteredValues.editedby = editedby;
          this.dataSource.filter = JSON.stringify(this.filteredValues);
        }
      )
    this.modDateFilter.valueChanges
      .subscribe(
        modificationdate => {
          this.filteredValues.modificationdate = modificationdate;
          this.dataSource.filter = JSON.stringify(this.filteredValues);
        }
      )
    this.profileFilter.valueChanges
      .subscribe(
        profile => {
          this.filteredValues.profile = profile;
          this.dataSource.filter = JSON.stringify(this.filteredValues);
        }
      )

    this.statusFilter.valueChanges
      .subscribe(
        status => {
          this.filteredValues.status = status;
          this.dataSource.filter = JSON.stringify(this.filteredValues);
        }
      )
  }
}
