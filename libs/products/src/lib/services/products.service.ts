import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//import { Category } from '../models/category';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '@env/environment'


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts = environment.apiURL + 'products'
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts)
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`)
  }

  createProduct(productData: FormData): Observable<Product>{
    return this.http.post<Product>(this.apiURLProducts, productData)
  }

  updateCategory(product: FormData, productId: string): Observable<Product>{
    return this.http.put<Product>(`${this.apiURLProducts}/${productId}`, product)
  }

  // deleteCategory(categoryId: string): Observable<any>{
  //   return this.http.delete<Object>(`${this.apiURLCategories}/${categoryId}`, )
  // }
}

