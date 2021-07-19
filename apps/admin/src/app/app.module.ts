import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { AuthGuard, UsersModule } from '@mcampos/users';

import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { CategoriesService } from '@mcampos/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {PaginatorModule} from 'primeng/paginator';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrderDetailsComponent } from './pages/orders/order-details/order-details.component';
import { TagModule } from 'primeng/tag';
import {FieldsetModule} from 'primeng/fieldset';






const UX_MODULE = [FieldsetModule, TagModule, PaginatorModule, DropdownModule, InputSwitchModule, InputTextareaModule, InputNumberModule, ColorPickerModule, ConfirmDialogModule, InputTextModule, CardModule, ToolbarModule, ButtonModule, TableModule,ToastModule, EditorModule]

const routes:Routes = [
    { 
        path: '',
        component: ShellComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component:DashboardComponent
            },
            {
                path: 'categories',
                component:CategoriesListComponent
            },
            {
                path: 'categories/form',
                component:CategoriesFormComponent
            },
            {
                path: 'categories/form/:id',
                component:CategoriesFormComponent
            },
            {
                path: 'products',
                component:ProductsListComponent
            },
            {
                path: 'products/form',
                component:ProductsFormComponent
            },
            {
                path: 'products/form/:id',
                component:ProductsFormComponent
            },
            {
                path: 'users',
                component:UsersListComponent
            },
            {
                path: 'users/form',
                component:UsersFormComponent
            },
            {
                path: 'users/form/:id',
                component:UsersFormComponent
            },
            {
                path: 'orders',
                component:OrdersListComponent
            },
            {
                path: 'order/:id',
                component:OrderDetailsComponent
            }
        ]
    }
]

@NgModule({
    declarations: [ AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent, UsersListComponent, UsersFormComponent, OrdersListComponent, OrderDetailsComponent],
    imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserModule, RouterModule.forRoot(routes, { initialNavigation: 'enabled' }), UX_MODULE, UsersModule],
    providers: [CategoriesService, MessageService, ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
