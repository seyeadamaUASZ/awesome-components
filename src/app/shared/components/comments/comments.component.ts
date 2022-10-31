import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from 'src/app/social-media/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
    ])
  ]
})
export class CommentsComponent implements OnInit {
  
  animationStates: { [key: number]: 'default' | 'active' } = {};

  listItemAnimationState: 'default' | 'active' = 'default';

  @Input() comments!:Comment[]
  commentCtrl!:FormControl;
  @Output() newComment = new EventEmitter<string>()

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
    for (let index in this.comments) {
      this.animationStates[index] = 'default';
  }
  }

  onLeaveComment(){
    if(this.commentCtrl.invalid){
      return;
    }
    this.newComment.emit(this.commentCtrl.value)
    this.commentCtrl.reset()
  }

  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
}

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
}

}
