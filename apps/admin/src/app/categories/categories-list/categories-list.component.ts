import { Component, OnInit } from '@angular/core';
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
    private confirmationService: ConfirmationService
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
          response =>{
            this._getCategories()
            this.messageService.add(
              {severity:'success', summary:'Categoría eliminada', detail:'Categoría eliminada con éxito'}
              );
             
          },
          (error) =>{
            this.messageService.add(
              {severity:'error', summary:'Error', detail:'No se pudo eliminar la categoría.'}
              );
          }
        )
      },
      reject: () => {
      }
  });

    
  }

  private _getCategories(){
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }
}
