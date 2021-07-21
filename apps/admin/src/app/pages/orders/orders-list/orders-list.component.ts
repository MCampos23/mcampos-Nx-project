import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@mcampos/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ORDER_STATUS } from '../order.constants';

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit, OnDestroy {
    orderStatus: any = ORDER_STATUS;
    orders: Order[] = [];
    endsubs$: Subject<any> = new Subject();

    constructor(
        private ordersService: OrdersService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }
    ngOnDestroy() {
        this.endsubs$.next();
        this.endsubs$.complete();
      }
    showOrder(orderId: string) {
        this.router.navigateByUrl(`order/${orderId}`);
    }

    deleteOrder(orderId: string) {
        this.confirmationService.confirm({
            message: '¿Seguro que quieres eliminar este pedido?',
            header: 'Eliminar Pedido',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService.deleteOrder(orderId).subscribe(
                    () => {
                        this._getOrders();
                        this.messageService.add({ severity: 'success', summary: 'Pedido eliminado', detail: 'Pedido eliminado con éxito' });
                    },
                    () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el pedido' });
                    }
                );
            }
        });
    }

    _getOrders() {
        this.ordersService
            .getOrders()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((orders) => {
            this.orders = orders;
        });
    }
}
