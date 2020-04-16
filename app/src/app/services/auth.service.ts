import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private loginURL = "http://localhost:3000/api/users/login"
  private registerURL = 'http://localhost:3000/api/users'

  
  loginRequest(user){
    return this.http.post<any>(this.loginURL, user)
  }

  registerUser(user){
    return this.http.post<any>(this.registerURL, user)
  }

  loggedIn(): boolean{
    if(localStorage.getItem('token') !== null){
      return true
    }
    return false
  }

  getToken() {
    return localStorage.getItem('token')
  }

  
}
