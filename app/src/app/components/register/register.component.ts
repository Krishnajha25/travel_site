import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  first_name: String;
  last_name: String;
  email: String;
  password: String;
  confirm_password: String;

  constructor(private validateService: ValidateService) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateRegister(user)){
      console.log("Please enter the required fields")
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      console.log("Please enter a valid email");
      return false;
    }
  }

}
