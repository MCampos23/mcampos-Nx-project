import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartOrdersComponent } from './components/cart-orders/cart-orders.component';
import {BadgeModule} from 'primeng/badge';


@NgModule({
    imports: [CommonModule, BadgeModule],
    declarations: [
      CartOrdersComponent
    ],
    exports: [
      CartOrdersComponent
    ]
})
export class OrdersModule {

    constructor( cartService: CartService){
        cartService.initCartLocalStorage()
    }
}
