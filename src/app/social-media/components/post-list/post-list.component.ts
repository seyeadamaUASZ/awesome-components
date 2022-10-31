import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { map } from 'rxjs/operators';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$!: Observable<Post[]>;
 
  constructor(private route:ActivatedRoute,
    private postService:PostsService) { }

  ngOnInit(): void {
    this.posts$=this.route.data.pipe(
      map(data=>data['posts'])
    )
  }

  addComment(event:any){
    this.postService.addCommentaire(event);
  }

}
