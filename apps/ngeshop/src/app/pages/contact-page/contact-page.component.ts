import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'mcampos-contact-page',
  templateUrl: './contact-page.component.html',
  styles: [
  ]
})
export class ContactPageComponent implements OnInit {

  constructor( 
    private router: Router,
    private formBuilder: FormBuilder) { }

  checkoutFormGroup!: FormGroup;
  isSubmitted = false;

  ngOnInit(): void {
    this._initCheckoutForm();
  }

  backToCart() {
    this.router.navigate(['/cart']);
}

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
        name: ['asdf', Validators.required],
        email: ['asd@asdf', [Validators.email, Validators.required]],
        phone: ['34605675936'],
      
    });
}
get checkoutForm() {
  return this.checkoutFormGroup.controls;
}

}
