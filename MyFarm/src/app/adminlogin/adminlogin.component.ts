import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {

  loginForm = this.fb.group({
    id:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private ds:DataService, private router:Router, private fb:FormBuilder){}

  login(){
    var id = this.loginForm.value.id;
    var password = this.loginForm.value.password;

    if(this.loginForm.valid){

      this.ds.adminLogin(id,password).subscribe((result:any)=>{
        if(result){
          alert(result.message);
          this.ds.currentusername = 'Admin'
          this.ds.setUsername();
          // localStorage.setItem('username',JSON.stringify(this.ds.currentusername));
          this.router.navigateByUrl('/')
        }
        else{
          alert("Error")
        }
      })
    }
    else{
      alert("invalid form");
    }
  }
}
