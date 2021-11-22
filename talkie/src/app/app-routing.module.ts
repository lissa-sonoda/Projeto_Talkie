import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaAppComponent } from './tela-app/tela-app.component';
import { ChatMsgComponent } from './chat-msg/chat-msg.component';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { ChatGuard } from './guards/chat.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: TelaAppComponent,
    children: [
      {
        path: 'room/:id',
        component: ChatMsgComponent
      },
      {
        path: '',
        component: MessageComponent
      }
    ],
    canActivate: [ChatGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
