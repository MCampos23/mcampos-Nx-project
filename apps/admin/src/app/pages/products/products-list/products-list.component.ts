import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@mcampos/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    products: Array<Product> = [];

    constructor(
        private productsService: ProductsService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._getProducts();
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
                this.productsService.deleteProduct(productId).subscribe(
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
        this.productsService.getProducts().subscribe((products) => {
            this.products = products;
        });
    }
}
