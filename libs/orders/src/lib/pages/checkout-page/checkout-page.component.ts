import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@mcampos/users';
import { Order } from '../../models/order';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/ordersService';

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
    constructor(
        private router: Router,
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private cartService: CartService,
        private ordersService: OrdersService
    ) {}
    checkoutFormGroup!: FormGroup;
    isSubmitted = false;
    orderItems: any[] = [];
    userId = '60f5456f94117e2eb8241e96';
    countries: any = [];

    ngOnInit(): void {
        this._initCheckoutForm();
        this._getCartItems();
        this._getCountries();
    }

    private _initCheckoutForm() {
        this.checkoutFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            phone: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            zip: ['', Validators.required],
            apartment: ['', Validators.required],
            street: ['', Validators.required]
        });
    }

    private _getCountries() {
        this.countries = this.usersService.getCountries();
    }

    private _getCartItems() {
        const cart: Cart = this.cartService.getCart();
        this.orderItems = cart.items?.map((item) => {
            return {
                product: item.productId,
                quantity: item.quantity
            };
        });
    }

    backToCart() {
        this.router.navigate(['/cart']);
    }

    placeOrder() {
        this.isSubmitted = true;
        if (this.checkoutFormGroup.invalid) {
            return;
        }
        
        const order: Order = {
            orderItems: this.orderItems,
            street: this.checkoutForm.street.value,
            shippingAddress1: this.checkoutForm.apartment.value,
            zip: this.checkoutForm.zip.value,
            city: this.checkoutForm.city.value,
            country: this.checkoutForm.country.value,
            phone: this.checkoutForm.phone.value,
            status: 0,
            user: this.userId,
            dateOrdered: `${Date.now()}`
        };
        
              
        this.ordersService.createOrder(order).subscribe(
            () => {
                this.cartService.emptyCart();
                this.router.navigate(['/success']);
            },
            () => {              
                console.log('Hubo algún error en el pedido');
            }
        );
    }

    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }
}
