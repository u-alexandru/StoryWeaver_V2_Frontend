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
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private loginService: LoginService) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
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
          // Handle errors here (e.g., log, display error messages)
          console.error('Login failed:', error);
          throw error; // Rethrow the error for the calling code to handle
        }
      });
  }

}
