import { Component, OnInit } from '@angular/core';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { CommentService } from '../comment.service';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
  imports: [CommentItemComponent],
})
export class CommentListComponent implements OnInit {
  comments: Comment[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.comments = this.commentService.getComments(1);
  }
}
