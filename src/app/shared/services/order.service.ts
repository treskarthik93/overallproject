import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase ,private shoppingCartService: ShoppingCartService) { }

 async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
      return result;
  }



  getOrders() { 
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref=>ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }
}

  