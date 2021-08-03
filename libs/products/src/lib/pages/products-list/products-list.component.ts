/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];
    categories: Category[] = [];
    isCategoryPage!: boolean;

    constructor(
        private productsService: ProductsService, 
        private categoriesService: CategoriesService, 
        private route: ActivatedRoute
        ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params.productId) {
                this.isCategoryPage = true;
                this._getProducts([params.productId]);
            } else this._getProducts();
        });
        this._getCategories();
    }

    private _getProducts(categoriesFilter?: string[]) {
        this.productsService.getProducts(categoriesFilter).subscribe((resProducts) => {
            this.products = resProducts;
        });
    }
    private _getCategories() {
        this.categoriesService.getCategories().subscribe((resCategories) => {
            this.categories = resCategories;
        });
    }
    categoryFilter() {
        const selectedCategories: any = this.categories.filter((category) => category.checked).map((category) => category.id);

        this._getProducts(selectedCategories);
    }
}
