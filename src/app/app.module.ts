import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule, Routes} from '@angular/router';
import {EventListComponent} from './components/event-list/event-list.component';
import {AngularFireModule, AuthMethods, AuthProviders} from 'angularfire2';
import {EventService} from './services/event.service';
import {AuthService} from './services/auth.service';
import {HomeComponent} from './components/home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ParticipantService} from './services/participant.service';
import {ParticipantFullnamePipe} from './pipe/participant-fullname.pipe';
import {EventFormComponent} from './components/event-form/event-form.component';
import {RequiredParticipantsValidatorDirective} from './directive/required-participants-validator.dir';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'event-list', component: EventListComponent},
  {path: 'edit-event/:id', component: EventFormComponent},
  {path: 'add-event', component: EventFormComponent}
];

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyCCA2tevCq-CNf_3OVy8BWe1gkee3VogvM',
  authDomain: 'fireevents-44149.firebaseapp.com',
  databaseURL: 'https://fireevents-44149.firebaseio.com',
  storageBucket: 'fireevents-44149.appspot.com',
  messagingSenderId: '757319173838'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    AppComponent,
    EventFormComponent,
    EventListComponent,
    HeaderComponent,
    HomeComponent,
    ParticipantFullnamePipe,
    RequiredParticipantsValidatorDirective
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    EventService,
    ParticipantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
