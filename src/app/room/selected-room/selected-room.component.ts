import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../message/shared/message.service';
import {FileService} from '../../file/shared/file.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';
import {MessageModel} from '../../message/shared/message-model';
import {Observable} from 'rxjs/internal/Observable';
import {map, tap} from 'rxjs/operators';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-selected-room',
  templateUrl: './selected-room.component.html',
  styleUrls: ['./selected-room.component.scss']
})
export class SelectedRoomComponent implements OnInit {

  constructor(private messageService: MessageService, private fileService: FileService, private route: ActivatedRoute) {
  }

  allMessages$: Observable<MessageModel[]>;
  id: string;
  messageForm = new FormControl('');
  fileToUpload: File;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.allMessages$ = this.messageService.getMessages(this.id)
      .pipe(
        tap(messsag => {
          messsag.sort((a: MessageModel, b: MessageModel) =>
            a.date.seconds * 1000 - b.date.seconds * 1000
          );
          messsag.forEach(mess => {
            if (mess.picture) {
              this.fileService.getFileUrl(mess.picture)
                .subscribe(url => {
                  mess.url = url;
                });
            }
          });
        }),
      );
  }

  sendMessage() {
    if (this.messageForm.value !== '') {
      this.messageService.createNewMessage({
        roomId: this.id,
        message: this.messageForm.value
      }).subscribe(() => {
        this.messageForm.patchValue('');
      });
    }
  }

  saveImage() {
    this.fileService.addFileMetadata(this.fileToUpload).pipe(
      map( value => {
        return this.fileService.addFileToStorage(value, this.fileToUpload).pipe(
          map( mak => {
            this.messageService.createNewMessageWithImage(  {
              roomId: this.id,
              picture: mak.id,
            }).subscribe();
          })
        ).subscribe();
      })
    ).subscribe();
    this.imageChangedEvent = '';
  }
  uploadFile(event) {
    this.imageChangedEvent = event;
   // this.fileToUpload = event.target.files[0];
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];
    this.fileToUpload = new File([event.file], fileBeforeCrop.name, {type: fileBeforeCrop.type});
  }
}
