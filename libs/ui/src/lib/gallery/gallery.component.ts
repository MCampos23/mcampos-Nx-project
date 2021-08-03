import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {

  @Input() images: any

  selectedImageUrl = "" 
  constructor() { }

  ngOnInit(): void {
    if(this.images.length){
      this.selectedImageUrl = this.images[0]
    }
  }

  changeSelectedImage(imageUrl: string){
    this.selectedImageUrl = imageUrl
  }

}
