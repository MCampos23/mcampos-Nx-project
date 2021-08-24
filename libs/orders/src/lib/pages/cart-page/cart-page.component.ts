import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/ordersService';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit {

  cartItemDetailed : cartItemDetailed[] = []
  cartCount = 0

  constructor(
    private route : Router,
    private cartService : CartService,
    private ordersService : OrdersService


  ) { }

  ngOnInit(): void {
    this._getCartDetails()
  }

  private _getCartDetails(){
    this.cartService.cart$.pipe().subscribe(respCart => {
     this.cartItemDetailed = []
     this.cartCount = respCart?.items.length ?? 0;
      respCart.items?.forEach(cartItem => {
        this.ordersService.getProduct(cartItem.productId).subscribe((resProduct)=> {
          this.cartItemDetailed.push({
            product: resProduct,
            quantity: cartItem.quantity
          })
        })
      })
    })
  }


  backToShop(){
    this.route.navigate(['/products'])
  }
  deleteCartItem(item : cartItemDetailed){
   this.cartService.deleteCartItem(item.product.id)
  }

  updateCartItemQuantity(event: any, cartItem: any){

    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    },
    true)
  }
}
