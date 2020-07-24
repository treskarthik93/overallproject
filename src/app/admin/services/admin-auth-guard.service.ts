import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { map} from 'rxjs/operators';
import { Observable} from 'rxjs/Observable';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService:UserService) { }

  canActivate(): Observable<boolean>{

    return this.auth.appUsers$
   
     .pipe(map((appUser : any )=>appUser.isAdmin));
  
        }


}
