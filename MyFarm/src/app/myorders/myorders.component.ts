import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent {

  emsg=true;


  constructor(private ds:DataService){}
}
