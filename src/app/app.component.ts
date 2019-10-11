import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-form';
  image$:any;
  images$ = [];
  imageUpload$: any;


  constructor(private http:HttpClient){
     
  }
  ngOnInit(){

  } 
  fileChange(evt){
    const  UploadInput = {
      type: 'uploadAll',
      url: 'http://ngx-uploader.com/upload',
      method: 'POST',
      data: { foo: 'bar' }
    };
    this.image$ = evt.target.files[0];
    console.log(this.image$);
    this.onUpload(this.image$);
  }

  fileMultipleFileChange(evt){
  let images = evt.target.files;
  this.imageUpload$ =  images;
    if(images.length > 0){
        // has images
        for(let i =0; i< images.length; i++){
             let image = {
              name: images[i].name,
              size: images[i].size,
              type: images[i].type,
              url:  this.getImagPath(images[i]).then(imgPath => image.url = imgPath)
             }

            this.images$.push(image);
          }
         
        };
    console.log(this.images$)
  }

  startUpload(){
    if(this.imageUpload$.length > 0){
      for(let i=0; i<this.imageUpload$.length; i++){
        this.onUpload(this.imageUpload$[i]);
      }
    }
  }

  getImagPath(imageData): Promise<any> {
    return new Promise((resolve, reject) => {
      let rd = new FileReader();
      rd.onload =  (event: any) => {
        resolve(event.target.result);
      }

    rd.readAsDataURL(imageData);
    });
    
    

  }

  onUpload(imageData){
    if(imageData){
      let fd =new FormData();
      fd.append('file',imageData);
      this.http.post('http://localhost/FileUpload/index.php',fd).subscribe(res=>{
        console.log(res)
        // (res)=>console.log('success',res);
        // error=>console.log('error',error);
      });

    }
  }
}
