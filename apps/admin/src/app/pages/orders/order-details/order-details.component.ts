import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@mcampos/orders';

@Component({
  selector: 'admin-order-details',
  templateUrl: './order-details.component.html',
  styles: [
  ]
})
export class OrderDetailsComponent implements OnInit {
  
  order!: Order;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._getOrder();
  }

  private _getOrder(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.ordersService.getOrder(params.id).subscribe(order => {
          this.order= order
        })
      }
    })
  }
}
