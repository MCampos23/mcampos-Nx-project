import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@mcampos/orders';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  constructor(
    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
     this.ordersService.getOrders().subscribe(orders => {
       this.orders = orders;
     })
  }

}
