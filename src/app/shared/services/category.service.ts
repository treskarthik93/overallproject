import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/Operators'
import { Product } from 'shared/models/product';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getALL(){

    return this.db.list('/categories').snapshotChanges()
    .pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() as Product }))
      )
    );

  }
}
