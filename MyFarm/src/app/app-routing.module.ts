
import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDetailsComponent } from './adminlogin/add-details/add-details.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ViewordersComponent } from './adminlogin/vieworders/vieworders.component';
import { CartComponent } from './home/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './home/wishlist/wishlist.component';
import { LoginComponent } from './login/login.component';
import { MyordersComponent } from './myorders/myorders.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { SlidderComponent } from './slidder/slidder.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'home',component:HomeComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'admin',component:AdminloginComponent
  },
  {
    path:'adminlogin/add-details',component:AddDetailsComponent
  },
  {
    path:'cart',component:CartComponent
  },
  {
    path:'wishlist',component:WishlistComponent
  },
  {
    path:'myprofile',component:MyprofileComponent
  },
  {
    path:'myorders',component:MyordersComponent
  },
  {
    path:'slider',component:SlidderComponent
  },
  {
    path:'videos', component:VideosComponent
  },
  {
    path:'adminlogin/vieworders',component:ViewordersComponent
  },
  {
    path:'**',component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
