import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@mcampos/products';

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


  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this._getCategories();
    this._initForm();
  }
  onSubmit(){
    console.log(this.productForm.category.value)
  }
  onImageUpload(event: any){
    const file = event.target.files[0];
    if(file){
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file);
    }
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
    image: [''],
    isFeatured: ['']    
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
}
