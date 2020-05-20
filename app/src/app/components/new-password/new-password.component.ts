import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  email
  submitted = false
  //form = FormGroup

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.email = data.email
   }


  submit(){
    if(this.form.value !== null && this.form.valid){
      this.submitted = true
      this.dialogRef.close(this.form.value)
    }
    else{
      this.submitted = false
      this.dialogRef.close()
    }
  }

  close(){
    this.dialogRef.close()
  }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  })

  ngOnInit(): void {
    
  }

}
