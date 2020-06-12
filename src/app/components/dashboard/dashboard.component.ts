import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

import {User} from './../../model/user';
//import $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User;

  constructor(public authService: AuthService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }

  signOut() {
    this.authService.doLogout();
  }

  openClose() {

    $("#close-sidebar").click(function () {
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function () {
      $(".page-wrapper").addClass("toggled");
    });

  }
}
