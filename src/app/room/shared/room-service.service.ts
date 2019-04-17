import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {Room} from './room';

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {

  constructor(private db: AngularFirestore) { }

  createNewRoom(name: string): Promise<any> {
    if (name !== '') {
      const roomCollection = this.db.collection<any>('rooms');
      return roomCollection.add({name: name});
    } else {
      return new Promise((resolve, reject) => {
        reject('cannot create room');
      });
    }
  }
  getRooms(): Observable<any> {
    return this.db.collection('rooms').snapshotChanges().pipe(
      map( actions => {
        return actions.map( action => {
          const data = action.payload.doc.data() as Room;
          return {
            id: action.payload.doc.id,
            name: data.name
          };
        });
      })
    );
  }
}
