import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessageService} from './shared/message.service';
import {FileModule} from '../file/file.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FileService} from '../file/shared/file.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FileModule,
    ReactiveFormsModule,
  ],
  providers: [
    MessageService,
    FileService
  ]
})
export class MessageModule { }
