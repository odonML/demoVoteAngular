import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore} from '@angular/fire/firestore';
import { Star } from '../models/star';
import { Producto } from '../models/producto';
import { AuthService } from './auth.service';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class StarService {
  userDetail: User;

  estrellas: AngularFirestoreCollection<Star>;
  estrella: AngularFirestoreDocument<Star>;
  constructor(
    private db: AngularFirestore,
    private authService: AuthService
    ) { }
    
    // Create or update star
    addStar(star:Star){
      //const starPath = `star/${star.userKey}_${star.productKey}`;
      //return this.db.doc(starPath).set(star);
      return this.db.collection('star/').add(star);
      //console.log(star);
     
      // Custom doc ID for relationship
      
  
      // Set the data, return the promise
      
      //return this.db.collection("stars/").add(star);
      
    }
    //estrellas de usuario
    /* getUserStars(userKey) {
    const starsRef = this.db.collection('stars', ref => ref.where('userKey', '==', userKey) );
    return starsRef.valueChanges();
  }

  //estrellas de peliculas 
  getMovieStars(productKey) {
    const starsRef = this.db.collection('stars', ref => ref.where('productKey', '==', productKey) );
    return starsRef.valueChanges();
  }*/


}
