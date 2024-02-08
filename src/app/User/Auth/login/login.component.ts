import { Component } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {ILogin} from "../../../Interfaces/Auth/ilogin";
import {LoginService} from "../../../Services/Auth/login.service";
import {HttpClient} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {AuthService} from "../../../Services/Auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButton,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  formGeneralErrorMessage: any = null;
  formUnexpectedError: boolean = false;
  isFormSubmitting: boolean = false;
  private authSubscription: Subscription | undefined;
  constructor(private loginService: LoginService, private http: HttpClient, private authService: AuthService, private router: Router) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  rememberMeFormControl = new FormControl('', [
  ]);

  onSubmit() {
    // check if form is valid
    if (!this.emailFormControl.valid || !this.passwordFormControl.valid || !this.rememberMeFormControl.valid || this.isFormSubmitting) {
      return;
    }

    const loginData : ILogin = {
      email: this.emailFormControl.value!,
      password: this.passwordFormControl.value!,
      remember_me: Boolean(this.rememberMeFormControl.value!)
    }

    this.isFormSubmitting = true;
    this.loginService.login(loginData)
      .subscribe({
        next: data => {
          this.isFormSubmitting = false;
        },
        error: error => {
          if(error.status === 401) {
            this.formGeneralErrorMessage = error.error.message;
            this.formUnexpectedError = false;
          } else {
            this.formUnexpectedError = true;
            this.formGeneralErrorMessage = null;
          }
          this.isFormSubmitting = false;
          throw error; // Rethrow the error for the calling code to handle
        }
      });
  }

  clearAlert() {
    this.formGeneralErrorMessage = null;
    this.formUnexpectedError = false;
  }
  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
       this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
