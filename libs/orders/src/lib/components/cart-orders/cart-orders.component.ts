import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'orders-cart-orders',
    templateUrl: './cart-orders.component.html',
    styles: []
})
export class CartOrdersComponent implements OnInit {
    totalItems = '0';

    constructor(private cartService: CartService) {}

 

    ngOnInit(): void {
      this.cartService.cart$.subscribe((cart) => {
        this.totalItems = cart?.items?.length.toString() ?? "0";
      })
    }

}
    

