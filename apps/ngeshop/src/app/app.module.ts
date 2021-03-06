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
import {MenubarModule} from 'primeng/menubar';
import { ContactPageFormSentComponent } from './pages/contact-page-form-sent/contact-page-form-sent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductNotFoundComponent } from './pages/product-not-found/product-not-found.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { NgxLoadingModule } from 'ngx-loading';

registerLocaleData(localeEs, 'es');

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: 'contact-form/sent', component:ContactPageFormSentComponent},
    { path: 'product-not-found', component:ProductNotFoundComponent}
   
   
];

@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent, ContactPageComponent, ContactPageFormSentComponent, ProductNotFoundComponent],
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
        InputTextareaModule,
        MenubarModule,
        ReactiveFormsModule,
        FormsModule,
        NgxLoadingModule.forRoot({})        
    ],

    providers: [MessageService, { provide: LOCALE_ID, useValue: "es" }],
    bootstrap: [AppComponent],
    exports: [
      MessagesComponent
    ]
})
export class AppModule {}
