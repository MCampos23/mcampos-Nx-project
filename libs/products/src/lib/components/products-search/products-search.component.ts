/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-search',
    templateUrl: './products-search.component.html',
    styles: []
})
export class ProductsSearchComponent {

    constructor(
      private productsService: ProductsService,
      private router : Router
      ) {}

    searchProduct(searchValue: string) {        
     this.router.navigate(['/search/'+ searchValue])     
       
    }


   
}

// Resultado

// productNames.forEach(product =>{
//   //Recorrer cada palabra de cada array producto

//   for(let z = 0; z < searchValueWords.length; z++){
//     if(product.includes(searchValueWords[z]) && !result.includes(product)){
//       result.push(product)
//     }
//   }
//   })
// //Array con las palabras introducidas en el campo de búsqueda en mayúsculas
// const searchValueWords = searchValue.toLocaleUpperCase().split(' ');

// //Array con el nombre de cada producto separado en palabras mayúsculas y su id

//   const searchResult = this.products.filter(product => product.name.toLocaleUpperCase().includes(searchValueWords))

//  console.log(JSON.stringify(searchResult))


  // Array con los productos filtrados


