import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '@env/environment'
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLOrders = environment.apiURL + 'orders'
  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders)
  }

  getOrder(OrderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${OrderId}`)
  }

//   createOrder(Order: Order): Observable<Order>{
//     return this.http.post<Order>(this.apiURLOrders, Order)
//   }

//   updateOrder(Order: Order): Observable<Order>{
//     return this.http.put<Order>(`${this.apiURLOrders}/${Order.id}`, Order)
//   }

//   deleteOrder(OrderId: string): Observable<any>{
//     return this.http.delete<Object>(`${this.apiURLOrders}/${OrderId}`, )
//   }
}

