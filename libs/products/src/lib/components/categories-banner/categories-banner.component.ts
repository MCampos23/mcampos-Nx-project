import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
    selector: 'mcampos-categories-banner',
    templateUrl: './categories-banner.component.html',
    styles: []
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
    public loading = false;
    categories!: Category[];
    endSubs$: Subject<any> = new Subject();
    constructor(private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this.loading = true;       
        this. _getCategories()
      }
      
      private _getCategories(){
        
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categories) => {
                this.loading = false;
                this.categories = categories;
            });

      }
     
    ngOnDestroy() {
        this.endSubs$.next();
        this.endSubs$.complete();
    }
}
