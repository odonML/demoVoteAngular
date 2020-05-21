import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
//FIREBASE
import { AngularFireModule} from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
//PRODUCTO
import { ListProductComponent } from './components/producto/list-product/list-product.component';
import { AddProductComponent } from './components/producto/add-product/add-product.component';
import { DetailProductComponent } from './components/producto/detail-product/detail-product.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/login/registro/registro.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StarReviewComponent } from './components/star-review/star-review.component';


//Star
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { StarComponent } from './components/star-review/star/star.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListProductComponent,
    AddProductComponent,
    DetailProductComponent,
    LoginComponent,
    RegistroComponent,
    StarReviewComponent,
    StarComponent,
    DashboardComponent
  ],
  imports: [
    //star
    NgbPaginationModule, 
    NgbAlertModule,
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
