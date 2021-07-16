import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderItem, OrdersService } from '@mcampos/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';


@Component({
  selector: 'admin-order-details',
  templateUrl: './order-details.component.html',
  styles: [
  ]
})
export class OrderDetailsComponent implements OnInit {
  
  order!: Order;
  orderStatuses!: Array<any>;
  selectedStatus!: any;

  
  
  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _mapOrderStatus(){
    this.orderStatuses = Object.keys(ORDER_STATUS).map(key => {
      
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
 
    });
   
  }

  private _getOrder(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.ordersService.getOrder(params.id).subscribe(order => {
          this.order = order
          this.selectedStatus = order.status
 
          console.log(order)
        })
      }
    })
  }
  onStatusChange(event: any){
    this.ordersService.updateOrder({status: event.value},  this.order.id).subscribe(
      () => {
      this.messageService.add({
         severity: 'success', 
         summary: 'Estado editado', 
         detail: `Estado editado con éxito` 
      });   
    },
    () => {
      this.messageService.add({
         severity: 'danger', 
         summary: 'Error', 
         detail: `No se pudo editar el estado` 
      });  
    });
  }

}
