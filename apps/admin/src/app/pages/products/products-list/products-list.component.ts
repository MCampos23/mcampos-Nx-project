import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@mcampos/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products: Array<Product> = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }
  updateProduct(pruductId: string){
    this.router.navigateByUrl(`products/form/${pruductId}`)
  }

  private _getProducts(){
    this.productsService.getProducts().subscribe(products =>{
      this.products = products;
    }
    )
  }
}
