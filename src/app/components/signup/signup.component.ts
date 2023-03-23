import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import validateforms from 'src/app/helpers/validateforms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    // Initializing signupForm FormGroup with form controls and validators
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // email form control with required and email validators
      password: ['', Validators.required], // password form control with required validator
      FirstName: ['', Validators.required], // FirstName form control with required validator
      LastName: ['', Validators.required], // LastName form control with required validator
    })
  }

  onSubmit() {
    if (this.signupForm.valid) { // checking if the form is valid
      console.log(this.signupForm.value)
      //sending the object to the database by calling signUp() method from the AuthenticationService
      this.auth.signUp(this.signupForm.value)
        .subscribe({
          next: (res) => {
            alert(res.message) // alerting message from server response
            this.signupForm.reset(); // resetting the form
            this.router.navigate(['login']); // navigating to login page
          },
          error: (err) => {
            alert(err?.error.message) // alerting error message from server response
          }
        })
    }
    else {
      console.log("form is not valid")
      validateforms.validateAllFormFields(this.signupForm); // validating all form fields
      alert("Invalid") // alerting the error message
    }
  }
}
