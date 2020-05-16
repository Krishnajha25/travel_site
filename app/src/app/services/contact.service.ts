import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:3000/api/contact"

  contactRequest(user){
    return this.http.post(this.baseUrl, user)
  }
}
