import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {

  @Input() images: any

  selectedImage = "https://productmanagementfestival.com/wp-content/uploads/2017/01/sell-your-product-online.jpg" 
  constructor() { }

  ngOnInit(): void {
  }

}
