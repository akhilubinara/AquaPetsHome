import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
 
  msg:any;
  cart:any=[];
  total=0
  constructor(private ds:DataService){}

  ngOnInit():void{
    this.total = this.ds.gettotal();
    this.ds.getcart().subscribe(
      (data:any)=>{
        this.cart = data.products
        this.ds.cartcount = this.cart.length
        console.log(this.cart[0].price);
        this.total = this.cart.reduce((acc:any, product:any) => acc + product.price, 0);
          localStorage.setItem('total',JSON.stringify(this.total));
          console.log('Total is :'+this.total);
        
        // this.setTotal();
        // this.getTotal();
        if(this.cart.length==0){
          this.msg=true
        }
      },
      (data:any)=>{
        this.cart = data.error.message;
      }
    )
  }
  // setTotal(){
  //   this.total = this.cart.price.reduce((a:any,b:any)=>a+b)
  //   localStorage.setItem('total',JSON.stringify(this.total));
  // }
  // getTotal(){
  //   this.total = JSON.parse(localStorage.getItem('total') || '')
  // }
  
  order(){
    
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
}
