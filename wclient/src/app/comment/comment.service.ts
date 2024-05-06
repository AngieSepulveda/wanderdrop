import { Injectable } from '@angular/core';
import { Comment } from './comment.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  comments: { [attractionId: number]: Comment[] } = {};
  private commentsUpdated = new BehaviorSubject<Comment[]>([]);

  constructor() {}

  getCommentsUpdated() {
    return this.commentsUpdated.asObservable();
  }

  getComments(attractionId: number) {
    return this.comments[attractionId] || [];
  }

  fetchComments(attractionId: number) {
    const comments = this.comments[attractionId] || [];
    this.commentsUpdated.next(comments);
  }

  addComment(comment: Comment) {
    if (!this.comments[comment.attractionId]) {
      this.comments[comment.attractionId] = [];
    }
    this.comments[comment.attractionId].push(comment);
    this.commentsUpdated.next(this.comments[comment.attractionId]);
  }

  deleteComment(commentId: number, attractionId: number) {
    if (this.comments[attractionId]) {
      this.comments[attractionId] = this.comments[attractionId].filter(
        (comment) => comment.commentId !== commentId
      );
      this.commentsUpdated.next(this.comments[attractionId]);
    }
  }
}
