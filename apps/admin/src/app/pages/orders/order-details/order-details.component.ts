import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@mcampos/orders';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ORDER_STATUS } from '../order.constants';


@Component({
  selector: 'admin-order-details',
  templateUrl: './order-details.component.html',
  styles: [
  ]
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  
  order!: Order;
  orderStatuses!: Array<any>;
  selectedStatus!: any;
  endsubs$: Subject<any> = new Subject();

  
  
  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }
  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
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
        this.ordersService
          .getOrder(params.id)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(order => {
          this.order = order
          this.selectedStatus = order.status
 
          console.log(order)
        })
      }
    })
  }
  onStatusChange(event: any){
    this.ordersService
      .updateOrder({status: event.value},  this.order.id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
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
