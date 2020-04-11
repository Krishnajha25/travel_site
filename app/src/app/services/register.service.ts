import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  private registerURL = 'http://localhost:3000/api/users'

  registerUser(user){
    return this.http.post<any>(this.registerURL, user)
  }
  
}
