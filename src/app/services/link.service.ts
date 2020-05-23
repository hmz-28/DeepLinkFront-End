import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {empty, Observable, throwError} from 'rxjs';
import {Link} from "../model/link";
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LinkService {
 // private api = "http://localhost:8080/api/deeplinks/";
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
    return this.http.get<Link[]>( 'api/deeplinks/users/' + id + '/links', this.httpOptions).pipe(
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
        this.openSnackBar("Link added successfully", "", "green-snackbar");
        return res || {}
      }),
      catchError((err, caught) => {
        this.openSnackBar("error when add Link", "", "red-snackbar");
        return empty();
      })
    );
  }

  /**
   * Update an existing link object in the Backend server data base.
   * @param link
   */
  updateLink(link: Link, userid: number): Observable<any> {
    return this.http.put<any>( 'api/deeplinks/users/' + userid + '/links/' + link.id, link, this.httpOptions).pipe(
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
    return this.http.delete<any>( 'api/deeplinks/users/' + userid + '/link/' + linkid, this.httpOptions).pipe(
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


  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [className]
    });
  }
}
