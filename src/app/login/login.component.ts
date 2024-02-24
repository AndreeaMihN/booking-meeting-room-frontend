import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    console.log(this.loginFormGroup.value)
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.loginFormGroup.value)

    if (this.loginFormGroup.invalid) return;

    this.auth.login(this.loginForm['email'].value, this.loginForm['password'].value).subscribe(
      (user) => {
        this.authError = false;
        this.localstorageService.setToken(user['token']);
        this.router.navigate(['/dashboard']);
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the Server, please try again later!';
        }
      }
    );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
