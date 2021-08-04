import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartOrdersComponent } from './components/cart-orders/cart-orders.component';
import {BadgeModule} from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import { OrderSumaryComponent } from './components/order-sumary/order-sumary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ThankYouComponent } from './components/thank-you/thank-you.component';


const routes : Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent
  },
  {
    path: 'success',
    component: ThankYouComponent
  }
]

@NgModule({
    imports: [InputTextModule, InputMaskModule, DropdownModule, ReactiveFormsModule,
       InputNumberModule, ButtonModule, CommonModule, BadgeModule, RouterModule.forChild(routes), FormsModule],
    declarations: [
      CartOrdersComponent,
      CartPageComponent,
      OrderSumaryComponent,
      CheckoutPageComponent,
      ThankYouComponent
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
