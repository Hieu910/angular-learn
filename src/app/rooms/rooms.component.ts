import {
  Component,
  OnInit,
  DoCheck,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Photo, Post, Rooms, RoomsCollection } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subscription, catchError, of, Subject, map } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
  hotelName = 'CyberTron';
  numberOfRooms = 10;
  hideRoom = false;
  selectedRoom!: RoomsCollection;
  rooms: Rooms = {
    total: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };
  title = '';
  totalDownload = 0;
  roomList: RoomsCollection[] = [];
  posts: Post[] = [];
  photos: Photo[] = [];
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  //manual stream
  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });

  subscription!: Subscription;
  post$ = this.roomService.getPost$.pipe(
    catchError((err) => {
      this.error$.next(err.message);
      return of([]);
    })
  );
  error$ = new Subject<string>();

  postCount$ = this.roomService.getPost$.pipe(
    map((posts: any) => {
      return posts.length;
    })
  );

  constructor(private roomService: RoomsService) {}
  ngAfterViewInit(): void {
    this.headerComponent.title = 'Room View';
    this.headerChildrenComponent.first.title = 'First title';
    this.headerChildrenComponent.last.title = 'Last title';
  }
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.headerComponent);

    //manual Observable
    this.stream.subscribe({
      next: (value: any) => {
        console.log(value);
      },
      complete: () => {
        console.log('Completed');
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    this.roomList = this.roomService.getRooms();
    this.roomService.getPost$.subscribe((posts: any) => (this.posts = posts));
    console.log('changed');
    this.roomService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('request has been sent');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('request success');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalDownload = event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggle() {
    this.hideRoom = !this.hideRoom;
    this.title = 'Room List';
    console.log(this.posts);
  }

  selectRoom = (room: RoomsCollection) => {
    this.selectedRoom = room;
  };

  addRoom = () => {
    this.roomList = [
      ...this.roomList,
      {
        roomType: 'Deluxe',
        roomNumber: 4,
        amenities: 'TV, Wifi, Bluetooth',
        price: '500',
        checkinTime: new Date('13-Nov-2021'),
        checkoutTime: new Date('13-Nov-2021'),
      },
    ];
  };

  addPost = () => {
    const post: Post = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    this.roomService.addPost(post).subscribe((res) => {
      console.log(res);
      this.posts = [...this.posts, res];
      console.log(this.posts);
    });
  };

  updatePost = (id?: number) => {
    if (!id) return;
    const post: Post = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    this.roomService.updatePost(post, id).subscribe((res) => {
      this.posts = this.posts.map((post) => {
        return post.id === id ? res : post;
      });
    });
  };
}
