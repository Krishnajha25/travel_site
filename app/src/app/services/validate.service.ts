import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }


  validateFirstName(first_name){
    const re = /^[A-Za-z]+$/
    return re.test(String(first_name).toLowerCase());
  }

  validateLastName(last_name){
    const re = /^[A-Za-z]+$/
    return re.test(String(last_name).toLowerCase());
  }

  MatchPassword(password: string, confirm_password: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirm_password];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
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
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(email.value) == false) 
        {
            //alert('Invalid Email Address');
            return false;
        }

        return true;
  }

  
}
