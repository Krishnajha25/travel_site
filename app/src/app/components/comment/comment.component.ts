import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { CommentsService } from 'src/app/services/comments.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  placeName: string;
  comments = []  
  feedback: string
  submitted = false
  noComment = false

  test = []
  testFunction(){
    this.test = this.test.concat("No comments for "+this.placeName+" yet!")
  }
  

  constructor(
    private url: LocationStrategy, 
    private comment: CommentsService, 
    private authService: AuthService,
    private snackBar: MatSnackBar
    ) { }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
  }

  ngOnInit(): void {
    this.placeName = this.url.path().slice(8)
    
    this.comment.getCommentsByPlaceName(this.placeName)
    .subscribe(
      res => {
        if(res['success'] === 0){
          //this.testFunction()
          this.noComment = true
        }
        else{
          this.noComment = false
          this.comments = res['message']
        }
      },
      err => {
        if(err.status !== 401){
          return
        }
        else{
          this.feedback = 'Please login to comment'
        }
      }
    )
  }

  
  commentSubmit(){
    const commentObj = {
      userId: this.authService.getUserId(),
      placeName: this.url.path().slice(8),
      feedback: this.feedback
    }
    if(this.authService.loggedIn()){
      if(this.feedback != null){
        this.comment.createComment(commentObj)
        .subscribe(
          res => {
            if(res['success'] === 1){
              this.feedback = ''
              this.openSnackBar("Thanks for your comment","Close")
              this.ngOnInit()
            }
          },
          err => {
            console.log(err)
          }
        )
      }
      else{
        this.feedback = "Please enter some comment first..."
      }
    }
    else{
      this.openSnackBar("Please login first", "Close")
    }
    
  }




}
