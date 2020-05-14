import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCompComponent } from '../dialog-comp/dialog-comp.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users =[]
  editField: any;
  dataSource = this.users
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'signUpOn', 'action'];


  constructor(
    private authService: AuthService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }
  

  ngOnInit(): void {
    this.authService.getUsers()
    .subscribe(
      res => {
        this.users = res.message
        //console.log(this.users)
      },
      err => console.log(err)
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
  }

  remove(id: any){
    //console.log(id)
    this.authService.deleteUser(id)
    .subscribe(
      res => {
        if(res["success"] === 1){
          this.openSnackBar("User with Id: "+id+" deleted successfully!","Close")
          this.ngOnInit()
        }
      },
      err => console.log(err)
    )
  }

  updateList(id: number, property: string, event: any) {
    
    const editField = event.target.textContent;
    //console.log(event)
    this.authService.updateUser(editField)
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
}
