import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }


  validatePassword(password, confirm_password){
    if(password !== confirm_password) {
      return false
    }
    else{
      return true
    }
  }

  validateRegister(user){
    if(user.first_name == "" || user.last_name == "" || user.email == "" || user.password == "" || user.confirm_password == ""){
      return false;
    }
    else{
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  
}
