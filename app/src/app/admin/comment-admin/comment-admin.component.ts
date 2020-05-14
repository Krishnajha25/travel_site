import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-admin',
  templateUrl: './comment-admin.component.html',
  styleUrls: ['./comment-admin.component.css']
})
export class CommentAdminComponent implements OnInit {

  constructor(
    private comment: CommentsService,
    private snackBar: MatSnackBar
    ) { }

  comments = []
  displayedColumns = ["id", "userId", "firstName", "lastName", "comment", "commentOn", "action"]
  dataSource = this.comments

  ngOnInit(): void {
    this.comment.getComments()
    .subscribe(
      res => this.comments = res["message"],
      err => console.log(err)
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
  }

  remove(id: any){
    console.log(id)
    this.comment.deleteComment(id)
    .subscribe(
      res => {
        if(res["success"] === 1){
          this.openSnackBar("Comment with Id: "+id+" deleted successfully!","Close")
          this.ngOnInit()
        }
      },
      err => console.log(err)
    )
  }

}
