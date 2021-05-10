import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAddress } from '../models/address';
import { ICustomer } from '../models/customer';
import { IOrder } from '../models/order';
import { OrderService } from '../services/order.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  addForm: FormGroup;
  modifyForm: FormGroup;
  allOrderForm: FormGroup;
  byIdForm: FormGroup;
  cancelForm: FormGroup;
  billForm: FormGroup;
  byDateForm: FormGroup;
  openForm: number = null;
  // order: IOrder=new IOrder();
  order: IOrder;
  orders: IOrder[] = [];

  constructor(private orderService:OrderService, private paymentService: PaymentService,private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { 
    this.addForm = this.formBuilder.group({
        id: ['', [Validators.required, Validators.min(1)]],
        billingDate: ['', Validators.required],
        custId: ['', [Validators.required, Validators.min(3)]],
        carId: ['', [Validators.required, Validators.min(2)]]
    });

    this.modifyForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.min(1)]],
      billingDate: ['', Validators.required],
      custId: ['', [Validators.required, Validators.min(3)]],
      carId: ['', [Validators.required, Validators.min(2)]]
    });

    this.allOrderForm = this.formBuilder.group({});

    this.byIdForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.maxLength(5), Validators.min(1), Validators.max(99999)]],
    });

    this.cancelForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.min(1)]],
    });

    this.billForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.maxLength(5), Validators.min(1), Validators.max(99999)]],
    });

    this.byDateForm = this.formBuilder.group({
      billingDate: ['', [Validators.required]],
    });
  }

  onSubmit(form: FormGroup) {
    alert('Order placed Successfully');
    console.log(form.value.name);
    this.addForm.reset();
  }

  click(name: number){
    this.openForm = name;
  }

  ngOnInit(): void {
  }

  getAllOrders(){
    let allOrders = this.orderService.getAllOrders().subscribe({
      next: orders =>{
      this.orders = orders;
      }
    });
    this.allOrderForm.reset();
    this.openForm=3;
  }

  getOrderDetails(form: FormGroup){
    // this.order.car=[];
    // this.order.customer=new ICustomer();
    // this.order.customer.address=new IAddress();
    let orderById = this.orderService.getOrderDetails(form.value.id).subscribe({
      next: order =>{
        
        this.order = order;
        // this.order.car=order.car;
        for(let i=0; i<order.car.length;i++){
          console.log("Cars"+ this.order.car[i].id);
        }
        //;

      }
    });
    this.byIdForm.reset();
    this.openForm=4;
  }

  // getOrderDetails(form: FormGroup){
  //   let orderById = this.orderService.getOrderDetails(form.value.id).subscribe({
      
  //   })
  // }

  // addOrder(form: FormGroup){
  //   let add = this.orderService.addOrder(form.value).subscribe(order => {
  //     console.log("Order Successfully Placed");
  //   },
  //   error=>{
  //     console.log(error);
  //   });
  // }

  getByBillDate(form: FormGroup){
    let byBillDate = this.orderService.getOrdersByBillingDate(form.value.billingDate).subscribe({
      next: orders =>{
        this.orders = orders;
        for(let i = 0; i< orders.length; i++){
          console.log(this.orders[i].car); 
          // console.log(this.orders[i].car[0].id); 
        }
        
      }  
    });

    this.byDateForm.reset();
    this.openForm=5;
  }

  // updateOrder(form: FormGroup){
  //   this.order.id = form.get('id').value;
  //   this.order.billingDate = form.get('billDate').value;
  //   this.order.customer.userId = form.get('userId').value;
  // }

  // moreCars(){
  //   this.addMoreCars = true;
  // }

  getBill(form: FormGroup){
    console.log("in get bill");
    console.log(form.get('id').value);
    // orderId: number = form.value.id.ParseInt();
    this.router.navigateByUrl('/bill-details', {state: {id: form.get('id').value}});
    // // console.log(form.value.id);
    // // this.orderService.setId(form.value.id);
    // let orderId = this.billForm.controls.id.value;
    // this.orderService.setId(orderId);//.subscribe({
    // //   next: order => {
    // //     this.order = order;
    // //     console.log(this.order);
    //     this.router.navigate(['/bill-details']);
    // //   }
    // // });
    
  }

}
