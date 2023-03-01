import { HttpClient,HttpHeaders } from '@angular/common/http'
import { HttpClientModule } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

//global http header object
const options = {
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})


export class DataService {

  cartarray:any=[]
  cartlist = new BehaviorSubject([])
  userData:any;
  currentusername='Login';
  currentuid=''
  searchkey = new BehaviorSubject('')
  total=0
  cartcount=0;

  ngOnInit():void{
    this.getUsername();
  }
  constructor( private http:HttpClient, private router:Router) {
    this.getUsername();
    this.setdata();
   }

  register(uid:any,fname:any,lname:any,mobno:any,password:any){
    var data = {
      uid,
      fname,
      lname,
      mobno,
      password
    }
    return this.http.post('http://localhost:3000/register',data)
  }
  login(uid:any,pswd:any){
    var data={
      uid,
      pswd
    }
   return this.http.post('http://localhost:3000/login',data)
  }
  getproduct(){
    return this.http.get('http://localhost:3000/getproduct')
  }
  getfishes(){
    return this.http.get('http://localhost:3000/getfishes')
  }
  adminLogin(id:any,password:any){
    var data={
      id,
      password
    }
    return this.http.post('http://localhost:3000/adminlogin',data)
  }

  Submit(pname:any,type:any,age:any,description:any,quality:any,price:any,image:any){
   var data={
      pname,
      type,
      age,
      description,
      quality,
      price,
      image
    }
    return this.http.post('http://localhost:3000/add-details',data);
  }
  addtowish(product:any){
     var data={
      product:product,
      uid:this.currentuid
     }
      return this.http.post('http://localhost:3000/addtowish',data)
  }
  addtocart(product:any){
    this.cartarray.push(product);
    this.cartlist.next(this.cartarray);
    var data={
     product:product,
     uid:this.currentuid
    }
     return this.http.post('http://localhost:3000/addtocart',data)
 }
  getToken(){
    //fetch token from local storage
    const token = JSON.parse(localStorage.getItem('token')|| '')
    //append token inside the header

    let headers = new HttpHeaders()

    if(token){
      options.headers = headers.append('x-access-token',token)
    }
    return options //to get token
    
  }
  getwishlist(){
    var data ={
      uid:this.currentuid
    } 
    return this.http.post('http://localhost:3000/getwish',data)
  }
  deletewish(product:any){
    var data = {
      uid:this.currentuid,
      id:product._id
    }
    console.log("uid :"+this.currentuid);
    console.log("id :"+product._id);
    
    
    return this.http.post('http://localhost:3000/deletewish',data) 
  }
  getcart(){
    var data ={
      uid:this.currentuid
    } 
    return this.http.post('http://localhost:3000/getcart',data) 
  }
  DeleteCart(product_id:any){
    console.log("uid : "+this.currentuid);
    console.log("Pid :"+product_id);
    
    
    var data ={
      uid:this.currentuid,
      product_id
    }
    return this.http.post('http://localhost:3000/deletecart', data)
  }
  setUsername(){
      localStorage.setItem('username',JSON.stringify(this.currentusername));
  }
  getUsername(){
    if(localStorage.getItem('username')){

      this.currentusername = JSON.parse(localStorage.getItem('username') || '')
    }
  }
  setdata(){
    if(localStorage.getItem('uid')){
    this.currentuid = JSON.parse(localStorage.getItem('uid')||'')
    }
  }
  getProfile(){
    this.setdata();

    var data={
      
      uid:this.currentuid
    }
      
     

    return this.http.post('http://localhost:3000/getprofile',data)
  }
  DeleteProduct(product:any){
    console.log(product._id);
    
    var data = {
      id:product._id
    }
    return this.http.post('http://localhost:3000/deleteproduct',data) 
  }
  deleteAccount(){
    var data={
      uid:this.currentuid
    }
    return this.http.post('http://localhost:3000/deleteaccount',data) 
  }
  Logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('uid')
    localStorage.removeItem('token')
    this.currentusername='Login'
    this.router.navigateByUrl('')
  }
  search(searchkey:any){
    var data={
      searchkey
    }
    return this.http.post('http://localhost:3000/search',data);
  }
  gettotal(){
    var grandsum=0;
    this.cartarray.map((item:any)=>{
    grandsum+=item.price;
  })
  return grandsum;
}
UpdatePassword(currentpassword:any,newpass:any){
  var data={
    uid:this.currentuid,
    currentpassword:currentpassword,
    newpass:newpass
  }
  return this.http.post('http://localhost:3000/up',data);
}
AddAddress(houseno:any,postoffice:any,place:any,pin:any,district:any,state:any,country:any){

  var data={
    uid:this.currentuid,
    houseno,
    postoffice,
    place,
    pin,
    district,
    state,
    country
  }
  return this.http.post('http://localhost:3000/addaddress',data);
}
getAddress(){
  var data={
    uid:this.currentuid
  } 

  return this.http.post('http://localhost:3000/getaddress',data)
}

  placeOrder(){
    var data={
      uid:this.currentuid
    } 
    return this.http.post('http://localhost:3000/placeorder',data)
  }
  getMyOrders(){
    var data ={
      uid:this.currentuid
    }
    return this.http.post('http://localhost:3000/getmyorders',data)
  }
}