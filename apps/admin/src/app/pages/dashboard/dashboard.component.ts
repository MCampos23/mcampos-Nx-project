import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@mcampos/orders';
import { ProductsService } from '@mcampos/products';
import { UsersService } from '@mcampos/users';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    ordersCount!: string;
    productsCount!: string;
    usersCount!: string;
    totalSales!: string;
    constructor(
      private ordersService: OrdersService,
      private productsService: ProductsService,
      private usersService: UsersService
     
      ) {}

    ngOnInit(): void {
        this.getTotalOrders();
        this.getTotalProducts();
        this.getTotalUsers();
        this.getTotalSales();
    }

    getTotalOrders() {
        this.ordersService.getOrdersCount().subscribe((count) => {
            this.ordersCount = count.orderCount;
        });
    }
    getTotalProducts() {
        this.productsService.getProductsCount().subscribe((count) => {
            this.productsCount = count.productCount;
        });
    }
    getTotalUsers() {
        this.usersService.getUsersCount().subscribe((count) => {
            this.usersCount = count.userCount;
        });
    }
    getTotalSales() {
        this.ordersService.getTotalSales().subscribe((count) => {
          console.log(count)  
          this.totalSales = count.totalsales;
        });
    }
}
