import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-place-landing',
  templateUrl: './place-landing.component.html',
  styleUrls: ['./place-landing.component.css']
})
export class PlaceLandingComponent implements OnInit {

  places = []
  constructor(private placeService: PlacesService) { }

  ngOnInit(): void {
    this.placeService.getPlaces()
    .subscribe(
      res => this.places = res,
      err => console.log(err)
    )
  }

  



}
