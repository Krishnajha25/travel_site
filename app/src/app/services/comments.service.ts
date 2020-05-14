import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:3000/api/comment/"
  baseUrlPlace = "http://localhost:3000/api/comment/place/"

  getComments(){
    return this.http.get<any>(this.baseUrl)
  }

  getCommentsByPlaceName(placeName){
   return this.http.get<any>(this.baseUrlPlace+placeName) 
  }

  deleteComment(id){
    return this.http.delete<any>(this.baseUrl+id)
  }

  createComment(data){
    return this.http.post(this.baseUrl, data)
  }

  

}
