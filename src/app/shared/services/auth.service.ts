import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap  } from 'rxjs/operators';
import { UserService } from './user.service';
import 'rxjs/add/observable/of';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users$: Observable<firebase.User>

  constructor(public afAuth: AngularFireAuth, private route: ActivatedRoute,private userService: UserService) {

    this.users$ = afAuth.authState;

   }

  login(){

   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
   localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
  }

  logout(){

    this.afAuth.signOut();
  }


  get appUsers$(): Observable<AppUser>{

    return this.users$
     .pipe(switchMap(user => {
  
      if(user) return this.userService.get(user.uid);
      return Observable.of(null);

     }));
      

  }


}
