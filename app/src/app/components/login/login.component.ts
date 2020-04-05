import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
