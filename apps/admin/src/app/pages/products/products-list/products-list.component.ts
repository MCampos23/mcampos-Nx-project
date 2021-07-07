import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mcampos-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products = []
  constructor() { }

  ngOnInit(): void {
  }

}
