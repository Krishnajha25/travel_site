import { Component, OnInit } from '@angular/core';
//import { PlacesGridComponent } from '../places-grid/places-grid.component';

//let placeGrid = new PlacesGridComponent;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  page = {
    title: "Home",
    subtitle: "Welcome to Tourist guide",
    image: "../../../assets/background1.jpg"

  }

  constructor() { }

  ngOnInit(): void {
  }

}
