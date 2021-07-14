import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@mcampos/orders';

const ORDER_STATUS = {
  0 : {
    label: 'Pendiente',
    color: 'primary'
  },
  1 : {
    label: 'Procesado',
    color: 'warning'
  },
  2 : {
    label: 'En curso',
    color: 'warning'
  },
  3 : {
    label: 'Enviado',
    color: 'success'
  },
  4 : {
    label: 'Rechazado',
    color: 'danger'
  }
}

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
