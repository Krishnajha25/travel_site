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
  constructor(private router: Router, private placeService: PlacesService) { }

  ngOnInit(): void {
    // this.placeService.getPlaces()
    // .subscribe(
    //   res => this.places = res,
    //   err => {
    //     if( err instanceof HttpErrorResponse ){
    //       if (err.status === 401){
    //         console.log(err)
    //       }
    //     }
    //   }
    // )

    this.placeService.getPlacesExcel()
    .subscribe(
      res => this.placesExcel = res,
      err => console.log(err)
    )

   //console.log(this.jwtHelper.isTokenExpired()); // true or false    
    
  }
}
