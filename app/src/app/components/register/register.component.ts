import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  // first_name: String;
  // last_name: String;
  // email: String;
  // password: String;
  // confirm_password: String;

  registerForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required],
  });

  

  constructor(private validateService: ValidateService, private fb: FormBuilder) { 
    
   }

  // onSubmit(){
  //   console.log(this.registerForm.value.first_name);
  // }
 

  ngOnInit(): void {
  }
  
  onSubmit(){
    const user = {
      first_name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirm_password: this.registerForm.value.confirm_password
    }

    if(!this.validateService.validateRegister(user)){
      console.log("Please enter the required fields")
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      console.log("Please enter a valid email");
      return false;
    }

    if(!this.validateService.validatePassword(user.password, user.confirm_password)){
      console.log('Password do not match')
    }

    //console.log(user.password.length )
  }

}
