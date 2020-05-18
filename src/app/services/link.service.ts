import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse   } from '@angular/common/http';
import { Observable ,Subject} from 'rxjs';
import {Link} from "../model/link";

import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private api = "http://localhost:8080/api/deeplinks";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json'
    })
  }
  private link: Subject<any>;
  link$: Observable<any>;
  dataRow:any;
  //link: Subject<User> = new Subject();

  constructor(private http:HttpClient) {
    this.link = new Subject();
    this.link$ = this.link.asObservable();
   }

  loadLinks(): Observable<Link[]>{
    return this.http.get<Link[]>(this.api+'/users/{userid}/links',  this.httpOptions) .pipe(
      catchError(this.errorHandler)
    );
  }
  saveLink(link: Link): Observable<Link>{
    return this.http.post<Link>(this.api+'/users/{userid}/link', link, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  /**
   * Update an existing link object in the Backend server data base.
   * @param link
   */
  updateLink(link: Link): Observable<Link>{
    return this.http.put<Link>(this.api+'/users/{userid}/links/'+link.id, link, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  /**
   * Delete an existing Link object in the Backend server data base.
   * @param link
   */
  deleteLink(link: Link): Observable<string>{
    return this.http.delete<string>(this.api+'/users/{userid}/links/'+link.id, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
