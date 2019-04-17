import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {FileModel} from './fileModel';
import {Observable} from 'rxjs/internal/Observable';
import {map, switchMap, tap} from 'rxjs/operators';
import {defer} from 'rxjs/internal/observable/defer';
import {from} from 'rxjs/internal/observable/from';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  meta: FileModel;

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) {
  }

  addFileMetadata(file: File): Observable<FileModel> {
    this.meta = {
      name: file.name,
      type: file.type,
      size: file.size,
      date: new Date()
    };
    return from(
      this.db.collection('files')
        .add(this.meta)
    ).pipe(
      map(documentRef => {
        this.meta.id = documentRef.id;
        return this.meta;
      })
    );
  }
  addFileToStorage(metaData: FileModel, file: File): Observable<FileModel> {
    return from(this.storage.ref('message-pictures/' + metaData.id)
        .put(file)
        .then(() => {
          return metaData;
        }));
  }

  getFileUrl(id: string): Observable<string> {
    return this.storage.ref('message-pictures/' + id)
      .getDownloadURL();
  }
}
