import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@mcampos/ui';
import { ProductsModule } from '@mcampos/products';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@mcampos/orders';
import { ToastModule } from 'primeng/toast';
import { MessagesComponent } from './shared/messages/messages.component';
import { MessageService } from 'primeng/api';

const routes: Routes = [
    { path: '', component: HomePageComponent },
   
];

@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
    imports: [
        RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
        HttpClientModule,
        ProductsModule,
        BrowserModule,
        BrowserAnimationsModule,        
        UiModule,
        AccordionModule,
        OrdersModule,
        ToastModule
    ],

    providers: [MessageService],
    bootstrap: [AppComponent],
    exports: [
      MessagesComponent
    ]
})
export class AppModule {}
