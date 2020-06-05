import { Component, OnInit } from '@angular/core';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-reset-link-expire',
  templateUrl: './reset-link-expire.component.html',
  styleUrls: ['./reset-link-expire.component.css']
})
export class ResetLinkExpireComponent implements OnInit {

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
