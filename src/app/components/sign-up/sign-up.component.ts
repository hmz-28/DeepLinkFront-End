import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  error_messages = {
    'username': [
      {type: 'required', message: 'User Name is required.'},
    ],
    'email': [
      {type: 'required', message: 'Email is required.'},
      {type: 'required', message: 'please enter a valid email address.'}
    ],

    'password': [
      {type: 'required', message: 'password is required.'},
      {type: 'minlength', message: 'Password must be at least 6 characters.'},
    ],
    'confirmpassword': [
      {type: 'required', message: 'password is not mutch.'},
    ],
  }


  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {

    this.signupForm = this.fb.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
    }, {
      validators: this.password.bind(this)
    });
  }

  ngOnInit(): void {
  }

  registerUser() {

    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res) {
        //this.openSnackBar("User credentials is wrong", "","red-snackbar");
        this.signupForm.reset()
        this.router.navigate(['login']);
      }
    })
  }

  password(formGroup: FormGroup) {
    const {value: password} = formGroup.get('password');
    const {value: confirmPassword} = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : {passwordNotMatch: true};
  }

}
