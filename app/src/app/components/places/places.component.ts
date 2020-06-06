import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/services/places.service';


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private placeService: PlacesService
  ) { }

  placeDetails = []
  placesToVisit = []
  avoid = []
  avoidAvailable = false

  name
  defaultImage = "https://www.atms.com.au/wp-content/uploads/2019/11/placeholder.png?x93630"
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe( params => {
      this.name = params.get('name')
      this.placeService.getPlaceDetails(this.name)
      .subscribe(
        res => {
          // for (let i = 0; i < res.length-1; i++) {
          //   this.placeDetails.push(res[i]);
          // }
          if (res[4] != null){
            this.avoidAvailable = true
            this.avoid = res[4].split(",")
          }
          
          this.placeDetails = res,
          //console.log(this.placeDetails)
          this.placesToVisit = this.placeDetails[3].split(",")
          //console.log(this.placesToVisit)
        },
        err => console.log(err)
        )
    })

    //console.log(this.placeDetails)

  }

  

}
