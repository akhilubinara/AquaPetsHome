import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {
  pflag='personalinfo'

  myAddress:any=[];
  address:any;
  msg:any;
  cart:any=[];
  user:any;
  orderis=false;
  MyOrders:any=[];
  emsg=false;

  updatepassword = this.fb.group({
    currentpassword:['',[Validators.required]],
    newpass:['',[Validators.required]],
    repeatnewpass:['',[Validators.required]]
  })

  addaddressform = this.fb.group({
    houseno:['',[Validators.required]],
    postoffice:['',[Validators.required]],
    place:['',[Validators.required]],
    pin:['',[Validators.required]],
    district:['',[Validators.required]],
    state:['',[Validators.required]],
    country:['',[Validators.required]]
    
  })
  ngOnInit():void{
    this.getAddress();
    this.getMyOrders();
    this.getProfile();
  }
  constructor(private ds:DataService, private router:Router, private fb:FormBuilder){
    
    console.log(this.uid);
  }
  username=this.ds.currentusername;
  uid = localStorage.getItem('uid')||'';
  userData:any;
  
  getProfile(){
    return this.ds.getProfile().subscribe(
      (result:any)=>{
      this.userData = result.userData;
      console.log(this.userData);
      
    },
    (result:any)=>{
      alert(result.error.message)
    })
  }
  A(){
    this.pflag='personalinfo';
  }
  B(){
    this.pflag='address';
    
  }
  C(){
    this.pflag='password';
  }
  D(){
    this.pflag='myorder';
    this.getMyOrders()
  }
  E(){
    this.pflag='wishlist';
  }
  F(){
    this.pflag='cart';
  }
  G(){
    localStorage.removeItem('username');
    localStorage.removeItem('uid')
    localStorage.removeItem('token')
    this.ds.currentusername='Login'
    this.router.navigateByUrl('')
  }
  H(){
    this.pflag = 'manageaccount'
  }
  I(){
    this.pflag = 'checkoutnext'
  }
  AddAddressActive(){
    this.address=true;
  }
DeleteAccount(){
  var c = confirm('Are You Sure?');
  if(c==true){
    this.ds.deleteAccount().subscribe(
      (result:any)=>{
        alert(result.message);
        this.ds.Logout();
      },
      (result:any)=>{
        alert(result.error.message);
      }
    )
  }
  else{
    
  }
}
updatePassword(){


    var currentpassword = this.updatepassword.value.currentpassword;
    console.log(currentpassword);
    
    var newpass = this.updatepassword.value.newpass;
    console.log(newpass);
    
    var repeatnewpass = this.updatepassword.value.repeatnewpass;
    console.log(repeatnewpass);
    
    if(newpass===repeatnewpass){
      this.ds.UpdatePassword(currentpassword,newpass).subscribe(
        (result:any)=>{
          alert(result.message);
          this.ds.Logout()
        },
        (result:any)=>{
          alert(result.error.message)
        }
      )
    }
    else{
      alert("New Password Didn't math");
    }

}
AddAddress(){

  if(this.addaddressform.valid){
    var houseno = this.addaddressform.value.houseno;
    var postoffice = this.addaddressform.value.postoffice;
    var place = this.addaddressform.value.place;
    var pin = this.addaddressform.value.pin;
    var district = this.addaddressform.value.district;
    var state = this.addaddressform.value.state;
    var country = this.addaddressform.value.country;
    this.ds.AddAddress(houseno,postoffice,place,pin,district,state,country).subscribe(
      (result:any)=>{
        this.getAddress();
        alert(result.message);
                                                                        
      },
      (result:any)=>{
        alert(result.error.message);
      }
    )
  }

}
getAddress(){
  this.ds.getAddress().subscribe(
    (result:any)=>{
      this.myAddress = result.address;
      console.log(this.myAddress);
      
    }),
    (result:any)=>{
      alert(result.error.message)
    }
}
// deliveryAddress=this.fb.group({
//   name:['',[Validators.required]],
//   houseno:['',[Validators.required]],
//   pin:['',[Validators.required]],
//   place:['',[Validators.required]],
//   district:['',[Validators.required]],
//   state:['',[Validators.required]],
//   country:['',[Validators.required]],
//   email:['',[Validators.required]],
//   num:['',[Validators.required]]
// })
Order(){
    // this.pflag='orderisplaced';
    this.ds.placeOrder().subscribe(
      (result:any)=>{
        alert(result.message);
      },
      (result:any)=>{
        alert(result.error.message);
      }
    )

}
getMyOrders(){
  
  this.ds.getMyOrders().subscribe(
    (result:any)=>{
      this.MyOrders = result.products
      console.log(this.MyOrders);
      if(result.length!=0){this.emsg=true;}else{this.emsg=false}

    },
    (result:any)=>{
      alert(result.error.message)
    }
  )
 
}
}
