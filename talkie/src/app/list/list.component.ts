import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService, RoomData } from '../services/chat.service';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  randomSeed: any[] = [];
  roomData: RoomData[] = [];
  lastMessage: string;
  subs: Subscription[] = [];
  @Output() seedValue: EventEmitter<string> = new EventEmitter<string>();

  username = firebase.auth().currentUser.displayName;

  constructor(private afs: AngularFirestore,
              private chatService: ChatService) {
  }

  ngOnInit(): void {

    this.randomSeed = Array.from({length: 20}, () => Math.floor(Math.random() * 14578976));

    this.subs.push(this.afs.collection('rooms').snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {

            return {
              id: a.payload.doc.id,
              // @ts-ignore
              ...a.payload.doc.data()
            };
          });
        })
      ).subscribe((rooms: RoomData[]) => {
        this.roomData = rooms;
      }));
  }

  onFormSubmit(form: NgForm): void {
    const {search} = form.value;
    console.log(search);

    if (form.invalid) {
      return;
    }

    this.afs.collection<RoomData>('rooms')
      .valueChanges()
      .pipe(
        map((data: RoomData[]) => data.map(s => s.name?.toLowerCase() === form.value.search?.toLowerCase()))
      )
      .subscribe(dataValue => {
        dataValue = dataValue.filter(s => s === true);

        if (dataValue.length > 0) {
          alert('Sorry, room already present');
          return;
        } else {
          if (form.value.search !== null) {
            this.afs.collection('rooms').add({
              name: form.value.search
            });
          } else {
            return;
          }
          form.resetForm();
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  seedData(ev: string): void {
    this.seedValue.emit(ev);
  }

  logout(): void {
    this.chatService.logout();
  }
}
