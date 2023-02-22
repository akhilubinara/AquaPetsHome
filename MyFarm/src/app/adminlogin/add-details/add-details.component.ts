import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent {

 image ="../../assets/img/";
  constructor(private fb:FormBuilder, private ds:DataService, private router:Router){}

  addform = this.fb.group({
    fname:['',[Validators.required]],
    tname:['',[Validators.required,]],
    quality:[''],
    amt:['',[Validators.required,Validators.pattern('[0-9]*')]],
    img:['',[Validators.required]],
    description:['',[Validators.required]],
    age:['']
  })
  
submit(){

  if(this.ds.currentusername=='Admin'){
    var pname= this.addform.value.fname;
    var type = this.addform.value.tname;
    var age = this.addform.value.age;
    var description = this.addform.value.description;
    var quality = this.addform.value.quality;
    var price = this.addform.value.amt;
    var image = this.image;
   console.log(image);
   
    
    if(this.addform.valid){
      this.ds.Submit(pname,type,age,description,quality,price,image)
      .subscribe((result:any)=>{
        this.router.navigateByUrl('add-details')
        alert(result.message);

      },
      (result:any)=>{
        alert(result.error.message);
      })
      
    }
  }
  else{
    alert('Please Login...')
  }

}
 getImageEmitter = new EventEmitter();
onFileSelect(event:any){
  this.image += event.target.files[0].name;

    // const file = (event.target as HTMLInputElement).files[0];
    // this.addform.patchValue({image: file});
    // const allowedMimeTypes = ["image/png","image/jpeg","image/jpg"];
    // if(file && allowedMimeTypes.includes(file.type)) {
    //   const reader = new FileReader();
    //   reader.onload = () =>{
    //     this.imageData = reader.result as string;
    //   };
    //   reader.readAsDataURL(file);
    // }
  }
}
