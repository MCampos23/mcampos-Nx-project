import { Component, OnInit } from '@angular/core';
import { CartService } from '@mcampos/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'mcampos-messages',
  templateUrl: './messages.component.html',
  styles: [
  ]
})
export class MessagesComponent implements OnInit {

  constructor(private cartService: CartService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Producto añadido',
        detail: 'Producto añadido con éxito'
      });
    });
  }

}
