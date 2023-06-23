import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  OnDestroy,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RoomsCollection } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnChanges, OnDestroy {
  @Input() roomList: RoomsCollection[] = [];
  @Input() title: string = '';
  @Output() selectedRoom = new EventEmitter<RoomsCollection>();

  selectRoom = (room: RoomsCollection) => {
    this.selectedRoom.emit(room);
  };
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('destroyed');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }
}
