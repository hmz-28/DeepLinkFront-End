import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {empty, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = new User;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpClient,
              public router: Router, private snackBar: MatSnackBar) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `api/token/signup`;
    return this.http.post<any>(api, user, {headers: this.headers}).pipe(
      map((res: Response) => {
        this.openSnackBar("User added successfully!", "", "green-snackbar");
        return res || {}
      }),
      catchError((err, caught) => {
        this.openSnackBar("User already exist!", "", "red-snackbar");
        return empty();
      })
    )
  }

  // Sign-in
  signIn(user: User) {

    return this.http.post(`api/token/generate-token`, user, {headers: this.headers})
      .subscribe((res: any) => {

          this.openSnackBar("You are logged In!", "", "green-snackbar");

          localStorage.setItem('access_token', res.result.token);
          localStorage.setItem('currentUserid', res.result.user.userId);
          //this.getUserProfile(res.result.userid).subscribe((res) => {
          this.currentUser = res.result.user;

          this.router.navigate(['dashboard']);
          //})
        },
        error => {

          this.openSnackBar("User credentials is wrong!", "", "red-snackbar");
        },
        () => {
          // 'onCompleted' callback.
          // No errors, route to new page here
        })

  }

//JWt Token
  getToken() {
    return localStorage.getItem('access_token');
  }
// if user is logged in
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

// logout
  doLogout() {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('currentUserid');
    let removeToken = localStorage.getItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `api/users/user/${id}`;
    return this.http.get(api, {headers: this.headers}).pipe(
      map((res: Response) => {

        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error Handler
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

// use angualr material snack bar
  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [className]
    });
  }
}
