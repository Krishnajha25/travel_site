import { Component, OnInit } from '@angular/core';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-password-changed',
  templateUrl: './password-changed.component.html',
  styleUrls: ['./password-changed.component.css']
})
export class PasswordChangedComponent implements OnInit {

  constructor(
    public nav: NavbarServiceService,
    public footer: FooterService
  ) { 
    nav.hide()
    footer.hide()
  }

  ngOnInit(): void {
  }

}
