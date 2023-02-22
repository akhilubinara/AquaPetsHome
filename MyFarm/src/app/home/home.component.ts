import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username = this.ds.currentusername;
  allproduct:any=[];
  searchterm:string='';

constructor(private fb:FormBuilder,private ds:DataService, private router:Router){
  this.getallproducts()
}
ngOnInit():void{
  this.getallproducts()
}
getallproducts(){
  this.allproduct = this.ds.getproduct().subscribe(
    (data:any)=>{
      this.allproduct = data.product;
      console.log(this.allproduct);
      
    }
  )
  this.ds.searchkey.subscribe(
    (data:any)=>{
      this.searchterm=data
    }
  )
}

wishlist(product:any){

   this.ds.addtowish(product).subscribe(
    (result:any)=>{
      //this.toastr.success(result.message,'toast')
     alert(result.message);
    // console.log(result.data);
    
  },
  (result:any)=>{
    alert(result.error.message)
    // this.router.navigateByUrl('login')
  }
  )

}
Edit(product:any){

}
Delete(product:any){
  this.ds.DeleteProduct(product).subscribe(
    (result:any)=>{
      alert(result.message);
      this.router.navigateByUrl('')
    },
    (result:any)=>{
      alert(result.error.message);
    }
  )
}
buynow(product:any){
  if(this.username=='Login'){
    alert('Hey User, Please Login...... ');
  }
  else{
    this.ds.addtocart(product).subscribe(
      (result:any)=>{
        alert(result.message);
        this.router.navigateByUrl('cart')
    },
    (result:any)=>{
      alert(result.error.message);
      this.router.navigateByUrl('cart')
    })
  }
}
  search(searchkey:any){
    console.log(searchkey);
    
    this.ds.search(searchkey).subscribe(
      (result:any)=>{
        this.allproduct = result.data;
        console.log(this.allproduct);
        
      },
      (result:any)=>{
        alert(result.error.message)
      }
    )

  }
searchkey:any
}


