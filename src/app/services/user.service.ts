import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  //baseUrl: string = 'http://localhost:8080/api/users/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json'
    })
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>('api/users/user/' + user.id, user, this.httpOptions);
  }


  /*getUsers() : Observable<User> {
    return this.http.get<User>(this.baseUrl);
  }
*/

  getUserById(id: number): Observable<any> {

    return this.http.get<any>(`api/users/user/${id}`,this.httpOptions);
  }



  /*
    deleteUser(id: number): Observable<User> {
      return this.http.delete<User>(this.baseUrl + id);
    }*/
}
