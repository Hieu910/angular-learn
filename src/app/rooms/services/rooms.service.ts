import { Injectable, Inject } from '@angular/core';
import { RoomsCollection, Post } from '../rooms';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, shareReplay,catchError,of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: any,
    private http: HttpClient
  ) {
    console.log(this.config.apiEndpoint);
    console.log('rooms service initialized');
  }
  headers = new HttpHeaders({ token: 123456 });

  getPost$ = this.http
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
      headers: this.headers,
    })
    .pipe(shareReplay(1))


  roomList: RoomsCollection[] = [
    {
      roomType: 'Hotel',
      roomNumber: 1,
      amenities: 'Kitchen',
      price: '1000',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('11-Nov-2021'),
    },
    {
      roomType: 'Hotel 2',
      roomNumber: 2,
      amenities: 'Kitchen',
      price: '2000',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('11-Nov-2021'),
    },
    {
      roomType: 'Hotel 3',
      roomNumber: 3,
      amenities: 'Kitchen',
      price: '3000',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('11-Nov-2021'),
    },
  ];

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }
  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(
      'https://jsonplaceholder.typicode.com/posts',
      post
    );
  }
  updatePost(post: Post, id: number): Observable<Post> {
    return this.http.put<Post>(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      post
    );
  }

  getPhotos = () => {
    const request = new HttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/photos',
      {
        reportProgress: true,
      }
    );
    return this.http.request(request);
  };
  getRooms() {
    return this.roomList;
  }
}
