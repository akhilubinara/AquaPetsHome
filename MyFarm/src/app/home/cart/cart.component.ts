import { Component } from '@angular/core';
import { MyprofileComponent } from 'src/app/myprofile/myprofile.component';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
 
  msg=false;
  cart:any=[];
  myAddress:any=[];
  user:any
  total=0
  constructor(private ds:DataService, private myprofile:MyprofileComponent){}

  ngOnInit():void{
    this.total = this.ds.gettotal();
    this.ds.getcart().subscribe(
      (data:any)=>{
        this.cart = data.products
        this.ds.cartcount = this.cart.length
        console.log(this.cart[0].price);
        this.msg = true;
        this.total = this.cart.reduce((acc:any, product:any) => acc + product.price, 0);
          localStorage.setItem('total',JSON.stringify(this.total));
          console.log('Total is :'+this.total);
      },
      (data:any)=>{
        this.cart = data.error.message;
      }
    )
  }
  order(){

  }
  getAddress(){
    this.ds.getAddress().subscribe(
      (result:any)=>{
        this.myAddress = result.address;
        this.user = result.user 
        console.log(this.myAddress);
        console.log(this.user);
        
        
      },
      (result:any)=>{
        alert(result.error.message);
      }
    )
  }
  DeleteCart(product_id:any){
    return this.ds.DeleteCart(product_id).subscribe(
      (result:any)=>{
        alert(result.message);
      },
      (result:any)=>{
        alert(result.error.message)
      })
  }
  Checkout(){
    this.myprofile.pflag = 'checkout';
    console.log(this.myprofile.pflag);
    
  }
}
