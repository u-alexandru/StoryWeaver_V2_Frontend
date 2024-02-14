import {Component, ViewChild} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDivider} from "@angular/material/divider";
import {MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {DatePipe, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {max, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../Services/Auth/auth.service";
import {IRegister} from "../../../Interfaces/Auth/iregister";
import {RegisterService} from "../../../Services/Auth/register.service";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatCard,
        MatCardActions,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatCheckbox,
        MatDivider,
        MatError,
        MatFormField,
        MatIcon,
        MatInput,
      MatDatepickerModule,
      MatFormFieldModule,
      MatInputModule,
        MatLabel,
        MatHint,
        MatStepperModule,
        NgIf,
        RouterLink,
        ReactiveFormsModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  formGeneralErrorMessage: any = null;
  formUnexpectedError: boolean = false;
  minBirthDate: Date = new Date(1900, 0, 1);
  maxBirthDate: Date = new Date();
  isFormSubmitting: boolean = false;
  registerFormArray: FormArray;
  registerForm: FormGroup;
  private authSubscription: Subscription | undefined;

  constructor(private _formBuilder:FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router, private registerService: RegisterService, private datePipe: DatePipe) {
    this.registerFormArray = this._formBuilder.array([
      new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
      }), // formGroup for step 0
      new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        birthdate: new FormControl('', Validators.required),
        password_confirmation: new FormControl('', [Validators.required]),
      }), // formGroup for step 1
      new FormGroup({}), // formGroup for step 2
    ]);

    this.registerForm = this._formBuilder.group({
      registerFormArray: this.registerFormArray
    });
  }

  onSubmit() {
    // check if form is valid
    if (!this.registerForm.valid || this.isFormSubmitting) {
      return;
    }

    const registerData : IRegister = {
      email: this.registerFormArray.at(0).get('email')?.value,
      username: this.registerFormArray.at(1).get('username')?.value,
      birth_date: this.datePipe.transform(this.registerFormArray.at(1).get('birthdate')?.value, 'yyyy/MM/dd') ?? '',
      password: this.registerFormArray.at(1).get('password')?.value,
      password_confirmation: this.registerFormArray.at(1).get('password_confirmation')?.value,
    }

    console.log(registerData);

    this.isFormSubmitting = true;
    this.registerService.register(registerData)
      .subscribe({
        next: data => {
          this.isFormSubmitting = false;
          this.stepper.next();
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

  goLogin() {
    this.router.navigate(['login']);
  }

  clearAlert() {
    this.formGeneralErrorMessage = null;
    this.formUnexpectedError = false;
  }

  protected readonly max = max;
}
