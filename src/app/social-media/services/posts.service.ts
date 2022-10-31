import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class PostsService {
   
    constructor(private http:HttpClient){}

    getPosts():Observable<Post[]>{
        return this.http.get<Post[]>(`${environment.apiUrl}/posts`)
    }

    addCommentaire(data:any){
        console.log('comment added '+ JSON.stringify(data));
    }
    
}