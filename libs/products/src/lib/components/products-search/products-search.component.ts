/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'products-search',
    templateUrl: './products-search.component.html',
    styles: []
})
export class ProductsSearchComponent {

    constructor(
      private router : Router
      ) {}

    searchProduct(searchValue: string) {        
     this.router.navigate(['/search/'+ searchValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "")])     
       
    }


   
}



