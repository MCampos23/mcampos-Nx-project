/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '@env/environment'
import { Order } from '../models/order';
import { map } from 'rxjs/operators';


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

  updateOrder(orderStatus: {status: string}, orderId:string | undefined ): Observable<Order>{
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus)
  }

  deleteOrder(OrderId: string): Observable<any>{
    return this.http.delete<Object>(`${this.apiURLOrders}/${OrderId}`, )
  }

  getOrdersCount(): Observable<any>{
    return this.http
      .get<number>(`${this.apiURLOrders}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<any> {
    return this.http
    .get<number>(`${this.apiURLOrders}/get/totalsales`)
    .pipe(map((objectValue: any) => objectValue.totalsales));
  }
}

