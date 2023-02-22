import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
emsg:any;
wishlist:any=[];
mycart:any=[];
total=0
constructor(private ds:DataService){}

ngOnInit():void{
  this.ds.getwishlist().subscribe(
    (data:any)=>{
      this.wishlist = data.products
      console.log(data.products);
      
      if(this.wishlist.length===0){
        this.emsg=true
      }
    },
    (data:any)=>{
      this.wishlist = data.error.message;
    }
  )
}
// setTotal(){
//   this.total = this.mycart.foreach((a:any)=>{this.total+=a.price})
//   localStorage.setItem('total',JSON.stringify(this.total));
//   console.log("setTotal : "+this.total);
  
// }
// getTotal(){
//   this.total = JSON.parse(localStorage.getItem('total') || '')
// }
addtocart(product:any){

  this.ds.addtocart(product).subscribe(
   (result:any)=>{
     //this.toastr.success(result.message,'toast')
    alert(result.message);
       //calling gettotal function
       let total = this.ds.gettotal();
       console.log(total);
   
 },
 (result:any)=>{
   alert(result.error.message)
   // this.router.navigateByUrl('login')
 }
 )

}
deletewish(product:any){
  this.ds.deletewish(product).subscribe(
    (result:any)=>{
      alert(result.message);
    },
    (result:any)=>{
      alert(result.error.message);
    }
  )
}
}
