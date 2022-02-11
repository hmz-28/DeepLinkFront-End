import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {empty, Observable, throwError} from 'rxjs';
import {Link} from "../model/link";
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {FormArray} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json'
    })
  }

  dataRow: any;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {

  }

  /**
   * Get all links object in the Backend server data base.
   */
  loadLinks(id: number): Observable<Link[]> {
    return this.http.get<Link[]>('api/deeplinks/users/' + id + '/links', this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  /**
   * Save linkobject in the Backend server data base.
   * @param link
   */
  saveLink(link: Link, id: number): Observable<any> {

    return this.http.post<any>(`api/deeplinks/users/${id}/link`, link, this.httpOptions).pipe(
      map((res: Response) => {
       // console.log(res)
        this.openSnackBar("Link added successfully", "", "green-snackbar");
        return res || {}
      }),
      catchError((err:HttpErrorResponse) => {
       // console.log(err.json())
        this.openSnackBar(`${err.error.message}`, "", "red-snackbar");//"error when add Link"
        return empty();
      })
    );
  }

  /**
   * Update an existing link object in the Backend server data base.
   * @param link
   */
  updateLink(link: Link, userid: number): Observable<any> {
    return this.http.put<any>('api/deeplinks/users/' + userid + '/links/' + link.id, link, this.httpOptions).pipe(
      map((res: Response) => {
        this.openSnackBar("Link updated successfully", "", "green-snackbar");
        return res || {}
      }),
      catchError((err, caught) => {
        this.openSnackBar("Link not found!", "", "red-snackbar");
        return empty();
      })
    )
    //  );
  }

  /**
   * Delete an existing Link object in the Backend server data base.
   * @param userid, link id
   */
  deleteLink(userid: number, linkid: number): Observable<any> {
    return this.http.delete<any>('api/deeplinks/users/' + userid + '/link/' + linkid, this.httpOptions).pipe(
      map((res: any) => {
        this.openSnackBar("Link deleted successfully", "", "green-snackbar");
        return res || {}
      }),
      catchError((err, caught) => {
        this.openSnackBar("Link not found!", "", "red-snackbar");
        return empty();
      })
    )
  }

  /**
   * error handler
   * @param error
   */
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  /*
  * function to show notification
   */
  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [className]
    });
  }

  /**
   * function to genrate link format
   */
  linkFormat(form: FormArray): Link {

    var control = form.get('tableRows') as FormArray;
    // var touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    var parsedArray = control.controls;
    var mapping: String = "";
    parsedArray.forEach(function (group) {
      if (mapping != undefined)
        mapping += group.get('name').value + '=' + group.get('value').value + '&';
    }.bind(this));

    var newMapping = mapping.substring(0, mapping.length - 1);
    const newLink = new Link(form.get('id').value, form.get('linkname').value, newMapping, form.get('customer').value,
      form.get('environment').value, form.get('editedby').value, form.get('modificationdate').value,
      form.get('status').value, form.get('description').value, form.get('profile').value);

    return newLink;
  }

}
