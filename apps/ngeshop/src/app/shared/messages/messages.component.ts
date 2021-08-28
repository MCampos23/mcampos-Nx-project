import { Component, OnInit } from '@angular/core';
import { CartService } from '@mcampos/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'ngshop-messages',
  templateUrl: './messages.component.html',
  styles: [
  ]
})
export class MessagesComponent implements OnInit {

  constructor(private cartService: CartService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      if(this.cartService.cart$.value.items.length > 0){
        this.messageService.add({
          severity: 'success',
          summary: 'Carrito actualizado',
          detail: 'Carrito actualizado con éxito'
        });
      }
    });
  }

}
