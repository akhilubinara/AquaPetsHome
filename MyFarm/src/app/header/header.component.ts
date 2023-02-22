import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpLoginComponent } from '../pop-up-login/pop-up-login.component';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartcount:any
  username='Login'
  ngOnInit():void{
    this.cartcount = this.ds.cartcount;
    // this.username = JSON.parse(localStorage.getItem('username') || '')
  }

  constructor(private router:Router, private mat:MatDialog, private ds:DataService){

    if(localStorage.getItem('username')){

      this.username = JSON.parse(localStorage.getItem('username') || '')
    }
   
  }

  allfish:any=[]
  openDialog(){
    this.mat.open(PopUpLoginComponent);
  }

  login(){
    if(this.username=='Login'){
      this.router.navigateByUrl('/login')
    }
    else{

    }
  }
  getfishes(){
    this.allfish = this.ds.getfishes().subscribe(
      (data:any)=>{
        this.allfish = data.product;
        console.log(this.allfish);
        
      }
    )
  }
  search(event:any){
    let searchkey  = event.target.value;
    this.ds.searchkey.next(searchkey);
  }
  cart(){
    if(this.ds.currentusername=='Login'){
      alert('Please Login First');
      this.router.navigateByUrl('login')
    }
    else{
      this.router.navigateByUrl('cart')
    }
  }
  Logout(){
    this.ds.Logout();
  }
}
