import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { take ,map } from 'rxjs/operators';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  itemsMap: any;

  constructor(private db: AngularFireDatabase) { }


  async getCart(): Promise<Observable<ShoppingCart>>{

    let cartId = await this.getOrCreateCartId(); 
     return this.db.object<ShoppingCart>('/shopping-carts/'+ cartId).valueChanges()
     .pipe(map(x=>new ShoppingCart(x.items)))
 
   }


   async addToCart(product: Product){

    this.updateItem(product,1);
 
   
 }

 async removeFromCart(product: Product){

   this.updateItem(product,-1);


 }

 async clearCart(){
   let cartId = await this.getOrCreateCartId();
   this.db.object('/shopping-carts/' + cartId + '/items').remove();
 }




  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated:new Date().getTime()
    });
  }

 
  

 private async getOrCreateCartId():Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId; 

      let result = await this.create()
      localStorage.setItem('cartId',result.key)
      return result.key;
    
  }




  

  private async updateItem(product: Product, change: number){

    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/'+ cartId + '/items/' + product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      if (item.payload.exists()) {
          item$.update({ 
            quantity: item.payload.exportVal().quantity + change });
        } else {
          item$.set({
            title:product.title,
            imageUrl:product.imageUrl,
            price:product.price,
            quantity: change});
        }
    });

  }


}
