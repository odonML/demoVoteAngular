import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Producto } from 'src/app/models/producto';
import { AuthService } from 'src/app/services/auth.service';
import { StarService } from 'src/app/services/star.service';
import { User } from 'src/app/models/user';
import { Star } from 'src/app/models/star';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss']
})
export class StarReviewComponent implements OnInit {
  userDetail:User;

  product: Producto;
  productObject: Producto;

  star: boolean=true;
  starList:Star[];
  starObject: Star;
  constructor(
    private route: ActivatedRoute,
    private data: DataService,

    private authService: AuthService,
    private starData: StarService,
    private router: Router
  ) { 
    this.product=new Producto();
    
  }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      const id = params['id'];
      console.log(id)
      this.detail(id);
      this.getStars(id);
    })
  }

  detail(id){
    this.data.getProductoById(id).snapshotChanges().subscribe(
      (u) => {
        console.log("product" + u);
        this.product = u.payload.data();
        this.product['$key'] = id;
        console.log(JSON.stringify(this.product));
      },
      (err) => {
       console.log("======="+err);
      }
    );
  }

  getStars(productID){
    console.log("===1==="+productID)
    const x =this.starData.getStars(productID);
    x.snapshotChanges().subscribe(
      (u) => {

        this.starList = [];
        u.forEach((element) => {
          this.star=false;
          this.starObject = element.payload.doc.data();
          this.starObject.$key = element.payload.doc.id;
          console.log("data : " + this.starObject.$key);
          this.starList.push(this.starObject as Star);
          console.log(JSON.stringify(this.starList));
          
        });
      },
      (err) => {
       console.log("======="+err);
      }
    );

  }
  starVote(productkey:Producto, value, star:Star=new Star){

    console.log(productkey);
    this.userDetail = this.authService.getLoggedInUser();
    let U = this.userDetail;
    star.userKey=U.$key;
    star.userName=U.nombre;
    
    star.productKey=productkey.$key;
    star.productName=productkey.titulo;
    star.value=value.rating;

    
    this.starData.addStar(JSON.parse(JSON.stringify(star)));
  }

 

}
