import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { FormGroup } from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { AddDetailsComponent } from './adminlogin/add-details/add-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PopUpLoginComponent } from './pop-up-login/pop-up-login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter.pipe';
import { WishlistComponent } from './home/wishlist/wishlist.component';
import { CartComponent } from './home/cart/cart.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { MyordersComponent } from './myorders/myorders.component';
import { SlidderComponent } from './slidder/slidder.component';
import { VideosComponent } from './videos/videos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdminloginComponent,
    AddDetailsComponent,
    PageNotFoundComponent,
    PopUpLoginComponent,
    FilterPipe,
    WishlistComponent,
    CartComponent,
    MyprofileComponent,
    MyordersComponent,
    SlidderComponent,
    VideosComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
