import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@mcampos/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {
  
  editMode = false;
  form!: FormGroup;
  isSubmitted = false;  
  categories: Category[] = [];
  imageDisplay!: any;
  currentProductID!: string;


  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._checkEditMode();
    this._getCategories();
    this._initForm();
  }
  onSubmit(){
    this.isSubmitted = true;
        if (this.form.invalid) return;
        const productFormData = new FormData();
        Object.keys(this.productForm).map((key)=>{
         productFormData.append(key, this.productForm[key].value )
        })
        
        if (this.editMode) {
            this._updateProduct(productFormData);
        } else {
            this._addProduct(productFormData);
        }

  }
  onImageUpload(event: any){
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({image: file })
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file);
    }
  }
  private _updateProduct(productData: FormData){
    this.productsService.updateProduct(productData, this.currentProductID ).subscribe(
      (product) => {
          this.messageService.add({ severity: 'success', summary: 'Categoría editada', detail: `El producto ${product.name} ha sido editado con éxito` });
          timer(2000)
              .toPromise()
              .then(() => {
                  this.location.back();
              });
      },
      () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo editar el producto' });
      }
  );
  
  }
  private _addProduct(productData: FormData){
    this.productsService.createProduct(productData).subscribe(
      () => {
          this.messageService.add({ severity: 'success', summary: 'Producto creado', detail: 'Producto creado con éxito' });
          timer(2000)
              .toPromise()
              .then(() => {
                  this.location.back();
              });
      },
      () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el producto' });
      }
  );
  }

private _initForm(){
  this.form = this.formBuilder.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    countInStock: ['', Validators.required],
    description: ['', Validators.required],
    richDescription: [''],
    image: ['',  Validators.required],
    isFeatured: [false]    
});
}

get productForm() {
  return this.form.controls;
}

private _getCategories(){
  this.categoriesService.getCategories().subscribe(cats => {
    this.categories = cats
  })
}
private _checkEditMode() {
  this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
          this.editMode = true;
          this.currentProductID = params.id;
          this.productsService.getProduct(params.id).subscribe((product) => {
             
           this.productForm.name.setValue(product.name);
           this.productForm.brand.setValue(product.brand);
           this.productForm.price.setValue(product.price);
           this.productForm.countInStock.setValue(product.countInStock);
           this.productForm.category.setValue(product.category?.id);
           this.productForm.isFeatured.setValue(product.isFeatured);
           this.productForm.description.setValue(product.description);
           this.productForm.richDescription.setValue(product.richDescription);
           this.imageDisplay = product.image;
           this.productForm.image.setValidators([]);
           this.productForm.image.updateValueAndValidity();
                          
          });
      }
  });
}
}
