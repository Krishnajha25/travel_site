import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private loginURL = "http://localhost:3000/api/users/login"

  constructor(private http: HttpClient) { }

  loginRequest(user){
    return this.http.post<any>(this.loginURL, user)
  }

}
