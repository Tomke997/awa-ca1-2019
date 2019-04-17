import { NgModule } from '@angular/core';
import {Routes, RouterModule, ActivatedRoute} from '@angular/router';
import {RoomComponentComponent} from './room-component/room-component.component';
import {SelectedRoomComponent} from './selected-room/selected-room.component';

const routes: Routes = [
  {
    path: '',
    component: RoomComponentComponent
  },
  {
    path: ':id',
    component: SelectedRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
