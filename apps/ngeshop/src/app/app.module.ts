import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@mcampos/ui';
import { ProductsModule } from '@mcampos/products';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'products', component: ProductListComponent }
];

@NgModule({
    declarations: [AppComponent, HomePageComponent, ProductListComponent, HeaderComponent, FooterComponent, NavComponent],
    imports: [ProductsModule, BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes, { initialNavigation: 'enabled' }), UiModule, AccordionModule],

    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
