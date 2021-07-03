import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mcampos-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup;
  isSubmited = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],

    })  }

    onSubmit(){
      this.isSubmited = true;
      if(this.form.invalid){
        return
      }
      console.log(this.form.controls.name.value)
      console.log(this.form.controls.icon.value)
    }
    get categoryForm(){
      return this.form.controls
    }
}
