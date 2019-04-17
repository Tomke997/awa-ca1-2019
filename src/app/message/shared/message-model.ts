// @ts-ignore
import Timestamp = firebase.firestore.Timestamp;


export class MessageModel {
  id?: string;
  message?: string;
  picture?: string;
  roomId: string;
  date?: Timestamp;
  url?: string;
}
