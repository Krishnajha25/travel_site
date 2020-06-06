import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-place-landing',
  templateUrl: './place-landing.component.html',
  styleUrls: ['./place-landing.component.css']
})
export class PlaceLandingComponent implements OnInit {

  p: number = 1;
  places = []
  placesExcel = []
  defaultImage = "https://www.atms.com.au/wp-content/uploads/2019/11/placeholder.png?x93630"
  constructor(
    private router: Router, 
    private placeService: PlacesService,
    private spinner: NgxSpinnerService
    ) { }
  
  noImage = false

  ngOnInit(): void {
    this.spinner.show()
    
    this.placeService.getPlacesExcel()
    .subscribe(
      res => {
        this.placesExcel = res
        // console.log(this.placesExcel)
        this.spinner.hide()
      },
      err => console.log(err)
    )

    
   //console.log(this.jwtHelper.isTokenExpired()); // true or false    
    
  }

  //console.log(this.noImage)
}
