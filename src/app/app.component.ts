import {
  AfterViewInit,
  Component,
  OnInit,
  Inject,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';
  role = 'admin';
  @ViewChild('name', { static: true }) name!: ElementRef;

  // @ViewChild('user', { read: ViewContainerRef }) vrc!: ViewContainerRef;
  constructor(
    @Inject(localStorageToken) private localStorage: any,
    private initService: InitService
  ) {
  
  }
  ngOnInit(): void {
    if (this.name) {
      this.name.nativeElement.innerText = this.title;
    }
    this.localStorage.setItem('hotelinventoryapp', 'Hilton Hotel');
  }

  // ngAfterViewInit(): void {
  //   const componentRef = this.vrc.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50
  // }
}
