import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Router} from '@angular/router';
import {EventService} from './event.service';
import {database} from 'firebase/app';
@Injectable()
export class AuthService {

  private _auth: any;

  constructor(private af: AngularFire, private router: Router) {
    this.af.auth.subscribe(auth => {
      this._auth = auth;
    });
  }

  login($event) {
    $event.preventDefault();
    database().goOnline();
    this.af.auth.login();
  }

  logout($event) {
    $event.preventDefault();
    database().goOffline();
    this.router.navigate(['/']);
    this.af.auth.logout();
  }

  isAuth() {
    return this._auth;
  }
}
