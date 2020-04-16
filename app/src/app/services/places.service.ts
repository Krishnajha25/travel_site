import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesUrl = "http://localhost:3000/api/places";

  constructor(private http: HttpClient) { }

  getPlaces(){
     return this.http.get<any>(this.placesUrl)
  }

}
