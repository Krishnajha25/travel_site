import { Component, OnInit } from '@angular/core';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  visible: boolean
  collapse: boolean = false

  constructor(
    public nav: NavbarServiceService,
    public footer: FooterService
  ) { 
    nav.hide()
    footer.hide()
  }

  ngOnInit(): void {
    this.visible = true
  }

  toggle(){
    console.log("CLicked")
    this.visible != this.visible
  }

}
