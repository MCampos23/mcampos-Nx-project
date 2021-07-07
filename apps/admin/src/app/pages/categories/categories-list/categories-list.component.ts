import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@mcampos/products';
import { MessageService } from 'primeng/api';

import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',

})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = []
 

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
   ) { }

  ngOnInit(): void {
    this._getCategories()
  }

  deleteCategory(categoryId: string) {

    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar esta categoría?',
      header: 'Eliminar Categoría',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          () =>{
            this._getCategories()
            this.messageService.add(
              {severity:'success', summary:'Categoría eliminada', detail:'Categoría eliminada con éxito'}
              );
             
          },
          () =>{
            this.messageService.add(
              {severity:'error', summary:'Error', detail:'No se pudo eliminar la categoría.'}
              );
          }
        )
      }     
  });
  }

  updateCategory(categoryId: string){
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories(){
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }
}