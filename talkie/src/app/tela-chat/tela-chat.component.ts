import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';


@Component({
  selector: 'app-tela-chat',
  templateUrl: './tela-chat.component.html',
  styleUrls: ['./tela-chat.component.scss']
})
export class TelaChatComponent implements OnInit {

  expandir = true;
  browse = true;

  @Input() randomSeed: string;
  subs: Subscription;
  paramValue: string;
  roomName: string;

  filePath:String;

  constructor(private chatService: ChatService,
              private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.subs = this.chatService.pathParam.subscribe(value => {
      this.paramValue = value;
      console.log(this.paramValue);
    });
  }

  formSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const {message} = form.value;
    form.resetForm();

    this.afs.collection('rooms').doc(this.paramValue).collection('messages').add({
      message,
      user_id: this.chatService.getUser().uid,
      name: this.chatService.getUser().displayName,
      time: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  chatData(ev: any) :void {
    if (ev.chatData !== undefined) {
      ev.chatData.subscribe(roomName => this.roomName = roomName);
    }
  }

  abrir(){
    this.expandir = false;
  }

  upload(event) {
    this.filePath = event.target.files[0]
  }

  uploadImage(){
    this.browse = false;
  };

}
