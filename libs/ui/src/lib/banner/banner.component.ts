/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  redirectToProducts(){
    this.router.navigate(['/products'])
  }

}
