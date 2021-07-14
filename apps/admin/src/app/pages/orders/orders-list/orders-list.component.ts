import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@mcampos/orders';
import { ORDER_STATUS } from '../order.constants'


@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {
  orderStatus:any = ORDER_STATUS;
  orders: Order[] = [];

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }
  showOrder(orderId: string){
    this.router.navigateByUrl(`order/${orderId}`)
  }

  getOrders(){
     this.ordersService.getOrders().subscribe(orders => {
       this.orders = orders;
     })
  }

}
