import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@mcampos/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
    products: Array<Product> = [];
    endsubs$: Subject<any> = new Subject();

    constructor(
        private productsService: ProductsService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._getProducts();
    }
    ngOnDestroy() {
        this.endsubs$.next();
        this.endsubs$.complete();
      }
    
    updateProduct(productId: string) {
        this.router.navigateByUrl(`products/form/${productId}`);
    }
    deleteProduct(productId: string) {
        this.confirmationService.confirm({
            message: '¿Seguro que quieres eliminar este producto?',
            header: 'Eliminar producto',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productsService
                    .deleteProduct(productId)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe(
                    () => {
                        this._getProducts();
                        this.messageService.add({ severity: 'success', summary: 'Producto eliminado', detail: 'Producto eliminado con éxito' });
                    },
                    () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el producto' });
                    }
                );
            }
        });
    }

    private _getProducts() {
        this.productsService
            .getProducts()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((products) => {
            this.products = products;
        });
    }
}
