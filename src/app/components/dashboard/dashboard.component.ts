import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { User } from './../../model/user';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User = {
    _id:"1", 
    name:"Tom", 
    company:"Smartech" ,
    email:"",
    password:"",
    profile:"Administrateur"
 }; 

  constructor(public authService: AuthService,
    public router: Router) { }

  ngOnInit(): void {
     this.currentUser==  this.authService.currentUser;
  }
  signOut(){
    this.authService.doLogout();
  }
}
