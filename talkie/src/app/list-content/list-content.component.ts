import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoomData } from '../services/chat.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.scss']
})
export class ListContentComponent implements OnInit {

  @Input() roomData: RoomData;
  @Input() randomSeed: string;

  @Output() seedValue: EventEmitter<string> = new EventEmitter<string>();

  lastMessage: string;
  subs: Subscription;

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.subs = this.afs.collection('rooms').doc(this.roomData.id)
      .collection('messages', ref => ref.orderBy('time', 'desc'))
      .valueChanges()
      .subscribe(data => {
        if (data.length > 0) {
          this.lastMessage = data[0].message;
        }
      });
  }

  onClick(): void {
    this.seedValue.emit(this.randomSeed);
  }
}
