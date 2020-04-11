import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from '../../services/register.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  content = {
    title: "Tourist",
    subTitle: "Please register",
    email: "Enter email",
    password: "Enter password",
    firstName: "Enter first name",
    lastName: "Enter last name",
    confirmPassword: "Re-enter password"
  }

  userObj = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  }

  submitted = false;
  
  get registerFormControl() {
    return this.registerForm.controls;
  }

  

  registerForm = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(2)]],
    last_name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    confirm_password: ['', Validators.required]
  },
  {
    validator: this.validateService.MatchPassword('password', 'confirm_password')
  });

  constructor(private validateService: ValidateService, private fb: FormBuilder, private register: RegisterService) { 
    
   }

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

    this.submitted = true;
    if(this.registerForm.valid){
      this.register.registerUser(user)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log(err)
      )
    }



    // if(!this.validateService.validateRegister(user)){
    //   console.log("Please enter the required fields")
    //   return false;
    // }

    // if(!this.validateService.validateFirstName(user.first_name)){
    //   console.log("Only characters are allowed in first name")
    //   return false;
    // }

    // if(!this.validateService.validateLastName(user.last_name)){
    //   console.log("Only characters are allowed in first name")
    //   return false;
    // }

    // if(!this.validateService.validateEmail(user.email)){
    //   console.log("Please enter a valid email");
    //   return false;
    // }

    // if(!this.validateService.validatePassword(user.password, user.confirm_password)){
    //   console.log('Password do not match')
    // }

  }

}
