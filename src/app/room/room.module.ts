import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import {SelectedRoomComponent} from './selected-room/selected-room.component';
import {RoomComponentComponent} from './room-component/room-component.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RoomServiceService} from './shared/room-service.service';
import {MessageService} from '../message/shared/message.service';
import {FileService} from '../file/shared/file.service';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [
    SelectedRoomComponent,
    RoomComponentComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  providers: [
    RoomServiceService,
    MessageService,
    FileService
  ]
})
export class RoomModule { }
