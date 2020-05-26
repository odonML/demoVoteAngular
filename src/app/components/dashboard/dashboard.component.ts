import { Component, OnInit } from '@angular/core';
import { StarService } from 'src/app/services/star.service';
import { Star } from 'src/app/models/star';
import { DataService } from 'src/app/services/data.service';
import { Producto } from 'src/app/models/producto';
import { VotosForUser } from 'src/app/models/votosForUser';
import { Chart } from 'chart.js'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  starList:Star[];
  starListUser: Star[];
  starUsers: Star[];

  u=[];
  starObject: Star=new Star;
  
  constructor(
    private data: StarService,
    private producto: DataService
  ) { }

  ngOnInit() {
    this.getAllStar();

    
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

    
  }

  votosForUser=[];
  getAllStar(){


    const x = this.data.getAllStar();
    x.snapshotChanges().subscribe(
      (u) => {
        this.starList = [];
        this.starListUser=[];
        this.starUsers=[];

        this.u=[];
        console.log("products==== " + u.length);

        u.forEach((element) => {
          this.starObject = element.payload.doc.data();
          this.starObject.$key = element.payload.doc.id;
          console.log("data : " + this.starObject.productKey);
          this.starList.push(this.starObject as Star);
          this.starListUser.push(this.starObject as Star);
        });

        //console.log("STAR: "+JSON.stringify(this.starList));
        let hash = {};
        this.starListUser = this.starListUser.filter(o => hash[o.userKey] ? false : hash[o.userKey] = true);
        console.log("USUARIOS "+JSON.stringify(this.starListUser));

        for(var i = 0; i<=this.starListUser.length; i++){

         this.starUsers=this.starList.filter(e => e.userKey == this.starListUser[i].userKey);    
          console.log("===    "+this.starUsers.length+" --- "+this.starUsers[i].userName);

         var objeto =   {
            votos: this.starUsers.length,
            usuario: this.starUsers[i].userName
          }

          this.u.push(objeto);
          
          console.log("               "+JSON.stringify(this.u))
      
        }    


      },
      (err) => {
        console.log(err);
      }
   );
  }


 
  
}
