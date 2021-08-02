import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
//import { Category } from '../models/category';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    apiURLProducts = environment.apiURL + 'products';
    constructor(private http: HttpClient) {}

    getProducts(categoriesFilter?: string[]): Observable<Product[]> {
        let params = new HttpParams()
        if (categoriesFilter) {
            params = params.append('categories', categoriesFilter.join(','))
        }
        return this.http.get<Product[]>(this.apiURLProducts, {params: params});
    }

    getProduct(productId: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
    }

    createProduct(productData: FormData): Observable<Product> {
        return this.http.post<Product>(this.apiURLProducts, productData);
    }

    updateProduct(product: FormData, productId: string): Observable<Product> {
        return this.http.put<Product>(`${this.apiURLProducts}/${productId}`, product);
    }

    deleteProduct(categoryId: string): Observable<Product> {
        return this.http.delete<Product>(`${this.apiURLProducts}/${categoryId}`);
    }
    getProductsCount(): Observable<any> {
        return this.http
            .get<number>(`${this.apiURLProducts}/get/count`)
            .pipe(map((objectValue: any) => objectValue.productCount));
    }
    getFeaturedProducts(count: number): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiURLProducts}/get/featured/${count}`);
    }
}
