import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
//import { JwtHelperService } from '@auth0/angular-jwt'



@Component({
  selector: 'app-place-landing',
  templateUrl: './place-landing.component.html',
  styleUrls: ['./place-landing.component.css']
})
export class PlaceLandingComponent implements OnInit {

  places = []
  placesExcel = []
  defaultImage = "https://www.atms.com.au/wp-content/uploads/2019/11/placeholder.png?x93630"
  constructor(private router: Router, private placeService: PlacesService) { }
  
  noImage = false


  ngOnInit(): void {
    
    this.placeService.getPlacesExcel()
    .subscribe(
      res => {
        this.placesExcel = res
      },
      err => console.log(err)
    )

    
   //console.log(this.jwtHelper.isTokenExpired()); // true or false    
    
  }

  //console.log(this.noImage)
}
