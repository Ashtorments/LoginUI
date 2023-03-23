import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Define the base URL for the API
  private baseUrl: string = "https://localhost:7030/api/User/"

  // Inject the HttpClient service
  constructor(private http: HttpClient) { }

  // Define a method to send a POST request to the API to register a new user
  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }
  
  // Define a method to send a POST request to the API to authenticate a user and obtain a token
  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)
  }
}
