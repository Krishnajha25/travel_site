import { Component, OnInit } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { ValidateService } from '../../services/validate.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ContactService } from 'src/app/services/contact.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private validateService: ValidateService, 
    private fb: FormBuilder, 
    private router: Router, 
    private snackBar: MatSnackBar,
    private contactService: ContactService,
    private spinner: NgxSpinnerService
  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 5000,
    });
  }

  submitted = false

  name = ''
  email = ''
  message = ''
 
  onSubmit(){

    this.spinner.show()

    const user = {
      name: this.name,
      email: this.email,
      message: this.message
    }

    if(this.name !== "", this.email !== "", this.message !== ""){
      this.contactService.contactRequest(user)
      .subscribe(
        res => {
          if(res['success'] === 1){
            this.spinner.hide()
            this.snackBar.open("Thank you. Your mail has been sent","Close")
            this.message = ''
          }
        },
        err => console.log(err)
      )
    }
    
  }

  ngOnInit(): void {
    // this.name = localStorage.getItem('firstName') + " "+ localStorage.getItem('lastName')
    // this.email = localStorage.getItem('email')
  }

}
