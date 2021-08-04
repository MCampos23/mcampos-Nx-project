import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartOrdersComponent } from './components/cart-orders/cart-orders.component';
import {BadgeModule} from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';

const routes : Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  }
]

@NgModule({
    imports: [InputNumberModule, ButtonModule, CommonModule, BadgeModule, RouterModule.forChild(routes)],
    declarations: [
      CartOrdersComponent,
      CartPageComponent
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
