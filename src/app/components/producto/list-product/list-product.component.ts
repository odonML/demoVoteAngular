import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Producto } from 'src/app/models/producto';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/user';
import { StarService } from 'src/app/services/star.service';
import { Router } from '@angular/router';
import Swal from'sweetalert2';
import { Star } from 'src/app/models/star';



//star


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  productList:Producto[];
  productObject: Producto;

  userDetail:User;

  user:User;
  star:Star = new Star;
  constructor(
    private data:DataService,
    private authService: AuthService,
    private starData: StarService,
    private router: Router
    ){ }

  ngOnInit() {
     this.getProducts();
  }
  

  getProducts(){
    const x = this.data.getProducto();
    x.snapshotChanges().subscribe(
      (u) => {
        this.productList = [];
        console.log("products" + u);

        u.forEach((element) => {
          this.productObject = element.payload.doc.data();
          this.productObject.$key = element.payload.doc.id;
          console.log("data : " + this.productObject.$key);
          this.productList.push(this.productObject as Producto);
          console.log(JSON.stringify(this.productList));
        });
      },
      (err) => {
        console.log(err);
      }
   );
   
  }
}
