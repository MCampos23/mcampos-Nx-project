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
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextareaModule} from 'primeng/inputtextarea';


const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'contact', component: ContactPageComponent },
   
];

@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent, ContactPageComponent],
    imports: [
        RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
        HttpClientModule,
        ProductsModule,
        BrowserModule,
        BrowserAnimationsModule,        
        UiModule,
        AccordionModule,
        OrdersModule,
        ToastModule,
        InputTextModule,
        ButtonModule,
        InputMaskModule,
        InputTextareaModule
    ],

    providers: [MessageService],
    bootstrap: [AppComponent],
    exports: [
      MessagesComponent
    ]
})
export class AppModule {}
