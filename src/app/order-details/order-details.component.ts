import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICar } from '../models/car';
import { IOrder } from '../models/order';
import { CarRegisterService } from '../services/car-register.service';
import { CustomerService } from '../services/customer.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  constructor(private orderService: OrderService, private carService: CarRegisterService, private customerService: CustomerService,private router: Router) { }

  order: IOrder = new IOrder();
  total: number = 0;
  sgst: number = 0;
  cgst: number = 0;
  amount: number = 0;
  orderId: number;
  userId: number;
  sub!: Subscription;

  carArray: ICar[] = [];
  c: number[] = [];

  calculateSum(): void {
    for (let i = 0; i < this.order.car.length; i++) {
      this.total += this.order.car[i].price;
    }
  }

  ngOnInit(): void {
    this.c = JSON.parse(localStorage.getItem('user'));//
    this.userId=JSON.parse(localStorage.getItem("userId"));
    this.customerService.getCustomer(this.userId).subscribe({
      next: customer =>{
        this.order.customer=customer;
        console.log(this.order.customer);
      }
    })
    let today=new Date();
    let date=today.getFullYear()+'-';
    if(today.getMonth()<9){
      date+='0'+(today.getMonth()+1)+'-';
    }
    else{
      date+=(today.getMonth()+1)+'-';
    }
    if(today.getDate()<10){
      date+='0'+today.getDate();
    }
    else{
      date+=today.getDate();
    }
    this.order.billingDate=date;
    this.order.id=101;
    this.order.status='Completed';
    console.log("Order Details Component Date",date);
    this.order.car = [];
    for (let j = 0; j < this.c.length; j++) {
      // console.log(this.c[j]);
      this.sub=this.carService.getCar(this.c[j]).subscribe({
        next: data => {
          this.order.car[j] = data;
          console.log("Data:" + this.order.car[j]);
          this.total += this.order.car[j].price;

          this.sgst = this.total * 0.09;
          this.cgst = this.total * 0.09;
          this.amount = this.total + this.sgst + this.cgst;
        }
      });

    }

    console.log(this.carArray);
  }
  click(){
    
    this.router.navigate(['/products']);
  }

  goToPay(){
    console.log(this.order);
    
    this.orderService.addOrder(this.order.id, this.order.billingDate, this.userId, this.c).subscribe({
      next: data =>{
        console.log('data received in order details component', data);
        this.orderId=data.id;
        localStorage.setItem('orderId',JSON.stringify(this.orderId));
        this.router.navigate(['/payment']);
      }
    })
    
    
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

}
