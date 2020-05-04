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
  icon = "favorite_border"
  defaultImage = "https://www.atms.com.au/wp-content/uploads/2019/11/placeholder.png?x93630"
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


  toggleIcon(newIcon: string){
    if(this.icon === 'favorite_border'){
      this.icon = "favorite"
    }
    else{
      this.icon = "favorite_border"
    }
  }

}
