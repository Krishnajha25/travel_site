import { Component, OnInit } from '@angular/core';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';
import { FooterService } from 'src/app/services/footer.service';
import { ForgetService } from 'src/app/services/forget.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  buttonText = 'Change password'
  email: string;
  token: any;
  submitted: boolean = false;
  tokenExpired: boolean
  message: any;
  success: boolean;

  constructor(
    private router: Router,
    public nav: NavbarServiceService,
    public footer: FooterService,
    private reset: ForgetService,
    private fb: FormBuilder,
    private validate: ValidateService,
    public activatedRoute: ActivatedRoute
  ) {
    this.nav.hide()
    this.footer.hide()
   }

  passwordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(3)]],
    confirm_password: ['', Validators.required]
  },
  {
    validator: this.validate.MatchPassword('password', 'confirm_password')
  })

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.email = params.get('email')
      this.token = params.get('token')
      this.reset.resetGet(this.email,this.token)
      .subscribe(
        res => {
          if(res['success'] === 0){
            this.tokenExpired = true
            this.router.navigate(['/link-expired'])
          }
          else{
            this.tokenExpired = false
          }
        },
        err => console.log(err)
      )
    })
  }
  

  onSubmit(){

    const password = {
      password: this.passwordForm.value.password,
      confirm_password: this.passwordForm.value.confirm_password
    }

    console.log(password)

    this.submitted = true
    this.buttonText = "Changing password"
    if(this.passwordForm.valid){
      this.reset.resetPost(this.email, this.token, password)
      .subscribe(
        res => {
          if(res['success']===1){
            this.message = res['message']
            this.success = true
            this.router.navigate(['/password-changed-success'])
          }
          else{
            this.message = res['message']
            this.success = false
            this.router.navigate(['/link-expired'])
          }
        },
        err => console.log(err)
      )
    }
    
  }

}
