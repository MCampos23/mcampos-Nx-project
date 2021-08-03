import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component'
import { ButtonModule } from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component'
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import { UiModule } from '@mcampos/ui'

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'product/:productId',
    component: ProductDetailsComponent
  },
  {
    path: 'category/:categoryId',
    component: ProductsListComponent
  }

]

@NgModule({
    imports: [UiModule, FormsModule, CheckboxModule, CommonModule, RouterModule.forChild(routes), ButtonModule, RatingModule, InputNumberModule],
    declarations: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductsComponent,
      ProductsListComponent,
      ProductDetailsComponent,
      
    ],
    exports: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductsComponent,
      ProductsListComponent
     
    ]
})
export class ProductsModule {}
