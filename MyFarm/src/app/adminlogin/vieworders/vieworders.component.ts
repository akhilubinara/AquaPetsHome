import { Component } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-vieworders',
  templateUrl: './vieworders.component.html',
  styleUrls: ['./vieworders.component.css']
})
export class ViewordersComponent {

  msg=true;

  constructor(private order:OrderService){
    
  }
  ngOnInit():void{
    this.getOrders();
  }

  getOrders(){
    
  }
}
