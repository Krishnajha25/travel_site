import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ForgetService {

  constructor(
    private http: HttpClient
  ) { }

  forgetUrl = "http://localhost:3000/api/forgot"
  resetUrl = "http://localhost:3000/api/reset/"

  forgot(email){
    return this.http.post(this.forgetUrl, email)
  }

  resetGet(email, token){
    return this.http.get(this.resetUrl+email+'/'+token)
  }

  resetPost(email, token, password){
    return this.http.post(this.resetUrl+email+'/'+token, password)
  }
}
