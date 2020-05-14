import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'
import { LocationStrategy } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


//const jwtHelper = new JwtHelperService

@Injectable({
  providedIn: 'root'
})
export class  AuthService {

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private url: LocationStrategy,
    private matSnackBar: MatSnackBar
    ) { }

  private loginURL = "http://localhost:3000/api/users/login"
  private baseUrl = 'http://localhost:3000/api/users'
  helper = new JwtHelperService();
  
  openSnackbar(message: string, action: string){
    this.matSnackBar.open(message, action, {
      duration: 3000,
    })
  }

  loginRequest(user){
    return this.http.post<any>(this.loginURL, user)
  }

  registerUser(user){
    return this.http.post<any>(this.baseUrl, user)
  }

  getUserId(){
    return localStorage.getItem('userId')
  }

  getUsers(){
    return this.http.get<any>(this.baseUrl)  
  }

  loggedIn(): boolean{
    if(localStorage.getItem('token') !== null){
      return true
    }
    return false
  }

  isAdmin(){
    if(localStorage.getItem('permission') === 'admin'){
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
    localStorage.removeItem('userId')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('email')
    this.router.navigateByUrl('/')
    this.openSnackbar("You have logged out successfully","Close")
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

  deleteUser(id: number){
    return this.http.delete(this.baseUrl+"/"+id)
  }

  

  updateUser(user){
    return this.http.patch(this.baseUrl, user)
  }

}
