import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {
  order: IOrder;
  total: number = 0;
  sgst: number =0;
  cgst: number = 0;
  amount: number = 0;

  constructor(private orderService: OrderService, private router:Router, private route: ActivatedRoute) {
    console.log(this.router.getCurrentNavigation().extras.state.id); 
    // this.route.data.subscribe((value) => (console.log(value)));
    let bill = this.orderService.getOrderDetails(this.router.getCurrentNavigation().extras.state.id).subscribe({
    //   // let bill = this.orderService.getBill(this.router.getCurrentNavigation().extras.state.id).subscribe({
        next: order =>{
          this.order = order;
          console.log(order.billingDate);
          for(let i=0;i<this.order.car.length;i++){
            this.total+=this.order.car[i].price;
          }
          this.sgst = this.total*0.09;
          this.cgst = this.total*0.09;
          this.amount=this.total+this.sgst+this.cgst;
        }
      });
  }

  ngOnInit(): void {
    // console.log(this.router.getCurrentNavigation().extras.state);
    // let bill = this.orderService.getBill(this.sub).subscribe({
    // let bill = this.orderService.getBill(this.router.getCurrentNavigation().extras.state.id).subscribe({
      //let bill = this.route.data.subscribe(v=>console.log(v));
    //   next: order =>{
    //     this.order = order;
    //     for(let i=0;i<this.order.car.length;i++){
    //       this.total+=this.order.car[i].price;
    //     }
    //     this.sgst = this.total*0.09;
    //     this.cgst = this.total*0.09;
    //     this.amount=this.total+this.sgst+this.cgst;
    //   }
    // });
  }

}
