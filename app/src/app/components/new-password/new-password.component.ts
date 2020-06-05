import { Component, OnInit, Inject } from '@angular/core';
//import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatInput } from "@angular/material/input";
import { NavbarServiceService } from 'src/app/services/navbar-service.service';
import { FooterService } from 'src/app/services/footer.service';
import { ValidateService } from 'src/app/services/validate.service';
import { ForgetService } from 'src/app/services/forget.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  email
  submitted = false
  success: boolean
  successMsg = ''
  message
  submitButton = 'Send email'

  constructor(
    private fb: FormBuilder,
    public nav: NavbarServiceService,
    public footer: FooterService,
    public validate: ValidateService,
    private forgetService: ForgetService
  ){ 
    nav.hide()
    footer.hide()
  }

  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  })

  onSubmit(){
    this.submitButton = 'Sending...'
    this.email = this.emailForm.value
    this.forgetService.forgot(this.email)
    .subscribe(
      res => {
        if(res['success'] === 1){
          this.submitted = true
          this.message = res['message']
          this.success = true
          this.email = ''
        }
        else{
          this.submitted = false
          this.message = res['message']
          this.success = false
        }
        this.submitButton = 'Email sent'
      },
      err => {
        this.submitted = false
        this.success = false
      }
    )
  }

  ngOnInit(): void {
    
  }

}
