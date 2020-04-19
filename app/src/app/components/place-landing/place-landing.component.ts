import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { ShowMorePipe } from '../../pipes/show-more.pipe'

@Component({
  selector: 'app-place-landing',
  templateUrl: './place-landing.component.html',
  styleUrls: ['./place-landing.component.css']
})
export class PlaceLandingComponent implements OnInit {

  places = []
  placesExcel = []
  constructor(private placeService: PlacesService) { }

  ngOnInit(): void {
    this.placeService.getPlaces()
    .subscribe(
      res => this.places = res,
      err => console.log(err)
    )

    this.placeService.getPlacesExcel()
    .subscribe(
      res => this.placesExcel = res,
      err => console.log(err)
    )
  }
}
