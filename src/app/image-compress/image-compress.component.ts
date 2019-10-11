import { Component, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-image-compress',
  templateUrl: './image-compress.component.html',
  styleUrls: ['./image-compress.component.scss']
})
export class ImageCompressComponent implements OnInit {

  constructor(private imageCompress: NgxImageCompressService) { }
  file: any;
  predictions: number[];
  imageDataEvent: any;
  localUrl: any;
  localCompressedURl:any;
  isFlip: boolean = false;
  sizeOfOriginalImage:number;
  sizeOFCompressedImage:number;
  selectFile(event: any) {
    // console.log(event.target.files);
    var  fileName : any;
    this.file = event.target.files[0];
    fileName = this.file['name'];
    console.log("file size:",this.file['size']/(1024*1024));
    console.log("uploaded file:", this.file);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.compressFile(this.localUrl,fileName)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    
  }
  imgResultBeforeCompress:string;
  imgResultAfterCompress:string;
  compressFile(image,fileName) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image)/(1024*1024);
      console.warn('Size in bytes is now:',  this.sizeOfOriginalImage);
      
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          this.localCompressedURl = result;
          this.sizeOFCompressedImage = this.imageCompress.byteCount(result)/(1024*1024)
          console.warn('Size in bytes after compression:',  this.sizeOFCompressedImage);
          // create file from byte
          const imageName = fileName;
          // call method that creates a blob from dataUri
          const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
          const imageFile = new File([result], imageName, { type: 'image/jpeg' });
          console.log("file size:",imageFile['size']/(1024*1024));
        }
      );
    // this.imageCompress.uploadFile().then(({image, orientation}) => {
    //       console.log('Image:',image);
    //       console.log('orientation:',orientation);
    //   this.imgResultBeforeCompress = image;
    //   console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      
    //   this.imageCompress.compressFile(image, orientation, 50, 50).then(
    //     result => {
    //       this.imgResultAfterCompress = result;
    //       console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
    //     }
    //   );
      
    // });
    
  }
   dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });    
    return blob;
 }
  ngOnInit() {
  }

}
