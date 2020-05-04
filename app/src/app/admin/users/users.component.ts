import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users =[]
  constructor(private authService: AuthService) { }

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];
  dataSource = this.users;

  ngOnInit(): void {
    this.authService.getUsers()
    .subscribe(
      res => {
        this.users = res.message,
        console.log(this.users)
      },
      err => console.log(err)
    )
  }

}
