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

  address:any;
  msg:any;
  cart:any=[];


  updatepassword = this.fb.group({
    currentpassword:['',[Validators.required]],
    newpass:['',[Validators.required]],
    repeatnewpass:['',[Validators.required]]
  })

  constructor(private ds:DataService, private router:Router, private fb:FormBuilder){
    this.getProfile();
    console.log(this.uid);
  }
  username=this.ds.currentusername;
  uid = localStorage.getItem('uid')||'';
  userData:any;
  
  getProfile(){
    return this.ds.getProfile().subscribe(
      (result:any)=>{
      this.userData = result.userData
      
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
  }
  E(){
    // this.router.navigateByUrl('wishlist')
    this.pflag='wishlist';
  }
  F(){
    this.pflag='cart'
    // this.router.navigateByUrl('cart')
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
  AddAddress(){
    this.address=true;
  }
ngOnInit():void{

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


    var currentpasssword = this.updatepassword.value.currentpassword;
    console.log(currentpasssword);
    
    var newpass = this.updatepassword.value.newpass;
    console.log(newpass);
    
    var repeatnewpass = this.updatepassword.value.repeatnewpass;
    console.log(repeatnewpass);
    
    if(newpass===repeatnewpass){
      this.ds.UpdatePassword(currentpasssword,newpass).subscribe(
        (result:any)=>{
          alert(result.message);
        },
        (result:any)=>{
          result.error.message
        }
      )
    }


}
order(){
    
}
}
