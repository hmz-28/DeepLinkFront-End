import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable ,Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private api = "http://localhost:8080";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
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

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.api+ '/links/');
  }
}
