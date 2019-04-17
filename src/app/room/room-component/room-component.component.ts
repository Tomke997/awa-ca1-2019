import { Component, OnInit } from '@angular/core';
import {RoomServiceService} from '../shared/room-service.service';
import {Observable} from 'rxjs/internal/Observable';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-room-component',
  templateUrl: './room-component.component.html',
  styleUrls: ['./room-component.component.scss']
})
export class RoomComponentComponent implements OnInit {

  rooms$:  Observable<any[]>;
  roomsName = new FormControl('');
  roomsPassword = new FormControl('');
  constructor(private roomService: RoomServiceService) { }

  ngOnInit() {
    this.rooms$ = this.roomService.getRooms();
  }
  createRoom() {
    this.roomService.createNewRoom(this.roomsName.value);
  }
}
