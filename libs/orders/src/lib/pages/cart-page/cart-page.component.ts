import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit {

  quantity = 0
  constructor(
    private route : Router,
    private cartService : CartService
  ) { }

  ngOnInit(): void {
  }

  backToShop(){
    this.route.navigate(['/products'])
  }
  deleteCartItem(){
    console.log("Vas a borrarme y lo sabes...")
  }

}
