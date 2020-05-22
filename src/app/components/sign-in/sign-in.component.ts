import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  error_messages = {
    'username': [
      {type: 'required', message: 'User Name is required.'},
    ],
    'password': [
      {type: 'required', message: 'password is required.'}
    ]
  }

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  ngOnInit(): void {
  }

  get form() {
    return this.signinForm.controls;
  }

  loginUser() {
    this.authService.signIn(this.signinForm.value)
  }
}
