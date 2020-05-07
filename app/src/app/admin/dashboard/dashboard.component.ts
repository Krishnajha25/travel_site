import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AuthService } from 'src/app/services/auth.service';
import { PlacesService } from 'src/app/services/places.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private placeService: PlacesService) { }

  totalUsers
  totalPlaces

  ngOnInit(): void {

    this.authService.getUsers()
    .subscribe(
      res => this.totalUsers = res['message'].length,
      err => console.log(err)
    )

    this.placeService.getPlacesExcel()
    .subscribe(
      res => this.totalPlaces = res.length,
      err => console.log(err)
    )

  }

}
