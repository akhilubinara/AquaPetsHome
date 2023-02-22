import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  currentUsername=''

  loginForm = this.fb.group({
    uid:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private fb:FormBuilder, private ds:DataService, private router:Router){

  }

  ngOnInit():void{
    // if(localStorage){

    //   this.ds.currentusername = JSON.parse(localStorage.getItem('username')) 
    // }
  }

  Login(){

   if(this.loginForm.valid){
   
    var uid=this.loginForm.value.uid;
    var pswd=this.loginForm.value.pswd;

    this.ds.login(uid,pswd).subscribe((result:any)=>{
      localStorage.setItem('token',JSON.stringify(result.token));
      alert(result.message);

      this.ds.currentusername = result.data.firstname;
      localStorage.setItem('username',JSON.stringify(result.data.firstname));
      if(localStorage.getItem('username')){
        var uname = JSON.parse( localStorage.getItem('username') || '')
      }
      
      this.ds.currentusername = uname;
      localStorage.setItem('uid',JSON.stringify(result.data.uid))
      this.router.navigateByUrl('home');
    },
    (result:any)=>{
      
      alert(result.error.message);
    })
 
   }
    else{
      alert("Invalid Userdetails")
    }
  }
  adminlogin(){
    this.router.navigateByUrl('/admin');
  }
}

