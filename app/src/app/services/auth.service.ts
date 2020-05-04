import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'
import { LocationStrategy } from '@angular/common';

//const jwtHelper = new JwtHelperService

@Injectable({
  providedIn: 'root'
})
export class  AuthService {

  constructor(private http: HttpClient, private router: Router, private url: LocationStrategy) { }

  private loginURL = "http://localhost:3000/api/users/login"
  private registerURL = 'http://localhost:3000/api/users'
  helper = new JwtHelperService();
  
  loginRequest(user){
    return this.http.post<any>(this.loginURL, user)
  }

  registerUser(user){
    return this.http.post<any>(this.registerURL, user)
  }

  getUsers(){
    return this.http.get<any>(this.registerURL)  
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

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('permission')
    this.router.navigateByUrl('/')
  }

  isTokenExpired(): boolean{
    const token = localStorage.getItem('token')
    const decoded = this.helper.decodeToken(token)
    //console.log("Expiry sec => ",decoded.exp," Current time => ",decoded.iat)
    // if(decoded.exp < decoded.iat){
    //   console.log("Expired")
    // }
    // else{
    //   console.log("Not expired")
    // }
    return !this.helper.isTokenExpired(token);
  }

  showAdminNav(){
    if(this.url.path().includes('/admin') && localStorage.getItem('permission') == 'admin'){
      //console.log('True')
      return true
    }
    return false
  }  

}
