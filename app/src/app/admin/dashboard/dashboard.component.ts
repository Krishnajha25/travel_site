import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AuthService } from 'src/app/services/auth.service';
import { PlacesService } from 'src/app/services/places.service';
import { CommentsService } from 'src/app/services/comments.service';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private placeService: PlacesService, 
    private comment: CommentsService,
    public navService: NavbarServiceService
    ) {
      this.navService.hide()
     }

  totalUsers
  totalPlaces
  totalComments

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

    this.comment.getComments()
    .subscribe(
      res => this.totalComments = res["message"].length,
      err => console.log(err)
    )


  }

}
