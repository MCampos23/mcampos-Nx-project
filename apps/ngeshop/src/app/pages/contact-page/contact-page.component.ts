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

  contactFormGroup!: FormGroup;
  isSubmitted = false;

  ngOnInit(): void {
    this._initCheckoutForm();
  }

  backToCart() {
    this.router.navigate(['/cart']);
}
  sendReq (){
    this.isSubmitted = true;
    if (this.contactFormGroup.invalid) {
        return;
    }
    this.router.navigate(['contact-form/sent'])
  }
  private _initCheckoutForm() {
    this.contactFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        message: ['', Validators.required],
      
    });
}
get contactForm() {
  return this.contactFormGroup.controls;
}

}
