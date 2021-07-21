import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@mcampos/orders';
import { ProductsService } from '@mcampos/products';
import { UsersService } from '@mcampos/users';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
    statistics:Array<any> = []
    endsubs$: Subject<any> = new Subject();
    constructor(
      private ordersService: OrdersService,
      private productsService: ProductsService,
      private usersService: UsersService
     
      ) {}

    ngOnInit(): void {
        combineLatest([
            this.ordersService.getOrdersCount(),
            this.productsService.getProductsCount(),
            this.usersService.getUsersCount(),
            this.ordersService.getTotalSales()
          ])
            .pipe(takeUntil(this.endsubs$))
            .subscribe((values) => {
                this.statistics = values;
            });
    }

    ngOnDestroy() {
        this.endsubs$.next();
        this.endsubs$.complete();
      }
}
