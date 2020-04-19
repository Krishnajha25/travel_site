import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-places-grid',
  templateUrl: './places-grid.component.html',
  styleUrls: ['./places-grid.component.css']
})
export class PlacesGridComponent implements OnInit {

  places = []
  constructor(private placeService: PlacesService, private router: Router) { }

  ngOnInit(): void {
    this.placeService.getPlacesExcel()
    .subscribe(
      res => this.places = res,
      err => console.log(err)
    )
  }

  goToPlaces(){
    this.router.navigate(['/places'])
  }

}
