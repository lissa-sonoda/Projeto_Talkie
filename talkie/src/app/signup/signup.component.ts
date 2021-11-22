import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import * as firebase from 'firebase';
import { UrlSerializer } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  name: string;
  email: string;
  password: string;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  signup(): void{
    this.chatService.signupWithEmail(this.name, this.email, this.password);
  }
}
