import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss'],
})
export class PostInfoComponent {
  constructor(private router: ActivatedRoute) {}
  id: number = 0;

  //if there is only one param
  // id$ = this.router.params.pipe(map((params: any) => params['id']));

  //if there are many params
  id$ = this.router.paramMap.pipe(map((params: any) => params.get('id')));

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
