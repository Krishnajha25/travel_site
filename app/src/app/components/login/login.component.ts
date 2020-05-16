import { Component, OnInit } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { ValidateService } from '../../services/validate.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  content = {
    title: "Tourist",
    subTitle: "Please login",
    emailPlaceholder: "Enter email",
    passwordPlaceholder: "Enter password"
  }

  constructor(
    private http: HttpClient, 
    private login: AuthService, 
    private validateService: ValidateService, 
    private fb: FormBuilder, 
    private router: Router, 
    private matSnackBar: MatSnackBar
    ) { }

  submitted = false;

  isLoggedIn = false
  
  get loginFormControl() {
    return this.loginForm.controls;
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  openSnackbar(message: string, action: string){
    this.matSnackBar.open(message, action, {
      duration: 3000,
    })
  }

  onSubmit(){

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    //console.log(user.email, user.password)

    this.submitted = true;
    if(this.loginForm.valid){

      this.login.loginRequest(user)
      .subscribe(
        res => {
          if(res['success'] == 1){
            localStorage.setItem('token', res['token'])
            localStorage.setItem('permission', res['permission'])
            localStorage.setItem('userId', res['userId'])
            localStorage.setItem('firstName', res['firstName'])
            localStorage.setItem('lastName', res['lastName'])
            localStorage.setItem('email', res['email'])
            if(res['permission'] == 'admin'){
              console.log("Admin")
              this.router.navigateByUrl('/admin')
              this.openSnackbar("You have logged in successfully", "Close")
            }
            else{
              console.log('Normal user')
              this.router.navigateByUrl('/')
              //this.refresh()
          }
          }
          else if (res['success'] != 1){
            alert(res['message'])
          }
        },
        err => console.log(err)
      )
          
    }
    else{
      alert("Something went wrong!, Please try again!")
    }
  }

  ngOnInit(): void {
  }

}
