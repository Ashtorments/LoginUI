import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import validateforms from 'src/app/helpers/validateforms'; // Importing the helper function for form validation
import { AuthenticationService } from 'src/app/services/authentication.service'; // Importing the authentication service for making API requests

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Creating an instance of FormGroup to manage form data

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    // Creating a FormGroup instance and defining form controls with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email control with required and email validators
      password: ['', Validators.required] // Password control with required validator
    })
  }

  onLogin() {
    if (this.loginForm.valid) { // Checking if the form is valid

      console.log(this.loginForm.value) // Logging the form value to the console
      // Making a login request to the authentication service using the login form data
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            alert(res.message); // Showing a success message to the user
            this.loginForm.reset(); // Resetting the form fields
            this.router.navigate(['dashboard']) // Navigating to the dashboard page
          },
          error: (err) => {
            alert(err?.error.message) // Showing an error message to the user if there is an error
          }
        })
    }
    else {
      console.log("form is not valid") // Logging a message to the console if the form is not valid
      validateforms.validateAllFormFields(this.loginForm); // Validating all form fields and showing errors to the user
      alert("Invalid") // Showing an alert message to the user that the form is invalid
    }
  }

}
