import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs/internal/Observable';
import {MessageModel} from './message-model';
import {FileService} from '../../file/shared/file.service';
import {defer} from 'rxjs/internal/observable/defer';
import {map} from 'rxjs/operators';


@Injectable()
export class MessageService {

  constructor(private db: AngularFirestore) { }

  createNewMessage(messageModel: MessageModel): Observable<MessageModel> {
      const roomCollection = this.db.collection<any>('message');
      return defer( () =>
        roomCollection.add({
          message: messageModel.message,
          date: new Date(),
          roomId: messageModel.roomId})).pipe(
          map( messageRef => {
            messageModel.id = messageRef.id;
            return messageModel;
          } )
    );
  }
  createNewMessageWithImage(messageModel: MessageModel): Observable<MessageModel> {
    const roomCollection = this.db.collection<any>('message');
    return defer( () =>
      roomCollection.add({
        date: new Date(),
        roomId: messageModel.roomId,
        picture: messageModel.picture})).pipe(
      map( messageRef => {
        messageModel.id = messageRef.id;
        return messageModel;
      } )
    );
  }

  getMessages(id?: string): Observable<MessageModel[]> {
    return this.db.collection('message', ref => ref.where('roomId', '==', id)).snapshotChanges().pipe(
      map( actions => {
        return actions.map( action => {
          const data = action.payload.doc.data() as MessageModel;
          return {
            id: action.payload.doc.id,
            message: data.message,
            date: data.date,
            roomId: data.roomId,
            picture: data.picture
          };
        });
      })
    );
  }
}
