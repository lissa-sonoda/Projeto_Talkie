import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.chatService.loginWithGoogle();
  }

  loginEmail(): void {
    this.chatService.loginWithEmail(this.email, this.password);
  }

}
