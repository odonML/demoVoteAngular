import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss']
})
export class StarReviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  starVote(product){
    console.log(product)
  }
}
