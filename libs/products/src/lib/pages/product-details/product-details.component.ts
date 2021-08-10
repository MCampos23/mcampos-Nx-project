import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem, CartService } from '@mcampos/orders';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'mcampos-product-details',
    templateUrl: './product-details.component.html',
    styles: []
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    product!: Product;
    endSubs$: Subject<any> = new Subject();
    quantity = 1;
    

    constructor(
        private productsService: ProductsService, 
        private route: ActivatedRoute, 
        private cartService: CartService,
        private router : Router) {}

    ngOnInit(): void {
        if (this.route.params) {
            this.route.params.subscribe((params) => {
                this._getProduct(params.productId);
            });
        }
    }
    ngOnDestroy() {
        this.endSubs$.next();
        this.endSubs$.complete();
    }
    addItemToCart(isBuyNow? : boolean){
      const cartItem : CartItem = {
        productId: this.product.id,
        quantity: this.quantity
      }
      this.cartService.setCartItem(cartItem)
      if(isBuyNow){ this.router.navigate(['/cart']);}
    }

    private _getProduct(id: string) {
        this.productsService
            .getProduct(id)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((product) => {
                this.product = product;
            });
    }
}
