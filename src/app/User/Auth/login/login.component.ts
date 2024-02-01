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
  formUnexpecterError: boolean = false;
  constructor(private loginService: LoginService, private http: HttpClient) { }

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
    if (!this.emailFormControl.valid || !this.passwordFormControl.valid || !this.rememberMeFormControl.valid) {
      return;
    }

    const loginData : ILogin = {
      email: this.emailFormControl.value!,
      password: this.passwordFormControl.value!,
      remember_me: Boolean(this.rememberMeFormControl.value!)
    }

    this.loginService.login(loginData)
      .subscribe({
        next: data => {
          // Handle response here
        },
        error: error => {
          if(error.status === 401) {
            this.formGeneralErrorMessage = error.error.message;
            this.formUnexpecterError = false;
          } else {
            this.formUnexpecterError = true;
            this.formGeneralErrorMessage = null;
          }
          throw error; // Rethrow the error for the calling code to handle
        }
      });
  }

  clearAlert() {
    this.formGeneralErrorMessage = null;
    this.formUnexpecterError = false;
  }

}
