import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {User} from './../../model/user';
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: User;

  constructor(public userService: UserService, private authService: AuthService,
              private actRoute: ActivatedRoute) {

   // let id = this.actRoute.snapshot.paramMap.get('id');
    this.currentUser=this.authService.currentUser;
    /*  this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.msg;
    })*/
  }

  ngOnInit(): void {
    let id = localStorage.getItem('currentUserid');
    this.userService.getUserById(Number(id))
      .subscribe(res => {
        console.log(res);
        this.currentUser.name = res.result.username;
        this.currentUser.company = res.result.company;
        this.currentUser.email = res.result.email;
      }, err => {
        console.log(err);
        // this.isLoadingResults = false;
      });
  }

}
