import { Component, OnInit } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { ValidateService } from '../../services/validate.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NewPasswordComponent } from '../new-password/new-password.component';
import { unescapeIdentifier } from '@angular/compiler';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';
import { FooterService } from 'src/app/services/footer.service';

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
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog,
    public nav: NavbarServiceService,
    public footer: FooterService
    ) { 
      this.nav.show()
      this.footer.show()
    }

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

  // openDialog(){
  //   const dialogConfig = new MatDialogConfig()

  //   // dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = true

  //   dialogConfig.data = {
  //     email: 'abc@xyz.com'
  //   }

  //   //this.dialog.open(NewPasswordComponent, dialogConfig)

  //   const dialogRef = this.dialog.open(NewPasswordComponent, dialogConfig)

  //   dialogRef.afterClosed()
  //   .subscribe(
  //     email => {
  //       //console.log(this.validateService.validateEmail(email))

  //       const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //       console.log(re.test(String(email).toLowerCase()));

  //       //console.log(validEmail)
  //       if(email === undefined){
  //         //console.log(validEmail)
  //         return
  //       }
  //       else{
  //         //console.log(validEmail)
  //         console.log("Email: ", email)
  //       }
        
  //     }
  //   )

  // }

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
