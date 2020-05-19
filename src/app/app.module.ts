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
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';
//PRODUCTO
import { ListProductComponent } from './components/producto/list-product/list-product.component';
import { AddProductComponent } from './components/producto/add-product/add-product.component';
import { DetailProductComponent } from './components/producto/detail-product/detail-product.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/login/registro/registro.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StarReviewComponent } from './components/star-review/star-review.component';


//Star

//import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    NavbarComponent,
    ContactComponent,
    ListProductComponent,
    AddProductComponent,
    DetailProductComponent,
    LoginComponent,
    RegistroComponent,
    StarReviewComponent
  ],
  imports: [
    //star
    
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
