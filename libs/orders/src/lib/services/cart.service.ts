import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    
    cart$ : BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
    
    constructor() {}

    initCartLocalStorage() {
      const cart : Cart = this.getCart()
      if (!cart){
        const initialCart: any = {
            items: []
        };
        const initialCartJson = JSON.stringify(initialCart);
        localStorage.setItem(CART_KEY, initialCartJson);
      }
    }

    getCart() {
        const cartJsonString: any = localStorage.getItem(CART_KEY);
        const cart: Cart = JSON.parse(cartJsonString);
        return cart;
    }
    
    setCartItem(cartItem: CartItem): Cart {
        const cart = this.getCart();

        const cartItemExists = cart.items?.find((item) => item.productId === cartItem.productId);
        if (cartItemExists) {
            cart.items?.map((item) => {
                if (item.productId === cartItem.productId) {
                    item.quantity = item.quantity + cartItem.quantity;
                }
            });
        } else {
            cart.items?.push(cartItem);
        }
        const cartJson = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJson);
        this.cart$.next(cart)
        return cart;
    }
}