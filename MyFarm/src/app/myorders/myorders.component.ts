import { Component } from '@angular/core';
import { MyprofileComponent } from '../myprofile/myprofile.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent {

  emsg:any;

  MyOrders:any=[];
  userDetails:any=[];

  ngOnInit():void{
    this.getMyOrders();
  }


  getMyOrders(){
   
    this.userDetails = this.myprofile.userData;
    this.MyOrders  = this.myprofile.userData.order;
    
    if(this.MyOrders){
      this.emsg=true;
    }else{
      this.emsg=false
    }
    
  }

  constructor(private ds:DataService, private myprofile:MyprofileComponent){}
}
