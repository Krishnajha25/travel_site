import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service'
import { LocationStrategy } from '@angular/common';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(
    public navService: NavbarServiceService,
    public authService: AuthService, 
    private url: LocationStrategy
    ) { }

  isAdmin = false

  ngOnInit(){
    //this.isAdmin = this.authService.showAdminNav()

    if(this.url.path().includes('admin')){
      this.isAdmin = true
      this.ngOnInit()
    }
  }

}
