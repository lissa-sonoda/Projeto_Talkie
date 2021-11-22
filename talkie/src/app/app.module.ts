import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaChatComponent } from './tela-chat/tela-chat.component';
import { TelaAppComponent } from './tela-app/tela-app.component';
import { ListComponent } from './list/list.component';
import { ListContentComponent } from './list-content/list-content.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { ChatMsgComponent } from './chat-msg/chat-msg.component';
import { SignupComponent } from './signup/signup.component';

import { MaterialModule} from './shared/material.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    AppComponent,
    TelaChatComponent,
    TelaAppComponent,
    ListComponent,
    ListContentComponent,
    LoginComponent,
    MessageComponent,
    ChatMsgComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    PickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
