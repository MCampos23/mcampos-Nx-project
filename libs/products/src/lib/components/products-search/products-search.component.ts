/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-search',
  templateUrl: './products-search.component.html',
  styles: [
  ]
})

export class ProductsSearchComponent{

 
  nameAndId = []

  constructor(private productsService: ProductsService) { }

 searchProduct(searchValue : string){

   //const searchValueWords = searchValue.toLocaleUpperCase().split(" ")
   
   
   this.productsService.getProducts().subscribe( products =>{
   
    this.nameAndId = products.map(product =>{
      product.name.toLocaleUpperCase().split(" ")       
      product.id
     })     
  })

  console.log(this.nameAndId)
 }
 
}

// productNames.forEach(product =>{
//   //Recorrer cada palabra de cada array producto 

//   for(let z = 0; z < searchValueWords.length; z++){    
//     if(product.includes(searchValueWords[z]) && !result.includes(product)){
//       result.push(product)
//     }  
//   }
//   })
