import { Component, OnInit } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { ValidateService } from '../../services/validate.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';

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

  constructor(private http: HttpClient, private login: AuthService, private validateService: ValidateService, private fb: FormBuilder, private router: Router) { }

  submitted = false;

  isLoggedIn = false

  url = 'http://localhost:3000/api/users/login';
  
  get loginFormControl() {
    return this.loginForm.controls;
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  
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
            this.router.navigateByUrl('/')
          }
          else if (res['success'] != 1){
            alert(res['message'])
          }
        },
        err => console.log(err)
      )
      // this.http.post(this.url,user).subscribe(
      //   (response) => {
      //     if(response['success'] == 1){
      //       this.isLoggedIn = true
      //       const token = response['token']
      //       this.router.navigateByUrl('/')
      //       console.log(response['message'])
      //     }
      //     else if (response['success'] != 1){
      //       alert(response['message'])
      //     }
          
      //     //console.log(response)
      //   },
      //   (error) => console.log(error)
      // )      
    }
    else{
      alert("Something went wrong!")
    }
  }

  ngOnInit(): void {
  }

}
