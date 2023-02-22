
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
})

export class RegisterComponent implements OnInit {

  

  //register model
  registerForm = this.fb.group({
    fname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    lname:['',[Validators.required,Validators.pattern('[a-zA-z]*')]],
    uid:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],//array
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*'),Validators.minLength(8)]],
    mobno:['',[Validators.required,Validators.pattern('[0-9]*'), Validators.maxLength(10)]]
  })
  //control - ts file model link to html file

  constructor(private router:Router, private ds:DataService,private fb:FormBuilder ) { }

  ngOnInit(): void {
  }
Register(){

  console.log(this.registerForm);
  
  var fname = this.registerForm.value.fname;
  var lname = this.registerForm.value.lname;
  var pswd = this.registerForm.value.pswd;
  var uid = this.registerForm.value.uid;
  var mobno = this.registerForm.value.mobno
  var name = fname+" "+lname;
  if(this.registerForm.valid){
    
    this.ds.register(uid,fname,lname,mobno,pswd)
    .subscribe((result:any)=>{
      alert(result.message);
      this.router.navigateByUrl('/login')
    },
    (result:any)=>{
      alert(result.error.message);
    })
  }
  else{
    alert("Invalid Form");
  }
  
}

}