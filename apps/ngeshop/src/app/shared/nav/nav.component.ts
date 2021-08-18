import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'ngshop-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

  ngOnInit(){
    this.items = [
      {label: 'Inicio', url: '/'},
      {label: 'Productos', url: '/products'},
      {label: 'Contacto', url: '/contact'}
  ];
  }
 
}
