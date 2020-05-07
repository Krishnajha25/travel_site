import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCompComponent } from '../dialog-comp/dialog-comp.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users =[]
  editField: any;
  dataSource = this.users
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];


  constructor(private authService: AuthService, private dialog: MatDialog) { }

  // openDialog(){
  //   const dialogConfig = new MatDialogConfig

  //   //dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = true

  //   dialogConfig.data = {
  //     id: 1,
  //     title: 'Angular For Beginners'
  //   };

  //   const dialogRef = this.dialog.open(DialogCompComponent, dialogConfig)

  //   dialogRef.afterClosed().subscribe(
  //     data => console.log("Dialog output:", data)
  // ); 
  // }

  

  ngOnInit(): void {
    this.authService.getUsers()
    .subscribe(
      res => {
        this.users = res.message
        //console.log(this.users)
      },
      err => console.log(err)
    )

   // console.log(this.users)
    
  }

  remove(id: any){
    console.log(id)
    this.authService.deleteUser(id)
    .subscribe(
      res => {
        if(res["success"] === 1){
          this.users.splice(id, 1)
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
