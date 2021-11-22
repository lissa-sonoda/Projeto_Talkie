import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.scss']
})
export class ChatMsgComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];
  isUser: User;
  item;
  messageData: any[] = [];

  @Output() chatData: EventEmitter<any> = new EventEmitter<any>();

  constructor(private chatService: ChatService,
              private route: ActivatedRoute,
              private afs: AngularFirestore) {
    this.isUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.subs.push(this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('id'))
      )
      .subscribe(routePathParam => this.chatService.updatePathParamState(routePathParam)));

    this.subs.push(
      this.route.params.subscribe(par => {
        this.afs.collection('rooms').doc(par.id).get().subscribe(data => {
          this.item = data;
          this.chatData.emit(this.item.data().name);
        });

        this.subs.push(this.afs.collection('rooms').doc(par.id)
          .collection('messages', ref => ref.orderBy('time', 'asc'))
          .valueChanges()
          .subscribe(messages => {
            this.messageData = messages;
          }));
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

}
