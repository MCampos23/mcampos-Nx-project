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

get hasImages(){
  return this.images?.length > 0
}

  ngOnInit(): void {
    if(this.hasImages){
      this.selectedImageUrl = this.images[0]
    }
  }

  changeSelectedImage(imageUrl: string){
    this.selectedImageUrl = imageUrl
  }

}
