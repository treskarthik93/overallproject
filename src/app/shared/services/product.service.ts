import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ActionSequence } from 'protractor';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){

    return this.db.list('/products').push(product);

  }


  // getAll(){
  //   return this.db.list('/products').snapshotChanges()
  // }



  getAll(){
    return this.db.list('/products').snapshotChanges()
    .pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() as Product }))
      )
    );
  }


  // getAll(){
  //   return this.db.list('/products').snapshotChanges().pipe(map( action => action
  //     .map(a => {
  //       const key = a.payload.key;
  //       const data = a.payload.val();
  //       return  data;
  //     })));
  // }

  get(productId:number){
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product){
   return  this.db.object('/products/'+ productId).update(product);
  }

  delete(productId){

    return this.db.object('/products/'+ productId).remove();

  }
}
