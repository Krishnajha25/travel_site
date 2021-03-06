import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

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

  constructor(private router: Router ,private validateService: ValidateService, private fb: FormBuilder, private register: AuthService) { 
    
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
          if(res['success'] == 1){
            this.router.navigate(['/login'])
          }
        },
        err => console.log(err)
      )
    }

  }

}
