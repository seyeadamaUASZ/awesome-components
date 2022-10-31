import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { UsernamePipe } from './pipes/usename.pipe';
import { TimeAgo } from './pipes/time.ago.pipe';
import { HighlightDirective } from './highlight.directive';


@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    UsernamePipe,
    TimeAgo,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    MaterialModule ,
    ReactiveFormsModule
    
  ],
  exports:[
    CommentsComponent,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    UsernamePipe,
    TimeAgo,
    HighlightDirective
    
  ]
})
export class SharedModule { }
