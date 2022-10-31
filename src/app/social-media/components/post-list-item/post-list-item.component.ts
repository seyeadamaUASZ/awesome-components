import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Post } from '../../models/post.model';
import { PostCommented } from '../../models/postcommented.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {
  @Input() post! :Post;
  @Output() postCommented = new EventEmitter<PostCommented>();

  constructor() { }

  ngOnInit(): void {
  }

  onNewComment(comment:string){
    let object = new  PostCommented();
    object.comment = comment;
    object.postId = this.post.id;
    this.postCommented.emit(object);
  }

}
