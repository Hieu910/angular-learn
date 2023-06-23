import { Component } from '@angular/core';
import { Post } from '../rooms/rooms';
import { RoomsService } from '../rooms/services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
})
export class PostAddComponent {
  constructor(private roomService: RoomsService) {}

  post: Post = {
    userId: 0,
    title: '',
    body: '',
    id: 0,
  };
  successMessage: string = '';

  AddPost(postForm: NgForm) {
    this.roomService.addPost(this.post).subscribe((data) => {
      this.successMessage = 'success message';
      postForm.resetForm({
        userId: 0,
        title: '',
        body: '',
        id: 0,
      });
    });
  }
}
